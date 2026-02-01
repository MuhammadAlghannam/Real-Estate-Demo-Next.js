"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus, X } from "lucide-react"
import { useFieldArray, type ArrayPath, type Control, type FieldArrayWithId, type FieldValues } from "react-hook-form"

interface RepeaterProps<T extends FieldValues> {
  control: Control<T>
  fieldName: ArrayPath<T>
  renderFields: (field: FieldArrayWithId<T, ArrayPath<T>>, index: number) => React.ReactNode
  label?: string
  min?: number
  itemClassName?: string
}

export function Repeater<T extends FieldValues>({
  control,
  fieldName,
  renderFields,
  label,
  min = 1,
  itemClassName,
}: RepeaterProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  })

  const canRemove = fields.length > min
  const hasLabel = Boolean(label)

  return (
    <div className="space-y-4">
      {hasLabel && <label className="text-sm font-medium">{label}</label>}

      {/* Items Container */}
      <div className="space-y-3">
        {fields.map((field, index) => {
          const isLastItem = index === fields.length - 1

          return (
            <div
              key={field.id}
              className={cn(
                "flex items-end gap-3 rounded-lg border border-input bg-background p-4 transition-colors hover:border-input/80",
                itemClassName,
              )}
            >
              {/* Item Content */}
              <div className="flex-1">{renderFields(field, index)}</div>

              {hasLabel ? (
                canRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove"
                  >
                    <X className="size-4" />
                  </Button>
                )
              ) : (
                <>
                  {!isLastItem && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Remove"
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                  {isLastItem && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => append({} as FieldArrayWithId<T, ArrayPath<T>>)}
                      className="h-9 w-9 text-primary hover:bg-primary/10 hover:text-primary"
                      aria-label="Add"
                    >
                      <Plus className="size-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Add button below items - only shown when label is present */}
      {hasLabel && (
        <Button type="button" variant="outline" onClick={() => append({} as FieldArrayWithId<T, ArrayPath<T>>)} className="w-full gap-2 bg-transparent">
          <Plus className="size-4" />
          Add {label}
        </Button>
      )}
    </div>
  )
}
