import { format } from "date-fns"
import { Pencil, Trash2, Calendar } from "lucide-react"
import { Button } from "../ui/button"
import type { ListItem } from "../../types/item"

type ListItemCardProps = {
  item: ListItem
  onEdit: (item: ListItem) => void
  onDelete: (id: string) => void
}

const ListItemCard = ({ item, onEdit, onDelete }: ListItemCardProps) => {
  return (
    <div className="group relative rounded-lg border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          <time dateTime={item.createdAt.toISOString()}>
            {format(item.createdAt, "MMM dd, yyyy • h:mm a")}
          </time>
        </div>
        <h3 className="text-lg font-semibold leading-tight text-foreground wrap-break-word">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground wrap-break-word">
          {item.subtitle}
        </p>
      </div>
      <div className="flex gap-2 opacity-50 transition-opacity group-hover:opacity-100">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onEdit(item)}
          className="size-8 hover:bg-primary/10 hover:text-primary cursor-pointer"
        >
          <Pencil className="size-4" />
          <span className="sr-only">Edit item</span>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onDelete(item.id)}
          className="size-8 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
        >
          <Trash2 className="size-4" />
          <span className="sr-only">Delete item</span>
        </Button>
      </div>
    </div>
  )
}

export default ListItemCard
