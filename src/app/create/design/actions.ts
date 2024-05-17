"use server";
import prisma from "@/db";
export default async function updateConfig({
  smoothFinish,
  freeMaterial,
  configId,
  selectedColor,
  value,
  croppedImageUrl,
}: {
  smoothFinish: boolean;
  freeMaterial: boolean;
  configId: string;
  selectedColor: string;
  value: string;
  croppedImageUrl: string;
}) {
  let finish;
  let material;
  if (smoothFinish) {
    finish = "Smooth";
  } else {
    finish = "Textured";
  }

  if (freeMaterial) {
    material = "Silicon";
  } else {
    material = "Soft Polycarbonate";
  }

  await prisma.configuration.update({
    where: {
      id: configId,
    },
    data: {
      color: selectedColor,
      finish: finish,
      material: material,
      model: value,
      croppedImageUrl,
    },
  });
}
