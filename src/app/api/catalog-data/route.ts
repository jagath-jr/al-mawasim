// src/app/api/catalog-data/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

  const catalog = await prisma.catalog.findUnique({ where: { id } });
  return NextResponse.json(catalog);
}