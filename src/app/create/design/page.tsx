import UploadSteps from "@/components/UploadSteps";
import prisma from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}
async function Page({ searchParams }: PageProps) {
  console.log(searchParams);

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

  const { imageUrl, height, width } = configuration;

  return (
    <div className="max-w-[90vw] mx-auto ">
      <UploadSteps />
      <DesignConfigurator
        configId={configuration.id}
        imageDimension={{ width, height }}
        imageUrl={imageUrl}
      />
    </div>
  );
}

export default Page;
