import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  // Получаем из запроса тело и сохраняем.
    const body = await request.json();

    // Выполняем валидацию
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // Если валидация успешно выполнилась, сохраняем переданный issue в БД.
    const newIssue = await prisma.issue.create({
        data: {
          title: body.title,
          description: body.description
        }
    });

  // Возвращаем результат
    return NextResponse.json(newIssue, { status: 201 });
}