"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import useAddWishlist from "@/hooks/use-add-wishlist";
import useRemoveWishlist from "@/hooks/use-remove-wishlist";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function OppertunitiesCardTop({ propertyId, isFavorited }: { propertyId: number, isFavorited?: boolean }) {
  // data
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Mutation
  const { mutate: addWishlist, isPending: addPending } = useAddWishlist();
  const { mutate: removeWishlist, isPending: removePending } = useRemoveWishlist();

  // Functions
  const handleWishlist = () => {
    if (userId) {
      if (isFavorited) {
        removeWishlist(propertyId)
      } else {
        addWishlist(propertyId);
      }
    } else {
      toast.error("You should login first")
    }
  }

  return (
    <div className="flex justify-end">
      <CustomeBtn
        className="p-2.5 bg-white! rounded-full w-fit cursor-pointer"
        disabled={addPending || removePending}
        onClick={handleWishlist}
      >
        <Heart
          className="h-5 w-5 text-primary"
          strokeWidth={1.5}
          fill={isFavorited ? "#b12028" : "none"}
        />
      </CustomeBtn>
    </div>
  )
}
