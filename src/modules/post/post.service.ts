import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'authorId'>, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...data,
            authorId: userId
        }
    });
    return result;
};

const getAllPosts = async ({ search, tags, page, limit, skip }: {
    search?: string | undefined,
    tags: string[] | [],
    page: number,
    limit: number,
    skip: number
}) => {

    const adnConditions: PostWhereInput[] = [];

    if (search) {
        adnConditions.push({
            OR: [
                {
                    title: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    content: {
                        contains: search as string,
                        mode: "insensitive"
                    }
                },
                {
                    tags: {
                        has: search as string
                    }
                }
            ]
        })
    }

    if (tags.length > 0) {
        adnConditions.push({
            tags: {
                hasEvery: tags as string[]
            }
        })
    }

    const result = await prisma.post.findMany({
        take: limit,
        skip,        
        where: {
            AND: adnConditions
        }
    });
    return result;
}

export const postService = {
    createPost,
    getAllPosts
}