import { PrismaClient } from "@prisma/client";

// @ts-ignore
const prisma = global.prisma || new PrismaClient();
// use `prisma` in your application to read and write data in your DB
export default prisma;
