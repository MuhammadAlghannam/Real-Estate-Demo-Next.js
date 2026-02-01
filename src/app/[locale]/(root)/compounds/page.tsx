import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CompoundsList from "./_components/CompoundsList";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AllCompoundsPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations("AllCompoundsPage");

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      <h1 className="md:text-h1-semibold text-h2-semibold text-black mb-12 text-center">{t("title")}</h1>
      <CompoundsList searchParams={searchParams} />
    </section>
  );
}
