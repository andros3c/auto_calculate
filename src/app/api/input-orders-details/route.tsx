import { db } from "@/db";
import { ordersDetailsTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

interface Payload {
  data: (typeof ordersDetailsTable.$inferInsert)[];
}
export const POST = async (req: NextRequest) => {
  try {
    const transaction: Payload = await req.json();
    console.log(transaction);
    const result = await db
      .insert(ordersDetailsTable)
      .values(transaction.data)
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
