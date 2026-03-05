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
    // const users = await prisma.user.findMany({
    //     // include: {
    //     //     posts: true,
    //     //     profile: true
    //     // }

    //     select: {
    //         id: true,
    //         name: true,
    //         email: true,
    //         posts: true,
    //         profile: true
    //     }
    // });
    // console.dir(users, {depth: Infinity})

    // update user data
    // const updateUser = await prisma.profile.update({
    //     where: {
    //         userId: 1
    //     },
    //     data: {
    //         bio: "web developer & hardware expert",
    //         dateOfBirth: "2026-03-04T06:44:07.990Z"
    //     },
    //     select: {
    //         id: true,
    //         bio: true,
    //         user: true
    //     }
    // });
    // console.log("updated user: ", updateUser)

    // delete user
    // const deleteUser = await prisma.user.delete({
    //     where: {
    //         id: 2
    //     }
    // })
    // console.log(deleteUser)

    // get user data by id
    // const getUserDataById = await prisma.user.findUnique({
    //     where: {
    //         id: 2
    //     },
    //     include: {
    //         posts: true,
    //         profile: true
    //     }
    // })
    // console.log(getUserDataById)

    // upsert
    const upsertUser = await prisma.user.upsert({
        where: {
            email: "abijabi@gmail.com"
        },
        update: {
            name: "Mr. Abi Jabi"
        },
        create: {
            name: "Mr. Abi Jabi",
            email: "abijabi@gmail.com"
        }
    });
    console.log(upsertUser)
}

run();