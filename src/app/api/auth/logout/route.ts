import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  await signOut({
    redirectTo: "/login",
  });

  // Return a response (though signOut will handle redirect)
  return NextResponse.redirect(new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"));
}
