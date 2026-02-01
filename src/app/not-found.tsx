import CustomeBtn from "@/components/shared/CustomeBtn";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex-center flex-col lg:flex-row gap-10 lg:gap-24 overflow-hidden pt-10 pb-0 lg:h-screen lg:py-0">

      {/* Left */}
      <div className="text-center lg:text-left w-full lg:w-auto px-10 lg:px-25">
        <div className="py-10 lg:py-15 px-8 lg:px-20 mb-3 container-1440 bg-muted rounded-4xl border border-[#EDEDED] text-center">
          <h1 className="text-5xl sm:text-7xl lg:text-[120px] font-semibold">
            404
          </h1>
          <h2 className="text-h6-regular sm:text-h5-regular lg:text-h4-regular">
            Oops! Page Not Found
          </h2>
        </div>

        <p className="text-center lg:text-start text-muted-foreground px-1 lg:px-0">
          This destination doesn’t exist, but we can help you find the perfect stay!
        </p>

        <div className="pt-5 lg:pt-7 flex justify-center lg:justify-start">
          <CustomeBtn
            href="/"
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            Go back home
          </CustomeBtn>
        </div>
      </div>

      {/* Right */}
      <div className="text-center lg:text-left flex justify-center lg:justify-end items-center w-full lg:w-auto flex-1 h-full">
        <Image
          src="/images/home/not-found-bg.png"
          alt=""
          width={720}
          height={757}
          className="h-full w-full lg:w-auto object-cover"
        />
      </div>
    </main>
  );
}
