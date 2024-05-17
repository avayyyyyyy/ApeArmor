import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import prisma from "@/db";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("---------11--------");
        const { configId } = metadata.input;

        const res = await fetch(file.url);
        console.log("---------12--------");
        const buffer = await res.arrayBuffer();

        const imgMetadata = await sharp(Buffer.from(buffer)).metadata();
        console.log("---------13--------");
        const { width, height } = imgMetadata;

        if (!configId) {
          // Creating a new configuration
          console.log("---------14--------");
          const configuration = await prisma.configuration.create({
            data: {
              imageUrl: file.url,
              height: height || 500,
              width: width || 500,
            },
          });
          console.log("---------15--------");

          return { configId: configuration.id };
        } else {
          console.log("---------16--------");
          const updatedConfiguration = await prisma.configuration.update({
            where: {
              id: configId,
            },
            data: {
              croppedImageUrl: file.url,
            },
          });

          console.log("---------17--------");
          return { configId: updatedConfiguration.id };
        }
      } catch (error) {
        console.log("---------18--------");
        console.error("Failed to run onUploadComplete", {
          error,
          metadata,
          file,
          configId: metadata.input.configId,
        });
        console.log("---------19--------");
        throw error;
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
