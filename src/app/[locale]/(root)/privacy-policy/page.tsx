import ParserHTMLRenderer from "@/components/shared/ParserHTMLRenderer";
import { getPrivacyPolicy } from "@/lib/apis/global/privacy-policy.api";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy",
};

export default async function Page() {

  // Fetch Privacy Policy
  const data = await getPrivacyPolicy();

  return (
    <section className="container-1440 overflow-y-hidden pt-14 pb-20">
      {/* Head */}
      <div className="mb-12">
        <h1 className="md:text-h1-semibold text-h2-semibold text-center">
          Privacy Policy
        </h1>
      </div>

      {/* Policy */}
      <div className="flex flex-col gap-6 border border-border rounded-3xl sm:p-6 p-4 md:p-8 lg:p-10">
        <div className="flex flex-col gap-3">
          <ParserHTMLRenderer htmlContent={data?.privacyPolicy} />
        </div>
      </div>
    </section>
  )
}
