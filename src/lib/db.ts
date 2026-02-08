import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';


const prismaClient = () => {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({connectionString, max: 20,})
    const adapter = new PrismaPg(pool);
    return new PrismaClient({adapter});
};


declare global {
    var prisma: undefined | ReturnType<typeof prismaClient>;
}

export const db = globalThis.prisma || prismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;