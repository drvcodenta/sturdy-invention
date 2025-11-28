import { useState } from 'react'
import { NestedMenuDrawer } from './components/NestedMenuDrawer'
import { primaryMenu } from './data/menuData'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f7f8fb] flex items-center justify-center px-6">
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="rounded-full border border-blue-500/60 bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(30,96,255,0.25)]"
        aria-label="Open navigation menu"
      >
        Open Menu
      </button>

      <NestedMenuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={primaryMenu}
      />
    </div>
  )
}

export default App
