"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldTitle
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  LocationsFilterFields,
  LocationsFilterSchema,
} from "@/lib/schemas/locations.schema";
import { noLinkImage } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useGetLocations from "../_hooks/use-locations";

interface FilterFormProps {
  onClose?: () => void;
  propertyTypes: PropertyType[];
  maxBedRoom: number;
  maxBathRoom: number;
  maxArea: number;
  maxPrice: number;
}

export default function FilterForm({ onClose, propertyTypes, maxBedRoom, maxBathRoom, maxArea, maxPrice }: FilterFormProps) {
  // Translations
  const t = useTranslations("AllPropertiesPage");
  const locale = useLocale();
  const isArabic = locale === "ar";

  // variables
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // States
  const [selectedCityId, setSelectedCityId] = useState<string | undefined>(
    searchParams.get("city_id") || undefined
  );

  // data
  const { payload, isPending } = useGetLocations();

  const allCities = payload?.data?.flatMap((country) => country.cities) || [];
  const selectedCity = allCities.find((city) => city.id.toString() === selectedCityId);
  const availableAreas = selectedCity?.areas || [];

  // Set min/max values (min is always 0, max comes from props)
  const minPrice = 0;
  const minArea = 0;

  // Generate dynamic bedroom and bathroom arrays based on max values
  const bedrooms = Array.from({ length: maxBedRoom || 10 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

  const bathrooms = Array.from({ length: maxBathRoom || 10 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));

  // Parse rooms arrays from URL
  const roomsFromUrl = searchParams.getAll("rooms[]").map(Number).filter(Boolean);
  const bathRoomsFromUrl = searchParams.getAll("bath_rooms[]").map(Number).filter(Boolean);

  // Form
  const form = useForm<LocationsFilterFields>({
    resolver: zodResolver(LocationsFilterSchema),
    defaultValues: {
      city_id: searchParams.get("city_id") || "",
      area_id: searchParams.get("area_id") || "",
      type: searchParams.get("type") || "apartment",
      rooms: roomsFromUrl,
      bath_rooms: bathRoomsFromUrl,
      min_price: Number(searchParams.get("min_price")) || minPrice,
      max_price: Number(searchParams.get("max_price")) || maxPrice,
      min_area: Number(searchParams.get("min_area")) || minArea,
      max_area: Number(searchParams.get("max_area")) || maxArea,
    },
    mode: "onChange",
  });

  function onSubmit(values: LocationsFilterFields) {
    const params = new URLSearchParams(searchParams);

    // Reset to page 1 when applying filters
    params.delete("page");

    // Set or remove city_id
    if (values.city_id) {
      params.set("city_id", values.city_id);
    } else {
      params.delete("city_id");
    }

    // Set or remove area_id
    if (values.area_id) {
      params.set("area_id", values.area_id);
    } else {
      params.delete("area_id");
    }

    // Always set type parameter - default to "apartment" if not selected
    params.set("type", values.type || "apartment");

    // Handle rooms array
    params.delete("rooms[]");
    if (values.rooms && values.rooms.length > 0) {
      values.rooms.forEach(room => {
        params.append("rooms[]", room.toString());
      });
    }

    // Handle bath_rooms array
    params.delete("bath_rooms[]");
    if (values.bath_rooms && values.bath_rooms.length > 0) {
      values.bath_rooms.forEach(bathRoom => {
        params.append("bath_rooms[]", bathRoom.toString());
      });
    }

    // Handle price range
    if (values.min_price !== undefined && values.min_price !== minPrice) {
      params.set("min_price", values.min_price.toString());
    } else {
      params.delete("min_price");
    }

    if (values.max_price !== undefined && values.max_price !== maxPrice) {
      params.set("max_price", values.max_price.toString());
    } else {
      params.delete("max_price");
    }

    // Handle area range
    if (values.min_area !== undefined && values.min_area !== minArea) {
      params.set("min_area", values.min_area.toString());
    } else {
      params.delete("min_area");
    }

    if (values.max_area !== undefined && values.max_area !== maxArea) {
      params.set("max_area", values.max_area.toString());
    } else {
      params.delete("max_area");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      onClose?.();
    }, 1000);
  }

  // Watch city_id changes to filter areas
  const cityId = form.watch("city_id");

  // Effects
  useEffect(() => {
    // Reset area when city changes (but not on initial mount)
    if (cityId !== selectedCityId) {
      setSelectedCityId(cityId);
      // Only reset area if we're changing from one city to another (not from initial load)
      if (selectedCityId !== undefined) {
        form.setValue("area_id", "");
      }
    }
  }, [cityId, selectedCityId, form]);

  return (
    <form
      id="form-rhf-filter-locations"
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full"
    >
      <FieldGroup className="gap-2">
        {/* City Select */}
        <h3 className="text-h6-semibold text-black">{t("filter-form.location.title")}</h3>
        <Controller
          name="city_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending || allCities.length === 0}
              >
                <SelectTrigger id="city-select">
                  <SelectValue placeholder={t("filter-form.location.select-city")} />
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

        {/* Area Select - Only show when a city is selected */}
        {selectedCityId && (
          <Controller
            name="area_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending || availableAreas.length === 0}
                >
                  <SelectTrigger id="area-select">
                    <SelectValue placeholder={t("filter-form.location.select-area")} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAreas.map((area) => (
                      <SelectItem key={area.id} value={area.id.toString()}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <Separator orientation="horizontal" className="my-2" />

        {/* Property Type Toggle */}
        <h3 className="text-h6-semibold text-black">{t("filter-form.property-type.title")}</h3>
        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className="flex flex-wrap gap-2">
                {propertyTypes.map((propertyType) => (
                  <Toggle
                    key={propertyType.id}
                    pressed={field.value === propertyType.slug}
                    onPressedChange={(pressed) => {
                      field.onChange(pressed ? propertyType.slug : "");
                    }}
                    variant="outline"
                    className="group text-h6-regular text-text-gray-dark hover:bg-primary transition-all duration-300 bg-muted shadow-none border-none py-3 px-6 rounded-[36px] data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer flex items-center gap-2"
                  >
                    {propertyType.icon && (
                      <Image
                        src={noLinkImage(propertyType.icon)}
                        alt={propertyType.name}
                        width={32}
                        height={32}
                        className={`w-8 h-8 object-contain transition-all duration-300 ${field.value === propertyType.slug
                          ? "brightness-0 invert"
                          : "group-hover:brightness-0 group-hover:invert"
                          }`}
                      />
                    )}
                    {propertyType.name}
                  </Toggle>
                ))}
              </div>
            </Field>
          )}
        />

        <Separator orientation="horizontal" className="my-2" />

        {/* Bedrooms */}
        <h3 className="text-h6-semibold text-black">{t("filter-form.bedrooms.title")}</h3>
        <Controller
          name="rooms"
          control={form.control}
          render={({ field }) => (
            <Field>
              <ToggleGroup
                type="multiple"
                value={field.value?.map(String) || []}
                onValueChange={(values) => {
                  field.onChange(values.map(Number));
                }}
                variant="outline"
                spacing={2}
                className="flex flex-wrap gap-2"
                dir={isArabic ? "rtl" : "ltr"}
              >
                {bedrooms.map((bedroom) => (
                  <ToggleGroupItem
                    key={bedroom.value}
                    value={bedroom.value.toString()}
                    aria-label={t("filter-form.bedrooms.aria-label", { count: bedroom.label })}
                    className="text-h6-regular text-text-gray-dark hover:bg-primary transition-all duration-300 bg-muted shadow-none border-none py-3 px-6 rounded-[36px] data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
                  >
                    {bedroom.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          )}
        />

        <Separator orientation="horizontal" className="my-2" />

        {/* Bathrooms */}
        <h3 className="text-h6-semibold text-black">{t("filter-form.bathrooms.title")}</h3>
        <Controller
          name="bath_rooms"
          control={form.control}
          render={({ field }) => (
            <Field>
              <ToggleGroup
                type="multiple"
                value={field.value?.map(String) || []}
                onValueChange={(values) => {
                  field.onChange(values.map(Number));
                }}
                variant="outline"
                spacing={2}
                className="flex flex-wrap gap-2"
                dir={isArabic ? "rtl" : "ltr"}
              >
                {bathrooms.map((bathroom) => (
                  <ToggleGroupItem
                    key={bathroom.value}
                    value={bathroom.value.toString()}
                    aria-label={t("filter-form.bathrooms.aria-label", { count: bathroom.label })}
                    className="text-h6-regular text-text-gray-dark hover:bg-primary transition-all duration-300 bg-muted shadow-none border-none py-3 px-6 rounded-[36px] data-[state=on]:bg-primary data-[state=on]:text-white cursor-pointer"
                  >
                    {bathroom.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </Field>
          )}
        />

        <Separator orientation="horizontal" className="my-2" />

        {/* Property Size */}
        <h3 className="text-h6-semibold text-black">{t("filter-form.property-size.title")}</h3>
        <Controller
          name="min_area"
          control={form.control}
          render={({ field: minField }) => (
            <Controller
              name="max_area"
              control={form.control}
              render={({ field: maxField }) => (
                <Field>
                  <FieldTitle>{t("filter-form.property-size.area-range")}</FieldTitle>
                  <FieldDescription>
                    {t("filter-form.property-size.description", {
                      min: minField.value || minArea,
                      max: maxField.value || maxArea
                    })}
                  </FieldDescription>
                  <Slider
                    value={[minField.value || minArea, maxField.value || maxArea]}
                    onValueChange={([min, max]) => {
                      minField.onChange(min);
                      maxField.onChange(max);
                    }}
                    max={maxArea}
                    min={minArea}
                    step={1}
                    className="mt-2 w-full"
                    aria-label={t("filter-form.property-size.aria-label")}
                    disabled={false}
                    dir={isArabic ? "rtl" : "ltr"}
                  />
                </Field>
              )}
            />
          )}
        />

        <Separator orientation="horizontal" className="my-2" />

        {/* Property Price */}
        <h3 className="text-h6-semibold text-black">{t("filter-form.property-price.title")}</h3>
        <Controller
          name="min_price"
          control={form.control}
          render={({ field: minField }) => (
            <Controller
              name="max_price"
              control={form.control}
              render={({ field: maxField }) => (
                <Field>
                  <FieldTitle>{t("filter-form.property-price.price-range")}</FieldTitle>
                  <FieldDescription>
                    {t("filter-form.property-price.description", {
                      min: minField.value?.toLocaleString() || minPrice.toLocaleString(),
                      max: maxField.value?.toLocaleString() || maxPrice.toLocaleString()
                    })}
                  </FieldDescription>
                  <Slider
                    value={[minField.value || minPrice, maxField.value || maxPrice]}
                    onValueChange={([min, max]) => {
                      minField.onChange(min);
                      maxField.onChange(max);
                    }}
                    max={maxPrice}
                    min={minPrice}
                    step={1000}
                    className="mt-2 w-full"
                    aria-label={t("filter-form.property-price.aria-label")}
                    disabled={false}
                    dir={isArabic ? "rtl" : "ltr"}
                  />
                </Field>
              )}
            />
          )}
        />

      </FieldGroup>
    </form>
  );
}
