'use server';

import { join } from "path";
import { unlink, writeFile} from "fs/promises";
import { db } from "@/lib/db";
const prisma = db;

export async function saveFile(file: File): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    //const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
    const filePath = join(process.cwd(), "public","uploads", file.name);
    try {
        await writeFile(filePath, buffer);
    } catch (error) {
        console.error("Error saving file:", error);
        throw new Error("Failed to save file");
    }
    return `/uploads/${file.name}`;    
}

export async function deleteFile(fileUrl: string) {
    if (!fileUrl) return;

    const filePath = join(process.cwd(), "public", fileUrl.replace("/uploads/", "uploads/"));
    try {
        await unlink(filePath)
    } catch (error) {
        console.error("Error deleting file:", error);
    }
    await prisma.projectImage.deleteMany({where: {url: fileUrl}});
}