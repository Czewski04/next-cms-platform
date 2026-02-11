import { PrismaClient } from '../src/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';

const prismaClient = () => {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({connectionString, max: 20,})
    const adapter = new PrismaPg(pool);
    return new PrismaClient({adapter});
};

async function main() {
    const password: string = process.env.ADMIN_PASSWORD!;
    const email: string = process.env.ADMIN_EMAIL!;
    const passwordHash = await hash(password, 12);

    const user = await prismaClient().user.upsert({
        where: { email: email },
        update: {},
        create: {
            email: email,
            passwordHash: passwordHash,
        },
    });
}

main()
    .then(async () => {
        await prismaClient().$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismaClient().$disconnect();
        process.exit(1);
    });