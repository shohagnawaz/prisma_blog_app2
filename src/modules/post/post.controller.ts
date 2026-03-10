import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized",
            });
        }
        const result = await postService.createPost(req.body, user.id as string)
        res.status(201).json(result)
    }
    catch(error) {
        res.status(400).json({
            error: "Post creation failed",
            details: error
        })
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    try {
        const search = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
        // For pagination
        const page = Number(req.query.page ?? 1)
        const limit = Number(req.query.limit ?? 10)

        const skip = (page - 1) * limit

        const result = await postService.getAllPosts({search: searchString, tags, page, limit, skip});
        res.status(200).json(result)
    }
    catch(error) {
        res.status(400).json({
            error: "Failed to fetch posts",
            details: error
        })
    }
} 

export const PostController = { createPost, getAllPosts }