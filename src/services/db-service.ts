'use server';

import { db } from "@/lib/db";
import { CreateProjectDTO, UpdateProjectDTO } from "@/types/dto";
const prisma = db;

export async function createProjectInDb(data: CreateProjectDTO) {
    return await prisma.project.create({
        data: {
            title: data.title,
            slug: data.slug,
            textContent: data.textContent,
            mainImageUrl: data.mainImageUrl,
            gallery: {
                create: data.galleryImagesData
            }
        }
    });
}

export async function updateProjectInDb(id: string, data: UpdateProjectDTO) {
    await prisma.$transaction(async (transaction) => {
        await transaction.project.update({
            where: { id },
            data: {
                title: data.project.title,
                slug: data.project.slug,
                textContent: data.project.textContent,
                mainImageUrl: data.project.mainImageUrl,
                gallery: {
                    create: data.project.galleryImagesData
                }
            }
        });

        for (const [url, order] of data.filesToUpdate.entries()) {
            await transaction.projectImage.updateMany({
                where: { url },
                data: { order }
            });
         }
    })
}

export async function getProjectsFromDb() {
    return await prisma.project.findMany();
}

export async function getProjectByIdFromDb(id: string) {
    return await prisma.project.findUnique({where: {id}});
}

export async function getAllProjectImages(projectId: string) {
    return await prisma.projectImage.findMany({where: {projectId}});
}

export async function deleteProjectFromDb(id: string) {
    await prisma.project.delete({where: {id}});
}