// "use server";
// import prisma from "@/db";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";
// export async function checkAuth(id: string) {
//   const { getUser } = getKindeServerSession();

//   const user = await getUser();

//   if (!user?.id || !user?.email) {
//     throw new Error("No User Found");
//   }

//   const existingUser = await prisma.user.findFirst({
//     where: { id: user.id },
//   });

//   if (!existingUser) {
//     const userCreated = await prisma.user.create({
//       data: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//     if (userCreated) {
//       return { success: true };
//     }
//   }

//   if (user?.email) {
//     redirect(`/create/design/checkout?id=${id}`);
//   } else {
//     redirect(`/api/auth/login`);
//   }
// }
