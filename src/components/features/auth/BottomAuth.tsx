import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type BottomAuthFormProps = {
  variant?: "login" | "register" | "forget-password";
};

export default function BottomAuth({ variant = "login" }: BottomAuthFormProps) {
  const t = useTranslations("LoginPage.bottom-auth");
  const isLogin = variant === "login";
  const isRegister = variant === "register";
  const isForgetPassword = variant === "forget-password";

  const linkHref = isLogin ? "/register" : "/login";
  const linkText = isLogin ? t("register") : t("log-in");
  const promptText = isLogin
    ? t("no-account-prompt")
    : t("has-account-prompt");
  return (
    <>
      {/* Google & Apple - only show for login and signup */}
      {(isLogin || isRegister) && (
        <div className="mt-5">
          {/* <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-border" />
            <span className="text-text-gray text-h8-regular">or continue with</span>
            <div className="h-[1px] flex-1 bg-border" />
          </div> */}

          {/* Google & Apple Btns */}
          {/* <GoogleAppBtn /> */}
        </div>
      )}

      {/* Account prompt - only show for login and signup */}
      {(isLogin || isRegister) && (
        <div className="text-black mt-10 text-center">
          <span className="text-h8-regular">{promptText}</span>{" "}
          <Link href={linkHref} className="text-h8-semibold text-primary underline">{linkText}</Link>
        </div>
      )}

      {/* For forget password and change password, show login link */}
      {(isForgetPassword) && (
        <div className="text-black mt-10 text-center">
          <span className="text-h8-regular">{t("remember-password")}</span>{" "}
          <Link href="/login" className="text-h8-semibold text-primary underline">{t("log-in")}</Link>
        </div>
      )}
    </>
  )
}
