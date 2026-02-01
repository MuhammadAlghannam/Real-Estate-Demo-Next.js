import {
  TabsContent,
} from "@/components/ui/tabs";
import { getLocale } from "next-intl/server";
import GlobalSearchResults from "./GlobalSearchResults";
type Props = {
  search: string;
};

export default async function GlobalSearchTabsContent({ search }: Props) {
  const locale = await getLocale();
  return (
    <>
      <TabsContent value="all">
        <GlobalSearchResults search={search} tab="all" locale={locale} />
      </TabsContent>
      <TabsContent value="properties">
        <GlobalSearchResults search={search} tab="properties" locale={locale} />
      </TabsContent>
      <TabsContent value="developers">
        <GlobalSearchResults search={search} tab="developers" locale={locale} />
      </TabsContent>
      <TabsContent value="compounds">
        <GlobalSearchResults search={search} tab="compounds" locale={locale} />
      </TabsContent>
      <TabsContent value="areas">
        <GlobalSearchResults search={search} tab="areas" locale={locale} />
      </TabsContent>
      <TabsContent value="cities">
        <GlobalSearchResults search={search} tab="cities" locale={locale} />
      </TabsContent>
    </>
  );
}

