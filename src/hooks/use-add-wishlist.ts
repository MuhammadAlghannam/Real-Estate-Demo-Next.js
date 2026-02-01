import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useAddWishlist() {
  const router = useRouter();
  const { data: session } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: async (propertyId: number) => {
      // Check if user is logged in
      if (!session?.user) {
        toast.error("You need to login first");
      }

      const params = new URLSearchParams({
        propertyId: propertyId.toString(),
      });
      const response = await fetch(`/api/wishlist?${params}`);

      const payload = await response.json();

      return payload;
    },
    onSuccess() {
      router.refresh();
    },
  });

  return { mutate, isPending };
}


