import { useQuery } from "@tanstack/react-query";

export default function usePropertyStatus() {
  const {
    isPending,
    data: payload,
  } = useQuery({
    queryKey: ["property-status"],
    queryFn: async () => {
      const response = await fetch('/api/property-status');

      const payload: PropertyStatusResponse = await response.json();

      return payload;
    },
  });

  return { payload, isPending };
}
