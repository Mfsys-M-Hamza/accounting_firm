import type { NextRequest } from "next/server";
import { handleForm } from "@/lib/forms/server";

export async function POST(req: NextRequest) {
  return handleForm(req, "contact");
}
