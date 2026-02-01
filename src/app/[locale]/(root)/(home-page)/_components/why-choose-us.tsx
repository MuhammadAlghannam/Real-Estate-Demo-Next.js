import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="py-10 md:py-20 flex flex-col gap-6 relative overflow-hidden">

      {/*  Image with line */}
      <div className="absolute top-0 right-20 w-[150px] before:content-[''] before:absolute before:top-0 before:left-[-400px] before:w-[900px] before:h-[6px] before:bg-black before:z-10 hidden md:block">
        <Image
          src="/images/home/tooltip-container.png"
          alt="background"
          className="absolute top-0 right-0 opacity-90 pointer-events-none select-none z-0"
          width={100}
          height={100}
        />
      </div>

      {/* Title */}
      <div className="text-center container-1440">
        <h2 className="text-h3-semibold md:text-h2-semibold text-black mb-1">Why Choose Us ?</h2>
        <p className="text-h6-regular text-text-black w-full md:w-3/4 mx-auto">
          Finding your dream home shouldn&apos;t be complicated. Whether you&apos;re buying, selling, or investing, you deserve a team that understands the local market and puts your needs first. With our expertise, personalized service, and deep roots in the community, we make every real estate journey seamless and rewarding.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch container-1440">

        {/* 1st card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🏆</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">Local Expertise</p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">Deep understanding of Egypt’s market and property trends</p>
        </div>

        {/* 2nd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">👥</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">Professional Team </p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">Trained, certified agents ready to help</p>
        </div>

        {/* 3rd card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">⭐</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">High Success Rate </p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">95% client satisfaction and referral rate</p>
        </div>

        {/* 4th card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">🤝</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">Personalized Approach </p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">We listen, we understand, we deliver</p>
        </div>

        {/* 5th card */}
        <div className="flex flex-col gap-5 py-10 px-5 rounded-lg border border-border items-start group hover:border-primary hover:bg-primary transition-colors">
          {/* Icon */}
          <div className="rounded-full p-3.5 border border-primary mb-6 bg-white">
            <p className="text-h3-semibold">⚙️</p>
          </div>
          {/* Title */}
          <p className="text-h5-semibold text-black group-hover:text-white transition-colors">Tech-Driven Tools </p>
          <p className="text-muted-foreground text-h6-regular group-hover:text-white transition-colors">Smart filters, live listings, instant communication</p>
        </div>

      </div>

      {/*  Underline */}
      <div className="absolute bottom-0 left-0 w-[150px] before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-[450px] before:h-[6px] before:bg-black before:z-10 hidden md:block"></div>
    </section>
  )
}
