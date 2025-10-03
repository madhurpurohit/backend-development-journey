import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loadLinks = async () => {
  const links = await prisma.shortCode.findMany();
  return links;
};

export const checkShortCode = async (finalShortCode) => {
  const isPresent = await prisma.shortCode.findUnique({
    where: { shortCode: finalShortCode },
  });

  return isPresent;
};

export const addShortenerLinks = async ({ shortCode, url }) => {
  const addShortCode = await prisma.shortCode.create({
    data: {
      shortCode,
      url,
    },
  });
  // console.log(addShortCode);

  return addShortCode;
};
