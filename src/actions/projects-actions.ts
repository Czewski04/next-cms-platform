'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveFile, deleteFile } from "@/services/storage-service";
import { getProjectsFromDb, getProjectByIdFromDb, createProjectInDb, updateProjectInDb, deleteProjectFromDb, getAllProjectImages } from "@/services/db-service";
import { CreateProjectDTO, UpdateProjectDTO } from "@/types/dto";

const prisma = db;

export async function getProjects() {
    try{
        const response = await getProjectsFromDb();
        return response;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Failed to fetch projects");
    }
}

export async function getProjectById(id: string) {
    try{
        const response = await getProjectByIdFromDb(id);
        return response;
    } catch (error) {
        console.error("Error fetching project:", error);
        throw new Error("Failed to fetch project");
    }
}

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const textContent = formData.get("description") as string;
    const galleryFiles = formData.getAll("gallery") as File[];
    const galleryOrders = formData.getAll("galleryOrders") as string[];
    try{
        const fileMap = new Map<string, File>();
        galleryFiles.forEach(file => {
            fileMap.set(file.name, file);
        });
        const galleryImagesData = await Promise.all(galleryOrders.map(async (fileNameFromOrder, index) => {
            const file = fileMap.get(fileNameFromOrder);

            if(!file) {
                throw new Error(`File not found for name: ${fileNameFromOrder}`);
            }

            const savedUrl = await saveFile(file);
            return {
                url: savedUrl,
                order: index,
                altText: `${title} - Gallery Image ${index + 1}`
            }
        }));
        const mainImageUrl = galleryImagesData.find(img => img.order === 0)?.url || "";
        const createProjectDTO: CreateProjectDTO = {
            title,
            slug,
            textContent,
            mainImageUrl,
            galleryImagesData
        };
        await createProjectInDb(createProjectDTO);
    } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project");
    }
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${slug}`);
    redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const textContent = formData.get("description") as string;
    const deletedImageUrls = formData.getAll("deletedImages") as string[];
    const galleryNewFiles = formData.getAll("newImages") as File[];
    const galleryOrders = formData.getAll("galleryOrders") as string[];

    try{
        await Promise.all(deletedImageUrls.map(url => deleteFile(url)));

        const fileMap = new Map<string, File>();
        galleryNewFiles.forEach(file => {
            fileMap.set(file.name, file);
        });
        const galleryImagesData = (await Promise.all(galleryOrders.map(async (fileNameFromOrder, index) => {
            const file = fileMap.get(fileNameFromOrder);

            if(file) {
                const savedUrl = await saveFile(file);
                return {
                    url: savedUrl,
                    order: index,
                    altText: `${title} - Gallery Image ${index + 1}`
                }
            }
            else {
                return null;
            }
        }))).filter(img => img !== null);

        let mainImageUrl = "";
        if(galleryOrders.length > 0){
            mainImageUrl = galleryImagesData.find(img => img.order === 0)?.url || galleryOrders[0];
        }

        const filesToUpdate = new Map<string, number>();
        for (let i = 0; i < galleryOrders.length; i++) {
            const existingImageUrl = galleryOrders[i];
            if (!fileMap.has(existingImageUrl)) {
                filesToUpdate.set(existingImageUrl, i);
            }
        }

        const updateProjectDTO: UpdateProjectDTO = {
            project: {
                title,
                slug,
                textContent,
                mainImageUrl,
                galleryImagesData
            },
            filesToUpdate
        };

        await updateProjectInDb(id, updateProjectDTO);

    } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Failed to update project");
    }
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${slug}`);
    redirect("/admin/projects");
}

export async function deleteProject(id: string) {
    try{
        const allProjectImages = await getAllProjectImages(id);
        await Promise.all(allProjectImages.map(img => deleteFile(img.url)));
        await deleteProjectFromDb(id);
    } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Failed to delete project");
    }
}
