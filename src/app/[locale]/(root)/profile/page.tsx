import { auth } from "@/auth";
import getUserInfo from "@/lib/apis/profile/user-info.api";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import ProfileForm from "./_components/profile-form";

// Metadata
export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "ProfilePage.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page() {
  const t = await getTranslations("ProfilePage");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  // Session
  const session = await auth();
  if (!session) return null;

  // Check for expired refresh token and sign out if needed
  if (session?.error === "RefreshTokenExpiredError") {
    redirect("/api/auth/logout");
  }

  // Get user info
  const initialUser: ApiUser | undefined = await getUserInfo();

  return (
    <section className="flex flex-col gap-8">
      {/* Title */}
      <h1 className={cn("relative text-h3-semibold md:text-40-semibold ps-6")}>
        {t("title")}
        <span className={cn("before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary", isArabic ? "before:right-0" : "before:left-0")}></span>
      </h1>

      {/* Form */}
      <div className="flex flex-col gap-6">
        <ProfileForm initialUser={initialUser} />
      </div>
    </section >
  )
}
