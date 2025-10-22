import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET all tasks
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// POST (create task)
export async function POST(request: Request) {
  const data = await request.json();
  const task = await prisma.task.create({
    data: { title: data.title, completed: false },
  });
  return NextResponse.json(task);
}

// PUT (update task)
export async function PUT(request: Request) {
  const data = await request.json();
  const task = await prisma.task.update({
    where: { id: data.id },
    data: { title: data.title, completed: data.completed },
  });
  return NextResponse.json(task);
}

// DELETE (remove task)
export async function DELETE(request: Request) {
  const data = await request.json();
  await prisma.task.delete({ where: { id: data.id } });
  return NextResponse.json({ message: 'Deleted successfully' });
}
