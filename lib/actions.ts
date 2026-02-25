'use server';

import {
  shopifyFetch,
  CREATE_CART_MUTATION,
  type CreateCartResponse,
} from './shopify';
import { Resend } from 'resend';

export interface CheckoutLineItem {
  merchandiseId: string; // Shopify variant GID
  quantity: number;
}

export interface CustomOrderRequestData {
  name: string;
  email: string;
  phone?: string;
  vision: string;
}

export interface SupportRequestData {
  name: string;
  email: string;
  orderNumber?: string;
  issueType: string;
  details: string;
}

/**
 * Creates a Shopify Cart and returns the hosted checkout URL.
 * Call this from client components when the user clicks "Checkout".
 */
export async function createCheckout(
  lineItems: CheckoutLineItem[]
): Promise<string> {
  const lines = lineItems.map(({ merchandiseId, quantity }) => ({
    merchandiseId,
    quantity,
  }));

  const data = await shopifyFetch<CreateCartResponse>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
    cache: 'no-store',
  });

  const { cart, userErrors } = data.cartCreate;

  if (userErrors.length > 0) {
    throw new Error(`Shopify cart error: ${userErrors[0].message}`);
  }

  if (!cart?.checkoutUrl) {
    throw new Error('Shopify did not return a checkout URL.');
  }

  return cart.checkoutUrl;
}

export async function submitCustomOrderRequest(
  data: CustomOrderRequestData
): Promise<{ success: true }> {
  const name = data.name.trim();
  const email = data.email.trim();
  const phone = (data.phone ?? '').trim();
  const vision = data.vision.trim();

  if (!name || !email || !vision) {
    throw new Error('Please fill out all required fields.');
  }

  if (vision.length < 20) {
    throw new Error('Please provide more detail in your request.');
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CUSTOM_ORDER_TO_EMAIL;

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY on server.');
  }

  if (!toEmail) {
    throw new Error('Missing CUSTOM_ORDER_TO_EMAIL on server.');
  }

  const resend = new Resend(resendApiKey);
  const fromEmail = process.env.CUSTOM_ORDER_FROM_EMAIL || 'VenomWear <orders@shopvenomwear.com>';

  const safeVision = vision
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

  const subject = `New Custom Order Request — ${name}`;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject,
    text: [
      'New custom order request',
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      '',
      'Vision:',
      vision,
    ].join('\n'),
    html: `
      <h2>New Custom Order Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Vision:</strong></p>
      <p>${safeVision}</p>
    `,
  });

  if (error) {
    throw new Error('Unable to send your request right now. Please try again shortly.');
  }

  return { success: true };
}

export async function submitSupportRequest(
  data: SupportRequestData
): Promise<{ success: true }> {
  const name = data.name.trim();
  const email = data.email.trim();
  const orderNumber = (data.orderNumber ?? '').trim();
  const issueType = data.issueType.trim();
  const details = data.details.trim();

  if (!name || !email || !issueType || !details) {
    throw new Error('Please fill out all required fields.');
  }

  if (details.length < 20) {
    throw new Error('Please provide at least 20 characters with issue details.');
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.SUPPORT_TO_EMAIL || process.env.CUSTOM_ORDER_TO_EMAIL;

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY on server.');
  }

  if (!toEmail) {
    throw new Error('Missing SUPPORT_TO_EMAIL or CUSTOM_ORDER_TO_EMAIL on server.');
  }

  const resend = new Resend(resendApiKey);
  const fromEmail = process.env.SUPPORT_FROM_EMAIL || process.env.CUSTOM_ORDER_FROM_EMAIL || 'VenomWear <support@shopvenomwear.com>';

  const safeDetails = details
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br/>');

  const subject = `Support Request — ${issueType} — ${name}`;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: email,
    subject,
    text: [
      'New support/alteration request',
      `Name: ${name}`,
      `Email: ${email}`,
      `Order Number: ${orderNumber || 'Not provided'}`,
      `Issue Type: ${issueType}`,
      '',
      'Details:',
      details,
    ].join('\n'),
    html: `
      <h2>New Support / Alteration Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Order Number:</strong> ${orderNumber || 'Not provided'}</p>
      <p><strong>Issue Type:</strong> ${issueType}</p>
      <p><strong>Details:</strong></p>
      <p>${safeDetails}</p>
    `,
  });

  if (error) {
    throw new Error('Unable to send your support request right now. Please try again shortly.');
  }

  return { success: true };
}
