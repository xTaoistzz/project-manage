import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET() {
    const project = await prisma.project.findMany()
    return Response.json(project)
}

export async function POST(req: Request){
    const { title, type, description } = await req.json();
    const newProject = await prisma.project.create({
        data: {
            title,
            type,
            description
        }
    })
    return Response.json(newProject)
}