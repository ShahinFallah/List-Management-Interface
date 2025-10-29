import ListView from "./components/list-item/list-view"
import { Toaster } from "./components/ui/sonner"

const App = () => {
  return (
    <div className="min-h-screen bg-background">
      <ListView />
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App
