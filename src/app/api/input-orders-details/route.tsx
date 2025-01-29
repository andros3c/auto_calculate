import { db } from "@/db";
import { ordersDetailsTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const transaction: (typeof ordersDetailsTable.$inferInsert)[] =
      await req.json();
    const result = await db
      .insert(ordersDetailsTable)
      .values(transaction)
      .returning();

    return NextResponse.json({
      data: result,
      message: "Transaksi Berhasil disimpan",
      status: "OK",
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
