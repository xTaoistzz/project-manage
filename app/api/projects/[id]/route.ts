import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    return Response.json(project);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, type, description } = await req.json();
    const projectId = Number(params.id);

    const updatePost = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        type,
        description,
      },
    });
    return Response.json(updatePost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = Number(params.id);
    const deletePost = await prisma.project.delete({
      where: { id: projectId },
    });
    return Response.json(deletePost);
  } catch (error) {
    return new Response(error as BodyInit, {
      status: 500,
    });
  }
}
