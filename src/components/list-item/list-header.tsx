import { ListChecks, Plus } from "lucide-react"
import { Button } from "../ui/button"

type ListHeaderProps = {
  handleCreate: () => void
}

const ListHeader = ({ handleCreate }: ListHeaderProps) => {
  return (
    <header className="mb-10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex size-12 items-center justify-center rounded-lg bg-primary/10">
          <ListChecks className="size-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            List Manager
          </h1>
          <p className="text-sm text-muted-foreground">
            Organize and manage your items efficiently
          </p>
        </div>
      </div>
      <Button onClick={handleCreate} size="lg" className="gap-2">
        <Plus className="size-5" />
        <span className="hidden sm:inline-block">Create Item</span>
        <span className="sm:hidden">Create</span>
      </Button>
    </header>
  )
}

export default ListHeader
