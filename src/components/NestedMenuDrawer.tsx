import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useDragControls,
  type PanInfo,
  type Variants,
} from 'framer-motion'
import type { MenuDrawerProps, MenuIconName, NavigationSnapshot } from '../types/menu'
import {
  Home,
  Layers,
  Building2,
  Factory,
  BookOpen,
  LifeBuoy,
  FlaskConical,
  Leaf,
  Wallet,
  MessageCircleMore,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'

const iconComponents: Record<MenuIconName, LucideIcon> = {
  home: Home,
  products: Layers,
  industry: Factory,
  company: Building2,
  resources: BookOpen,
  support: LifeBuoy,
  research: FlaskConical,
  sustainability: Leaf,
  investor: Wallet,
  contact: MessageCircleMore,
  default: Layers,
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const sheetVariants: Variants = {
  hidden: { y: 90, opacity: 0, scale: 1 },
  root: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 24, stiffness: 320 },
  },
  nested: {
    y: -12,
    scale: 0.94,
    opacity: 1,
    transition: { duration: 0.18, ease: 'easeOut' },
  },
  exit: {
    y: 90,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
}

const listVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0, transition: { duration: 0.2 } }),
}

export function NestedMenuDrawer({ isOpen, onClose, items, className }: MenuDrawerProps) {
  const itemsKey = useMemo(() => items.map((entry) => entry.id).join('|'), [items])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-8 pb-6">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/45"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <DrawerSurface
            key={itemsKey}
            items={items}
            onClose={onClose}
            className={className}
          />
        </div>
      )}
    </AnimatePresence>
  )
}

function DrawerSurface({ items, onClose, className }: Omit<MenuDrawerProps, 'isOpen'>) {
  const [stack, setStack] = useState<NavigationSnapshot[]>([{ title: 'Menu', items }])
  const [direction, setDirection] = useState(1)
  const firstItemRef = useRef<HTMLButtonElement | null>(null)
  const dragControls = useDragControls()

  const current = useMemo(() => stack[stack.length - 1], [stack])
  const canGoBack = stack.length > 1

  useEffect(() => {
    if (firstItemRef.current) {
      firstItemRef.current.focus()
    }
  }, [current])

  const handleBack = useCallback(() => {
    setDirection(-1)
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }, [])

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key === 'ArrowLeft' && canGoBack) {
        event.preventDefault()
        handleBack()
      }
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [canGoBack, handleBack, onClose])

  const openChildMenu = useCallback((title: string, children: NavigationSnapshot['items']) => {
    if (!children?.length) return
    setDirection(1)
    setStack((prev) => [...prev, { title, items: children }])
  }, [])

  const handleItemSelect = (itemId: string) => {
    const target = current.items.find((entry) => entry.id === itemId)
    if (!target) return

    if (target.children?.length) {
      openChildMenu(target.title, target.children)
      return
    }

    if (target.href) {
      window.open(target.href, '_self')
    }
    onClose()
  }

  const handleDragStart = (event: React.PointerEvent) => {
    dragControls.start(event)
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.y > 120 || info.velocity.y > 800) {
      onClose()
    }
  }

  return (
    <motion.section
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      className={`relative w-full max-w-sm overflow-hidden rounded-[32px] bg-white p-4 shadow-[0_24px_50px_rgba(15,23,42,0.25)] ${className ?? ''}`}
      variants={sheetVariants}
      initial="hidden"
      animate={canGoBack ? 'nested' : 'root'}
      exit="exit"
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 180 }}
      dragElastic={{ top: 0, bottom: 0.3 }}
      onDragEnd={handleDragEnd}
      style={{ touchAction: 'none' }}
    >
      {canGoBack && (
        <div className="flex items-center justify-between px-1 pb-3">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <div className="h-8 w-14" aria-hidden="true" />
        </div>
      )}

      <div
        className="absolute left-28 right-4 top-0 h-12 cursor-grab"
        onPointerDown={handleDragStart}
        aria-hidden
      />

      <div className={`rounded-3xl p-2 max-h-[85vh] overflow-y-auto ${canGoBack ? '' : 'mt-2'}`}>
       <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.ul
            key={current.title}
            variants={listVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className="space-y-1"
          >
            {current.items.map((item, index) => {
              const Icon = iconComponents[item.icon ?? 'default']
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    ref={index === 0 ? firstItemRef : undefined}
                    onClick={() => handleItemSelect(item.id)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-transparent bg-white px-4 py-3 text-left shadow-sm transition hover:border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="flex-1">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    </span>
                    {item.children && <ChevronRight className="h-5 w-5 text-slate-400" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default NestedMenuDrawer
