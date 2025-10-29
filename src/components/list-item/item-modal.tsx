import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { itemSchema, type ItemFormValues } from "../../lib/validation"
import type { ListItem } from "../../types/item"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"

type ItemModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ItemFormValues) => void
  editItem?: ListItem | null
}

const ItemModal = ({
  open,
  onOpenChange,
  onSubmit,
  editItem
}: ItemModalProps) => {
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      subtitle: ""
    }
  })
  const {
    reset,
    formState: { isSubmitting }
  } = form

  // Fill with data from the selected item.
  useEffect(() => {
    reset(editItem ? editItem : { title: "", subtitle: "" })
  }, [editItem, reset, open])

  const handleFormSubmit = (data: ItemFormValues) => {
    onSubmit(data)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {editItem ? "Edit Item" : "Create New Item"}
          </DialogTitle>
          <DialogDescription>
            {editItem
              ? "Update the details of your item below."
              : "Add a new item to your list. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${editItem?.subtitle ? "Edit item title" : "Enter item title"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${editItem?.subtitle ? "Edit item subtitle" : "Enter item subtitle"}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {editItem ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ItemModal
