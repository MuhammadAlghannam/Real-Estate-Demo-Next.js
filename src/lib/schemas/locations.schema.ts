import { z } from "zod";

export const LocationsFilterSchema = z.object({
  city_id: z.string().optional(),
  area_id: z.string().optional(),
  type: z.string().optional(),
  rooms: z.array(z.number()).optional(),
  bath_rooms: z.array(z.number()).optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  min_area: z.number().optional(),
  max_area: z.number().optional(),
});

export type LocationsFilterFields = z.infer<typeof LocationsFilterSchema>;
