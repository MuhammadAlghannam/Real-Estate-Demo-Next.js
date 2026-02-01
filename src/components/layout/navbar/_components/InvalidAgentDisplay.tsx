"use client";

import { useTranslations } from "next-intl";

export default function InvalidAgentDisplay() {
  // Translation
  const t = useTranslations("VerifyAgent.invalid-agent-display");

  return (
    <div className="sm:p-6 p-4 border border-primary rounded-lg bg-[#FDE3E4]">
      <h3 className="sm:text-h4-semibold text-h6-semibold text-primary">{t("title")}</h3>
      {/* Message */}
      <p className="sm:text-h6-regular text-h7-regular text-black mt-3">
        {t("message")}
      </p>
    </div>
  );
}

