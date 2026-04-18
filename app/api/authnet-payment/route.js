import { NextResponse } from 'next/server';

/**
 * Authorize.net payment processing endpoint.
 * Receives the opaque payment data from Accept.js on the frontend
 * and creates a charge server-side using Authorize.net's API.
 */
export async function POST(request) {
  try {
    const { opaqueData, amount, formData } = await request.json();

    const apiLoginId = process.env.AUTHORIZENET_API_LOGIN_ID;
    const transactionKey = process.env.AUTHORIZENET_TRANSACTION_KEY;
    const isProduction = process.env.NEXT_PUBLIC_AUTHORIZENET_ENVIRONMENT === 'PRODUCTION';

    if (!apiLoginId || !transactionKey) {
      return NextResponse.json(
        { error: 'Authorize.net credentials not configured.' },
        { status: 503 }
      );
    }

    const endpoint = isProduction
      ? 'https://api.authorize.net/xml/v1/request.api'
      : 'https://apitest.authorize.net/xml/v1/request.api';

    const payload = {
      createTransactionRequest: {
        merchantAuthentication: {
          name: apiLoginId,
          transactionKey,
        },
        refId: `party_${Date.now()}`,
        transactionRequest: {
          transactionType: 'authCaptureTransaction',
          amount: (amount / 100).toFixed(2),
          payment: {
            opaqueData: {
              dataDescriptor: opaqueData.dataDescriptor,
              dataValue: opaqueData.dataValue,
            },
          },
          order: {
            invoiceNumber: `BIU-${Date.now()}`,
            description: `Bounce It Up Party Deposit — ${formData?.package || 'Party Package'}`,
          },
          customer: {
            email: formData?.email || '',
          },
          billTo: {
            firstName: formData?.name?.split(' ')[0] || '',
            lastName: formData?.name?.split(' ').slice(1).join(' ') || '',
            email: formData?.email || '',
          },
          userFields: {
            userField: [
              { name: 'partyDate', value: formData?.partyDate || '' },
              { name: 'package', value: formData?.package || '' },
            ],
          },
        },
      },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    const result = data?.transactionResponse;
    if (data?.messages?.resultCode === 'Ok' && result?.responseCode === '1') {
      return NextResponse.json({
        success: true,
        transactionId: result.transId,
        authCode: result.authCode,
      });
    } else {
      const errorMsg =
        result?.errors?.[0]?.errorText ||
        data?.messages?.message?.[0]?.text ||
        'Payment declined';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }
  } catch (error) {
    console.error('Authorize.net error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
