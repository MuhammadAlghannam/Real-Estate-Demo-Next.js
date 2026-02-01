"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import MainAvatar from "@/components/shared/MainAvatar";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFields, getProfileSchema } from "@/lib/schemas/profile.schema";
import { noLinkImage, toFormData } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useUpdateProfile from "../_hooks/use-update-profile";

interface ProfileFormProps {
  initialUser?: ApiUser;
}

export default function ProfileForm({ initialUser }: ProfileFormProps) {
  // Translation
  const t = useTranslations("ProfilePage.profile-form");

  // Hooks
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Mutation
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // Form
  const form = useForm<ProfileFields>({
    resolver: zodResolver(getProfileSchema(t)),
    defaultValues: {
      name: initialUser?.name || "",
      email: initialUser?.email || "",
      phone: initialUser?.phone || "",
      address: initialUser?.address || "",
      about_me: initialUser?.about_me || "",
      designation: initialUser?.designation || "",
      image: undefined as unknown as File,
    },
    mode: "onBlur",
  });

  // Functions
  const handleSubmit = (values: ProfileFields) => {
    const formDataObject: Record<string, unknown> = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      about_me: values.about_me,
      designation: values.designation,
    };

    // Only include image if it exists and is a valid File
    if (values.image && values.image instanceof File) {
      formDataObject.image = values.image;
    }

    const formData = toFormData(formDataObject);

    updateProfile(formData, {
      onSuccess: () => {
        // Clear the image preview after successful upload
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
          setImagePreview(null);
        }
        // Reset the form's image field
        form.setValue("image", undefined as unknown as File);
      }
    });
  };

  const handleImageChange = (file: File) => {
    form.setValue("image", file);
    form.trigger("image");

    // Clean up previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };



  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full space-y-6"
    >
      <FieldGroup className="gap-6">
        {/* Profile Image Section */}
        <div className="flex items-center gap-4 p-4">
          <MainAvatar
            src={imagePreview || noLinkImage(initialUser?.image ?? null)}
            className="size-[68px]"
          />

          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageChange(file);
                }
              }}
            />

            <CustomeBtn
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full !py-5 !px-6"
              disabled={isPending}
            >
              <Plus className="mr-2 h-4 w-4" />
              {isPending ? t("uploading") : t("upload-picture")}
            </CustomeBtn>
          </div>
        </div>

        {/* Name */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="profile-name" className="text-h6-semibold text-black">
                {t("name.label")}
              </Label>
              <Input
                id="profile-name"
                type="text"
                placeholder={t("name.placeholder")}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="profile-email" className="text-h6-semibold text-black">
                {t("email.label")}
              </Label>
              <Input
                id="profile-email"
                type="email"
                placeholder={t("email.placeholder")}
                aria-invalid={fieldState.invalid}
                disabled
                className="bg-gray-100 cursor-not-allowed"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="profile-phone" className="text-h6-semibold text-black">
                {t("phone.label")}
              </Label>
              <Input
                id="profile-phone"
                type="number"
                placeholder={t("phone.placeholder")}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Address */}
        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="profile-address" className="text-h6-semibold text-black">
                {t("address.label")}
              </Label>
              <Textarea
                id="profile-address"
                placeholder={t("address.placeholder")}
                rows={3}
                className="resize-none"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Designation */}
        <Controller
          name="designation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="profile-designation" className="text-h6-semibold text-black">
                {t("designation.label")}
              </Label>
              <Input
                id="profile-designation"
                type="text"
                placeholder={t("designation.placeholder")}
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* About Me */}
        <Controller
          name="about_me"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Label htmlFor="profile-about-me" className="text-h6-semibold text-black">
                {t("about-me.label")}
              </Label>
              <Textarea
                id="profile-about-me"
                placeholder={t("about-me.placeholder")}
                rows={4}
                className="resize-none"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Profile Image Error Display */}
        {form.formState.errors.image && (
          <div className="text-red-500 text-sm">
            {form.formState.errors.image.message}
          </div>
        )}

        <div className="pt-3">
          <CustomeBtn
            type="submit"
            className="w-full"
            disabled={
              isPending ||
              (form.formState.isSubmitted && !form.formState.isValid)
            }
          >
            {isPending ? <LoadingSpinner /> : t("update-profile")}
          </CustomeBtn>
        </div>
      </FieldGroup>
    </form>
  );
}
