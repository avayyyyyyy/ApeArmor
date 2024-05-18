"use server";
import prisma from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkAuth(ConfigId: string) {
  const { getUser } = getKindeServerSession();

  const configuration = await prisma.configuration.findUnique({
    where: { id: ConfigId },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const user = await getUser();

  if (!user?.id || !user?.email) {
    throw new Error("No User Found");
  }

  const existingUser = await prisma.user.findFirst({
    where: { id: user.id },
  });

  if (!existingUser) {
    const userCreated = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    });
    if (userCreated) {
      return { success: true };
    }
  }

  const { finish, material } = configuration;

  let price = 21;

  if (material === "Soft Polycarbonate") price += 8;
  if (finish === "Textured") price += 5;

  let order;

  const existingOrder = await prisma.order.findFirst({
    where: {
      id: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await prisma.order.create({
      data: {
        amount: price,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Your custom iPhone Case",
    id: order?.id,
    images: [configuration.imageUrl],
    default_price_data: { currency: "USD", unit_amount: price * 100 },
  });

  const priceObject = await stripe.prices.create({
    product: product.id,
    unit_amount: price * 8400,
    currency: "inr",
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.KINDE_SITE_URL}/thankyou?orderId=${order?.id}`,
    cancel_url: `${process.env.KINDE_SITE_URL}/create/preview?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["IN"] },
    metadata: {
      user: user.id,
      order: order?.id,
    },
    line_items: [{ price: priceObject.id, quantity: 1 }],
  });

  return {
    url: stripeSession.url,
  };
}
