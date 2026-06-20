import { PrismaClient } from "@prisma/client";

// globalThis survives Next.js hot reload; drop stale clients after schema changes.

declare global {
    var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
    return new PrismaClient();
}

function getPrismaClient() {
    if (
        process.env.NODE_ENV !== "production" &&
        globalThis.prisma &&
        !("seminar" in globalThis.prisma)
    ) {
        void globalThis.prisma.$disconnect();
        globalThis.prisma = undefined;
    }

    if (!globalThis.prisma) {
        globalThis.prisma = createPrismaClient();
    }

    return globalThis.prisma;
}

export const db = getPrismaClient();
