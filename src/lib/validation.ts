import { z } from "zod"

export const itemSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(200, "Subtitle must be less than 200 characters")
})

export type ItemFormValues = z.infer<typeof itemSchema>
