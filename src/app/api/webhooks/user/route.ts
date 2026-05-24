import prisma from "@/lib/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import Stripe from "stripe";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated' | '*';

type EmailAddressType = {
  id: string;
  email_address: string;
};

type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: EmailAddressType[];
  primary_email_address_id: string;
  attributes: Record<string, string | number>;
};

type Event = {
  data: EventDataType;
  object: 'event';
  type: EventType;
};

async function handler(request: Request) {
    const payload = await request.json();

    const headersList = headers();

    const heads = {
        'svix-id': headersList.get('svix-id'),
        'svix-timestamp': headersList.get('svix-timestamp'),
        'svix-signature': headersList.get('svix-signature'),
    };

    const wh = new Webhook(webhookSecret);

    let evt: Event | null = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;

    } catch (err) {
        console.error((err as Error).message);

        return NextResponse.json({}, { status: 400 });
    }

    if (!evt) {
        return NextResponse.json({}, { status: 400 });
    }

    const eventType: EventType = evt.type;

    if (
        evt.type === 'user.created' ||
        evt.type === 'user.updated'
    ) {

        const {
            id,
            first_name,
            last_name,
            email_addresses,
            primary_email_address_id,
            ...attributes
        } = evt.data;

            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
              apiVersion: "2026-04-22.dahlia",
            });

            const customer = await stripe.customers.create({
                name: `${first_name} ${last_name}`,
                email: email_addresses ? email_addresses[0].email_address : '',
            })

        await prisma.user.upsert({
            where: {
                externalId: id as string,               
                
            },

            create: {
                externalId: id as string,
                stripeCustomerId: customer.id,
                attributes
            },

            update: {
                attributes
            }
        });
    }

    return NextResponse.json({}, { status: 200 });
}       

export const GET = handler;
export const POST = handler;
export const PUT = handler;