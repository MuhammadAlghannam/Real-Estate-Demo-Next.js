import Footer from "@/components/layout/footer/Footer";
import NavBar from "@/components/layout/navbar/NavBar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* <div className="flex-center flex-col h-dvh text-center text-h4-semibold text-primary">
        Logo
        <Image
          src={"/images/logos/logo-auth.svg"}
          alt={"Hansy logo"}
          width={88}
          height={52}
          className="w-[88px] h-[52px]"
          priority
          quality={75}
        />

        <span className="mt-4">Comming Soon...</span>
      </div> */}
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}


