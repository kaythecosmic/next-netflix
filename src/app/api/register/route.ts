import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    // checking if  hte request was a POST request?
    // console.clear();
    console.log("you are in route.ts");

    if (req.method != "POST") {
        return new Response("Hello", {
            status: 405,
        });
    }

    try {
        const { email, username, password } = await req.json();

        console.log(email);
        console.log(username);
        console.log(password);

        const existingUser = await prismadb.user.count({
            where: {
                email: email.toString(),
            },
        });

        console.log("checked existing user");

        if (existingUser != 0) {
            return new Response("Email exists already.", {
                status: 422,
            });
        }

        console.log("This ran 3!");

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prismadb.user.create({
            data: {
                email: email.toString(),
                username: username.toString(),
                hashedPassword,
                image: "",
                emailVerified: new Date(),
            },
        });

        return new Response("Register Successful", {
            status: 200,
        });

    } catch (error) {
        console.log(error);
        return new Response("Register Failed", {
            status: 400,
        });
    }
}
