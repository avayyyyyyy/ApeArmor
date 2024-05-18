import PhonePreview from "@/components/PhonePreview";
import { Separator } from "@/components/ui/separator";
import prisma from "@/db";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function page({ searchParams }: PageProps) {
  const { orderId } = searchParams;

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      isPaid: true,
    },
  });

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  const configuration = await prisma.configuration.findUnique({
    where: {
      id: order?.configurationId,
    },
  });

  return (
    <>
      <div className="w-[60vw] mx-auto">
        <div className="mt-10">
          <div className="text-primary lg:text-lg text-sm font-bold">
            Thank you! 🧡
          </div>
          <div className="lg:text-6xl text-3xl  font-bold mb-3">
            Your custom case, your way 🚀
          </div>
          <div className="font-semibold my-3 lg:text-base text-sm  text-secondary-foreground">
            {" "}
            Your order has been successfully received and is now being expertly
            processed! ✨
          </div>
          <div className="text-secondary-foreground mt-7 lg:text-base text-sm font-semibold">
            Order Number:
          </div>
          <div className="text-secondary-foreground/70 lg:text-base text-xs  font-semibold">
            {order?.id}
          </div>
        </div>
        <Separator className="my-7" />
        <div>
          <div className="font-semibold my-3   text-secondary-foreground">
            {" "}
            You have a great taste!
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            At ApeArmor, we&apos;re dedicated to crafting phone cases that not
            only dazzle the eye but endure the test of time. 🌟 Enjoy peace of
            mind with our 5-year print guarantee: If your case doesn&apos;t meet
            our quality standards, we&apos;ll swap it out at no cost to you!
            🔄💎
          </p>
        </div>
        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhonePreview
            croppedImageUrl={configuration?.croppedImageUrl!}
            color={configuration?.color!}
          />
        </div>
      </div>
      <div className="flex mt-10 mx-6 lg:mx-0 flex-col items-center gap-4 rounded-lg bg-primary p-6 shadow-lg sm:flex-row sm:justify-between">
        <strong className="text-xl text-primary-foreground sm:text-xl">
          {" "}
          Liked this project?
        </strong>

        <Link
          className="inline-flex items-center gap-2 rounded-full border border-prim bg-prim px-8 py-3 text-primbg-primary hover:bg-transparent hover:text-prim focus:outline-none focus:ring active:bg-prim/90"
          href="https://github.com/avayyyyyyy/ApeArmor"
          target="_blank"
        >
          <span className="text-sm text-primary-foreground  font-medium">
            {" "}
            Give it a 🌟 !
          </span>

          <Github className="text-primary-foreground" size={18} />
        </Link>
      </div>
    </>
  );
}

export default page;
