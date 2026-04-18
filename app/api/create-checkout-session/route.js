import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { package: pkg, formData, depositAmount } = body;

    // Dynamic import to avoid build errors if stripe key is missing
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
      apiVersion: '2024-04-10',
    });

    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.' },
        { status: 503 }
      );
    }

    const packagePriceMap = {
      'Starter Bash': 24900,   // $249 in cents
      'Ultimate Party': 39900, // $399
      'VIP Celebration': 59900, // $599
    };

    const matchedKey = Object.keys(packagePriceMap).find((k) =>
      pkg?.toLowerCase().includes(k.toLowerCase())
    );
    const fullPrice = matchedKey ? packagePriceMap[matchedKey] : 0;
    const deposit = Math.round(fullPrice * 0.25);

    if (!deposit) {
      // Custom / inquiry — redirect to contact
      return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/#contact`,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${pkg} — Deposit (25%)`,
              description: `Party deposit for ${formData?.birthdayChildName || 'your child'} on ${formData?.partyDate || 'TBD'} at ${formData?.partyTime || 'TBD'}`,
              images: [],
            },
            unit_amount: deposit,
          },
          quantity: 1,
        },
      ],
      metadata: {
        parentName: formData?.name || '',
        email: formData?.email || '',
        phone: formData?.phone || '',
        birthdayChild: formData?.birthdayChildName || '',
        partyDate: formData?.partyDate || '',
        partyTime: formData?.partyTime || '',
        package: pkg || '',
        kidsCount: formData?.kidsCount || '',
        notes: formData?.notes || '',
      },
      customer_email: formData?.email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?booking=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/#booking`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
