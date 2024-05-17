import CheckoutLoading from "@/components/CheckoutLoading";
import Phone from "@/components/Phone";
import UploadSteps from "@/components/UploadSteps";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import prisma from "@/db";
import { ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

async function page({ searchParams }: PageProps) {
  const { id } = searchParams;

  if (!searchParams) {
    return notFound();
  }

  const configuration = await prisma.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  return (
    <div>
      <UploadSteps />
      <div className="max-w-[80vw] flex flex-col lg:flex-row  mx-auto">
        <div className="w-[50%] mx-auto flex flex-col items-center justify-center ">
          <Phone
            className="lg:w-[300px] w-[200px] h-full lg:mt-0 lg:rounded-[45px] rounded-[35px] shadow-2xl"
            imgSrc={configuration.imageUrl}
          />
        </div>
        <div className="w-full">
          <div>
            <h1 className="lg:text-4xl text-3xl  font-extrabold mt-7 lg:text-start  text-center ">
              Your {configuration.model} Case
            </h1>
            <p className="flex items-center w-full font-medium gap-1 mb-6  mt-3 justify-center lg:justify-start ">
              <span>
                <Check size={18} className="text-primary font-bold" />
              </span>
              In Stock and ready to ship
            </p>
          </div>
          <div className="flex w-full gap-1 ">
            <div className="w-[50%]">
              <div className="text-lg font-semibold text-secondary-foreground mt-0  lg:my-3">
                Highlights
              </div>
              <ul className="list-disc">
                <li className="ml-5 text-secondary-foreground/80  font-medium ">
                  Wireless charging compatible
                </li>
                <li className="ml-5 text-secondary-foreground/80  font-medium ">
                  TPU shock absorption
                </li>
                <li className="ml-5 text-secondary-foreground/80  font-medium ">
                  Packageing made from recycled Material
                </li>
                <li className="ml-5 text-secondary-foreground/80  font-medium ">
                  5 Year print warranty
                </li>
              </ul>
            </div>
            <div className="w-[50%]">
              <div className="text-lg font-semibold text-secondary-foreground mt-0  lg:mt-5">
                Material
              </div>
              <ul className="list-disc">
                <li className="ml-5 text-secondary-foreground/80 font-medium ">
                  High-quality, durable material
                </li>
                <li className="ml-5 text-secondary-foreground/80 font-medium ">
                  Scratch and fingerprint-resistant coating
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-5" />
          <div>
            <div className="flex w-full justify-between font-medium">
              <div>Base Price</div>
              <div>$14.00</div>
            </div>
            <div className="flex w-full justify-between font-medium">
              <div>{configuration.finish} Finish</div>
              <div>{configuration.finish === "Smooth" ? "$0.00" : "$3.00"}</div>
            </div>
            <div className="flex w-full justify-between font-medium">
              <div>{configuration.material} Material</div>
              <div>
                {configuration.material === "Soft Polycarbonate"
                  ? "$5.00"
                  : "$0.00"}
              </div>
            </div>
          </div>
          <Separator className="my-5" />
          <div className="flex w-full justify-between font-bold">
            <div>Order total</div>
            <div>
              {configuration.finish === "Textured" &&
              configuration.material === "Soft Polycarbonate"
                ? "$22.00"
                : ""}
              {configuration.finish === "Smooth" &&
              configuration.material === "Soft Polycarbonate"
                ? "$19.00"
                : ""}
              {configuration.finish === "Smooth" &&
              configuration.material === "Silicon"
                ? "$14.00"
                : ""}
              {configuration.finish === "Textured" &&
              configuration.material === "Silicon"
                ? "$17.00"
                : ""}
            </div>
          </div>
          <CheckoutLoading id={configuration.id} text={"Checkout"} />
        </div>
      </div>
    </div>
  );
}

export default page;
