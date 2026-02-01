import { useQuery } from "@tanstack/react-query";

export default function useGetLocations() {
  const {
    isPending,
    data: payload,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await fetch('/api/locations');

      const payload: LocationsResponse = await response.json();

      return payload;
    },
  });

  return { payload, isPending };
}
