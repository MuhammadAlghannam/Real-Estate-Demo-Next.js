import { Hero, OfferingsOppertunities, SecondSectionCards, SellingOption, TopCompounds, TopDevelopers, UnlockYourPotential } from "./(home-page)/_components";
import HansayApp from "./(home-page)/_components/hansay-app";

export default function Page() {

  return (
    <>
      <Hero />
      <SecondSectionCards />
      {/* <WhyChooseUs /> */}
      <TopDevelopers />
      <OfferingsOppertunities />
      <TopCompounds />
      <SellingOption />
      {/* <Newsletter /> */}
      <UnlockYourPotential />
      <HansayApp />
    </>
  )
}
