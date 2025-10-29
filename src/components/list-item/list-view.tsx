import { useCallback, useState } from "react"
import { Plus, ListChecks } from "lucide-react"
import { toast } from "sonner"
import { useListStore } from "../../store/list-store"
import ListItemCard from "./list-item-card"
import ItemModal from "./item-modal"
import { Button } from "../ui/button"
import type { ListItem } from "../../types/item"
import type { ItemFormValues } from "../../lib/validation"
import ListHeader from "./list-header"

const ListView = () => {
  const { items, addItem, updateItem, deleteItem } = useListStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ListItem | null>(null)

  const handleCreate = () => {
    setEditingItem(null)
    setModalOpen(true)
  }

  const handleEdit = (item: ListItem) => {
    setEditingItem(item)
    setModalOpen(true)
  }

  const handleDelete = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id === id)
      deleteItem(id)
      toast.success("Item deleted", {
        description: `"${item?.title}" has been removed from your list.`
      })
    },
    [items, deleteItem]
  )

  const handleSubmit = useCallback(
    (data: ItemFormValues) => {
      if (editingItem) {
        updateItem(editingItem.id, data.title, data.subtitle)
        toast.success("Item updated", {
          description: "Your changes have been saved successfully."
        })
      } else {
        addItem(data.title, data.subtitle)
        toast.success("Item created", {
          description: "New item has been added to your list."
        })
      }
      setModalOpen(false)
      setEditingItem(null)
    },
    [addItem, updateItem, editingItem]
  )

  return (
    <>
      <div className="mx-auto container px-4 py-12 sm:px-6 lg:px-8">
        <ListHeader handleCreate={handleCreate} />
        <main>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-16">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <ListChecks className="size-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No items yet</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Get started by creating your first item.
              </p>
              <Button onClick={handleCreate} className="gap-2">
                <Plus className="size-4" />
                Create Your First Item
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <ListItemCard
                  key={item.id}
                  item={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <ItemModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
        editItem={editingItem}
      />
    </>
  )
}

export default ListView
