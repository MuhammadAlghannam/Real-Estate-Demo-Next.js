import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { MoveRight } from "lucide-react";
import { Suspense } from "react";
import MyPropertiesList from "./_components/MyPropertiesList";

export default function Page() {
  return (
    <section className="flex flex-col gap-8">
      {/* Title & Btn */}
      <div className="flex-between sm:flex-row flex-col sm:items-center items-start gap-3">
        <h1 className="relative text-40-semibold ps-6">
          My Properties
          <span className="before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-10 before:rounded before:bg-primary"></span>
        </h1>

        <CustomeBtn href="/profile/my-properties/property-for-sale" className="py-6">
          Add Property for sale
          <MoveRight className="w-5 h-5 text-white" />
        </CustomeBtn>
      </div>

      {/* My Videos */}
      <Suspense fallback={<LoadingSpinner />}>
        <MyPropertiesList />
      </Suspense>
    </section>
  )
}
