"use client";

import CustomeBtn from "@/components/shared/CustomeBtn";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useVerifyAgent from "@/hooks/use-verify-agent";
import {
  VerifyAgentFields,
  getVerifyAgentSchema,
} from "@/lib/schemas/verify-agent.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import InvalidAgentDisplay from "./InvalidAgentDisplay";
import ValidAgentDisplay from "./ValidAgentDisplay";

export default function VerifyAgentForm() {
  // Translation
  const t = useTranslations("VerifyAgent.form");

  // Mutation
  const { isPending, verifyAgent, data } = useVerifyAgent();

  // Form
  const form = useForm<VerifyAgentFields>({
    resolver: zodResolver(getVerifyAgentSchema(t)),
    defaultValues: {
      phone: "",
    },
    mode: "onBlur",
  });

  function onSubmit(values: VerifyAgentFields) {
    // Remove all spaces and formatting from phone number

    verifyAgent({ phone: values.phone }, {
      onError: (err) => {
        // Surface server error under the phone field
        form.setError("phone", { type: "server", message: err.message });
      },
    });
  }

  // Get the first agent if exists
  const agent = data?.exists && data.data.length > 0 ? data.data[0] : null;

  return (
    <div className="w-full">
      <form
        id="form-verify-agent"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        <FieldGroup className="gap-4">
          {/* Phone Input */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Label htmlFor="verify-phone" className="text-h6-semibold text-black">
                  {t("labels.phone-number")}
                </Label>
                <Input
                  id="verify-phone"
                  type="text"
                  placeholder={t("placeholders.phone-number")}
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* No Agent Found Message */}
          {data && !data.exists && <InvalidAgentDisplay />}

          {/* Agent Information Display */}
          {agent && <ValidAgentDisplay agent={agent} />}

          <CustomeBtn
            type="submit"
            className="w-full"
            disabled={
              isPending ||
              (form.formState.isSubmitted && !form.formState.isValid)
            }
          >
            {isPending ? <LoadingSpinner /> : t("verify-agent")}
          </CustomeBtn>
        </FieldGroup>
      </form>
    </div>
  );
}
