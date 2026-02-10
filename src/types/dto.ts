export type CreateProjectDTO = {
    title: string;
    slug: string;
    textContent: string;
    mainImageUrl: string;
    galleryImagesData: {
        url: string;
        order: number;
        altText: string;
    }[];
};

export type UpdateProjectDTO = {
    project: CreateProjectDTO;
    filesToUpdate: Map<string, number>;
};