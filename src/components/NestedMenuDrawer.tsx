import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import type { MenuDrawerProps, MenuIconName } from '../types/menu'
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

const panelVariants: Variants = {
	hidden: { y: 60, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { type: 'spring', damping: 22, stiffness: 200 },
	},
	exit: {
		y: 60,
		opacity: 0,
		transition: { duration: 0.2, ease: 'easeInOut' },
	},
}

export function NestedMenuDrawer({ isOpen, onClose, items, className }: MenuDrawerProps) {
	const firstItemRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		if (!isOpen) return

		const handleKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault()
				onClose()
			}
		}

		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [isOpen, onClose])

	useEffect(() => {
		if (isOpen && firstItemRef.current) {
			firstItemRef.current.focus()
		}
	}, [isOpen])

	return (
		<AnimatePresence>
			{isOpen ? (
				<div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-10 pb-6">
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

					<motion.section
						role="dialog"
						aria-modal="true"
						aria-label="Primary navigation"
						className={`relative w-full max-w-sm rounded-3xl bg-white p-4 ${className ?? ''}`}
						variants={panelVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div className="rounded-3xl p-2 max-h-[85vh] overflow-y-auto">
							<ul className="space-y-1" role="list">
								{items.map((item, index) => {
									const Icon = iconComponents[item.icon ?? 'default']
									return (
										<li key={item.id}>
											<button
												ref={index === 0 ? firstItemRef : undefined}
												type="button"
												onClick={() => item.children ?? item.href ? null : onClose()}
												className="flex w-full items-center gap-3 rounded-2xl border border-transparent bg-white px-4 py-3 text-left shadow-sm transition hover:border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
											>
												<span className="flex h-10 w-10 items-center justify-center rounded-2xl  text-slate-600">
													<Icon className="h-5 w-5" strokeWidth={1.6} />
												</span>
												<span className="flex-1">
													<p className="text-sm font-semibold text-slate-900">{item.title}</p>
													{item.description ? (
														<p className="text-xs text-slate-500">{item.description}</p>
													) : null}
												</span>
												<span className="text-base text-slate-400">›</span>
											</button>
										</li>
									)
								})}
							</ul>
						</div>
					</motion.section>
				</div>
			) : null}
		</AnimatePresence>
	)
}

export default NestedMenuDrawer
