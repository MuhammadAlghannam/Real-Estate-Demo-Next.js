"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Controller, useForm } from "react-hook-form"

import CustomeBtn from "@/components/shared/CustomeBtn"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "@/i18n/navigation"
import { getFilterSchema, type FilterSchemaFields } from "@/lib/schemas/filter.schema"
import useGetLocations from "../../properties/_hooks/use-locations"

interface FastFilterFormProps {
  propertyTypes: PropertyType[];
}

export default function FastFilterForm({ propertyTypes }: FastFilterFormProps) {
  const router = useRouter();
  const t = useTranslations("HomePage.hero.fast-filter-form");

  // data
  const { payload, isPending } = useGetLocations();
  const allCities = payload?.data?.flatMap((country) => country.cities) || [];

  const form = useForm<FilterSchemaFields>({
    resolver: zodResolver(getFilterSchema(t)),
    defaultValues: {
      type: "",
      city_id: "",
      min_price: undefined,
      max_price: undefined,
    },
    mode: "onBlur",
  })

  function onSubmit(values: FilterSchemaFields) {
    const params = new URLSearchParams();

    // Add filters to URL params (only if they have values)
    if (values.type) {
      params.set("type", values.type);
    }
    if (values.city_id) {
      params.set("city_id", values.city_id);
    }
    if (values.min_price) {
      params.set("min_price", values.min_price.toString());
    }
    if (values.max_price) {
      params.set("max_price", values.max_price.toString());
    }

    // Navigate to properties page with filters
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FieldGroup>
        <div className="flex md:flex-row flex-col items-center gap-6">
          {/* Property Type */}
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-2">
                <FieldLabel htmlFor="fast-filter-type" className="!text-h6-semibold text-black">{t("labels.property-type")}</FieldLabel>

                <Select name={field.name} value={field.value} onValueChange={field.onChange} disabled={isPending}>
                  <SelectTrigger id="fast-filter-type" aria-invalid={fieldState.invalid} className="p-0 border-none">
                    <SelectValue placeholder={t("placeholders.select-property-type")} />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((propertyType) => (
                      <SelectItem key={propertyType.id} value={propertyType.slug || ""}>
                        {propertyType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Location */}
          <Controller
            name="city_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex-2">
                <FieldLabel htmlFor="fast-filter-city" className="!text-h6-semibold text-black">{t("labels.location")}</FieldLabel>

                <Select name={field.name} value={field.value} onValueChange={field.onChange} disabled={isPending}>
                  <SelectTrigger id="fast-filter-city" aria-invalid={fieldState.invalid} className="p-0 border-none">
                    <SelectValue placeholder={t("placeholders.select-city")} />
                  </SelectTrigger>
                  <SelectContent>
                    {allCities.map((city) => (
                      <SelectItem key={city.id} value={city.id.toString()}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Price Range */}
          <Field data-invalid={!!(form.formState.errors.min_price || form.formState.errors.max_price)} className="flex-3">
            <FieldContent>
              <FieldLabel className="!text-h6-semibold text-black">{t("labels.price-range")}</FieldLabel>

              <div className="flex items-center gap-3">
                <Controller
                  name="min_price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      id="fast-filter-min-price"
                      type="number"
                      placeholder={t("placeholders.from")}
                      className="p-0 border-none"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  )}
                />
                <span className="text-muted-foreground">-</span>
                <Controller
                  name="max_price"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      id="fast-filter-max-price"
                      type="number"
                      className="p-0 border-none"
                      placeholder={t("placeholders.to")}
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  )}
                />
              </div>
            </FieldContent>
          </Field>

          <div className="flex md:justify-center justify-end flex-1 w-full">
            <CustomeBtn
              type="submit"
            >
              {t("buttons.search")}
            </CustomeBtn>
          </div>
        </div>
      </FieldGroup>
    </form>
  )
}
