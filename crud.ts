import { prisma } from "./lib/prisma";

async function run() {
    // const createUser = await prisma.user.create({
    //     data: {
    //         name: "Ummey Habiba",
    //         email: "habiba@gmail.com"
    //     }
    // });
    // console.log("Created user: ", createUser)

    // create post for user id = 1    
    // const createPost = await prisma.post.create({
    //     data: {
    //         title: "this is title",
    //         content: "this is a big content",
    //         authorId: 1
    //     }
    // })
    // console.log("Created Post: ", createPost)

    //create profile
    // const createProfile = await prisma.profile.create({
    //     data: {
    //         bio: "next level programming",
    //         userId: 1
    //     }
    // });
    // console.log("Created profile: ", createProfile)

    // retrive all user
    const users = await prisma.user.findMany({
        // include: {
        //     posts: true,
        //     profile: true
        // }

        select: {
            id: true,
            name: true,
            email: true,
            posts: true,
            profile: true
        }
    });
    console.dir(users, {depth: Infinity})
}

run();