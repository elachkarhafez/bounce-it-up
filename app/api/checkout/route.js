import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Pricing table
const PRICES = {
  // Open Play
  'open-play-child': { amount: 1400, name: 'Open Play – Child Admission', description: 'All-day access to all attractions' },
  'open-play-toddler': { amount: 900, name: 'Open Play – Toddler (3 & under)', description: 'Toddler zone + all attractions' },

  // Party deposits ($100 each)
  'party-starter-deposit': { amount: 10000, name: 'Starter Bash – $100 Deposit', description: 'Deposit for Starter Bash ($249 total). Balance due on event day.' },
  'party-ultimate-deposit': { amount: 10000, name: 'Ultimate Party – $100 Deposit', description: 'Deposit for Ultimate Party ($399 total). Balance due on event day.' },
  'party-vip-deposit': { amount: 10000, name: 'VIP Celebration – $100 Deposit', description: 'Deposit for VIP Celebration ($599 total). Balance due on event day.' },

  // Memberships
  'membership-monthly': { amount: 4900, name: 'Monthly Fun Pass', description: 'Unlimited open play per child/month. Priority check-in, 10% off parties & concessions.' },
  'membership-annual': { amount: 34900, name: 'Family Annual Pass', description: 'Unlimited open play for the whole family (up to 4 kids). 20% off parties, birthday discount.' },
};

export async function POST(request) {
  try {
    const { type, quantity = 1, partyDate, partyNotes, childrenCount, membershipName } = await request.json();

    const price = PRICES[type];
    if (!price) {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 });
    }

    const isDeposit = type.includes('deposit');
    const isMembershipAnnual = type === 'membership-annual';
    const isMembershipMonthly = type === 'membership-monthly';

    // Build metadata
    const metadata = {};
    if (partyDate) metadata.partyDate = partyDate;
    if (partyNotes) metadata.partyNotes = partyNotes;
    if (childrenCount) metadata.childrenCount = String(childrenCount);
    if (membershipName) metadata.membershipName = membershipName;

    // Build line items
    const lineItems = [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: price.name,
          description: price.description,
          images: ['https://bounce-it-up-livonia.vercel.app/og-image.jpg'],
        },
        unit_amount: price.amount,
        ...(isMembershipMonthly ? {
          recurring: { interval: 'month' }
        } : {}),
      },
      quantity: isMembershipMonthly || isMembershipAnnual ? 1 : quantity,
    }];

    const sessionConfig = {
      payment_method_types: ['card'],
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
      line_items: lineItems,
      mode: isMembershipMonthly ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=${type}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancelled`,
      metadata,
      // Apple Pay / Google Pay are automatically enabled via Stripe
      // when the customer's browser/device supports them
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      custom_fields: isDeposit ? [
        {
          key: 'party_date',
          label: { type: 'custom', custom: 'Preferred Party Date' },
          type: 'text',
          optional: false,
        },
        {
          key: 'birthday_child',
          label: { type: 'custom', custom: "Birthday Child's Name & Age" },
          type: 'text',
          optional: false,
        },
      ] : [],
    };

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
