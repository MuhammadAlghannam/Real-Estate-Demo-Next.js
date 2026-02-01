import Empty from "@/components/shared/Empty";
import TruncateWords from "@/components/shared/TruncateWords";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { noLinkImage } from "@/lib/utils/helper";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface Props {
  property: Property
}

export default async function PropertyVideo({ property }: Props) {
  const t = await getTranslations("PropertySinglePage.property-video");

  if (!property.video_id) return <Empty>{t("empty-state")}</Empty>;

  return (
    <div className="mt-6">
      <TruncateWords
        maxWords={30}
        showReadMore={true}
        className="text-h6-regular text-text-gray-dark"
      >
        {property.video_description}
      </TruncateWords>

      <div className="mt-6">
        <VideoPlayer
          url={property.video_id}
          thumbnail={
            <Image
              src={noLinkImage(property.video_thumbnail)}
              alt={t("alt.video-thumbnail")}
              width={1000}
              height={600}
              className="w-full sm:h-[600px] h-[300px] rounded-lg object-cover"
              quality={75}
            />}
          width="100%"
          height="600px"
          className="rounded-lg overflow-hidden"
        />
      </div>
    </div>
  )
}
