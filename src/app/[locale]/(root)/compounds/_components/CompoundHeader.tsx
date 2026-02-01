import MainAvatar from "@/components/shared/MainAvatar";
import TruncateHTML from "@/components/shared/TruncateHTML";
import TruncateWords from "@/components/shared/TruncateWords";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CompoundHeaderProps = {
  name: string;
  aboutHtml: string | null;
  developer: Developer | null; // ✅ allow null
};

export default function CompoundHeader({ name, aboutHtml, developer }: CompoundHeaderProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <TruncateWords maxWords={20} className="sm:text-h3-semibold text-h5-semibold text-black">
          {name}
        </TruncateWords>

        {/* Developer Avatar with Tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer">
              <MainAvatar
                src={developer?.logoUrl || ""}
                className="size-[50px]"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{developer?.name || ""}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Description with Read More */}
      {aboutHtml && (
        <div className="mt-2">
          <TruncateHTML
            htmlContent={aboutHtml}
            maxWords={30}
            className="md:text-h6-regular text-h7-regular text-black"
          />
        </div>
      )}
    </div>
  );
}
