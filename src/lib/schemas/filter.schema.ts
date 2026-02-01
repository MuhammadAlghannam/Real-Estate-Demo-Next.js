import { z } from "zod";

export function getFilterSchema(t: (key: string) => string) {
  return z.object({
    type: z.string().optional(),
    city_id: z.string().optional(),
    min_price: z.number({
      invalid_type_error: t("validation.min-price-invalid"),
    }).optional(),
    max_price: z.number({
      invalid_type_error: t("validation.max-price-invalid"),
    }).optional(),
  }).refine(
    (data) => {
      if (data.min_price !== undefined && data.max_price !== undefined) {
        return data.min_price <= data.max_price;
      }
      return true;
    },
    {
      message: t("validation.price-range-invalid"),
      path: ["max_price"],
    }
  );
}

export type FilterSchemaFields = z.infer<ReturnType<typeof getFilterSchema>>;

