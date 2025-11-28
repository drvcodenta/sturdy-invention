export type MenuIconName =
  | 'home'
  | 'products'
  | 'industry'
  | 'company'
  | 'resources'
  | 'support'
  | 'research'
  | 'sustainability'
  | 'investor'
  | 'contact'
  | 'default'

export interface MenuItem {
  id: string
  title: string
  description?: string
  icon?: MenuIconName
  children?: MenuItem[]
  href?: string
}

export interface MenuDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: MenuItem[]
  className?: string
}

export interface NavigationSnapshot {
  title: string
  items: MenuItem[]
}
