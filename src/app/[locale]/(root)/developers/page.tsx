import { getTranslations } from "next-intl/server";
import DevelopersList from "./_components/developers-list";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AllDevelopersPage' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  };
}

export default async function Page() {
  const t = await getTranslations("AllDevelopersPage");

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      <h1 className="md:text-h1-semibold text-h2-semibold text-black mb-12 text-center">{t("title")}</h1>
      <DevelopersList />
    </section>
  );
}
