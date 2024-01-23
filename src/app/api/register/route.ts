import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import prismadb from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

    if (req.method != 'POST') {
        return new Response("Hello", {
            status: 405
        })
    }
    
    try {
        const { email, username, password } = await req.json();
        console.log(email);
        console.log(username);
        console.log(password);

        const existingUser = await prismadb.user.findFirst({
            where: {
                email: email,
            }
        });

        console.log("This ran 2!");

        if (existingUser) {
            return new Response("Email exists already.", {
                status: 422
            })
        }
        console.log("This ran 3!");

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email: email,
                username: username,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return new Response("Register Successful", {
            status: 200
        })

    } catch (error) {
        console.log(error);
        return new Response("Register Failed", {
            status: 400
        })
    }

}