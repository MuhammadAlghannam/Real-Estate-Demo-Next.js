import MainAvatar from "@/components/shared/MainAvatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getSingleDeveloper } from "@/lib/apis/developers/single-developer.api";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import CompoundsList from "../_components/compounds-list";
import OffersCard from "../_components/offers-card";

// Dynamic metadata per Next.js App Router
export async function generateMetadata(
  { params }: { params: Promise<{ developersId: string }> }
): Promise<Metadata> {
  const { developersId } = await params;
  try {
    const developer = await getSingleDeveloper(developersId);
    const title = developer?.data?.name || "Developer";
    const description = developer?.data?.description || `Explore properties and compounds by ${developer?.data?.name}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://hansyrealestate.com/developers/${developersId}`,
        type: "article",
        images: developer?.data?.logo_url ? [developer.data.logo_url] : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Developer",
      description: "",
    };
  }
}

export default async function Page({ params }: { params: Promise<{ developersId: string }> }) {
  // translations
  const t = await getTranslations("DevelopersSinglePage");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  const { developersId } = await params;

  // Fetch single developer
  const developer = await getSingleDeveloper(developersId);

  // Validations
  if (!developersId || !developer?.data || developer?.data?.id !== parseInt(developersId))
    return notFound();


  return (
    <section className="container-1440 py-10 md:py-20">

      {/* Developer details */}
      <div className="flex gap-4 items-center">
        {/* Image */}
        <MainAvatar src={developer.data.logo_url} className="size-[100px]" />

        {/* Titles */}
        <div className="flex flex-col gap-1">
          <p className="text-h4-semibold">{developer.data.name}</p>
          <p className="text-h6-regular">{developer.data.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="compounds" className="w-full mt-6">
        <TabsList className={cn("mb-6!", isArabic ? "flex-row-reverse" : "flex-row")}>
          <TabsTrigger value="offers">{t("tabs.offers")}</TabsTrigger>
          <TabsTrigger value="compounds">{t("tabs.compounds")}</TabsTrigger>
        </TabsList>

        <TabsContent value="offers">
          <OffersCard offersData={developer.data.offers} />
        </TabsContent>

        <TabsContent value="compounds">
          <CompoundsList compoundsData={developer.data.compounds} />
        </TabsContent>
      </Tabs>

    </section>
  );
}
