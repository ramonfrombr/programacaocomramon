import { PrismaClient } from "@prisma/client";

// This is to prevent error from hot reload in development. globalThis is not affected from hot reload

declare global {
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
