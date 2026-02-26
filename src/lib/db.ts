// Database client - configured when a PostgreSQL connection is available.
// For Prisma v7, an adapter or accelerateUrl must be provided.
// See: https://www.prisma.io/docs/orm/prisma-client
//
// Usage:
//   import { db } from "@/lib/db";
//   const users = await db.user.findMany();

import { PrismaClient } from "@/generated/prisma/client";

let prismaInstance: PrismaClient | null = null;

export function getDb(): PrismaClient {
  if (!prismaInstance) {
    throw new Error(
      "Database not configured. Set DATABASE_URL or provide an adapter in src/lib/db.ts"
    );
  }
  return prismaInstance;
}

// Will be initialised once database connection is configured
export const db = null as unknown as PrismaClient;
