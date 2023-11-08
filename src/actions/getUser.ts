import prisma from "@/libs/prismadb";

export default async function getUser(slug: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
    };
  } catch (error: any) {
    return null;
  }
}
