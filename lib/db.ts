import { PrismaClient } from "@prisma/client";

// globalThis survives Next.js hot reload; drop stale clients after schema changes.

declare global {
    var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
    return new PrismaClient();
}

function getPrismaClient() {
    const cached = globalThis.prisma;
    if (process.env.NODE_ENV !== "production" && cached) {
        const stale = cached as unknown as Record<string, unknown>;
        if (!("seminar" in stale)) {
            void cached.$disconnect();
            globalThis.prisma = undefined;
        }
    }

    if (!globalThis.prisma) {
        globalThis.prisma = createPrismaClient();
    }

    return globalThis.prisma;
}

export const db = getPrismaClient();
