import { db } from "@/db";
import { transactionsTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { owner, category, date } = await req.json();
    const transaction: typeof transactionsTable.$inferInsert = {
      owner,
      category,
      date,
    };

    const result = await db
      .insert(transactionsTable)
      .values(transaction)
      .returning();

    return NextResponse.json({ data: result, message: "Success insert data" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
