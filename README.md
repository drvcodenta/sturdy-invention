# Framer Motion Implementation Documentation

## Overview

This project implements a **nested navigation drawer** with smooth, polished animations using **Framer Motion** - a production-ready motion library for React. The drawer features multiple layers of navigation with contextual animations and gesture-based interactions.

## What is Framer Motion?

Framer Motion is a powerful animation library for React that provides:
- Declarative animation API
- Gesture recognition (drag, tap, hover)
- Layout animations
- SVG path animations
- Server-side rendering support
- Spring physics and natural motion

## Animations & Interactions Implemented

### 1. **Overlay Fade Animation**
- **Location**: Background overlay behind the drawer
- **Effect**: Smooth fade-in/fade-out of the semi-transparent black backdrop
- **Implementation**: 
  - Uses `overlayVariants` with opacity transitions (0 → 1)
  - Triggered when drawer opens/closes
  - Creates focus on the menu by dimming background

### 2. **Drawer Entry/Exit Animation**
- **Location**: Main drawer surface
- **Effect**: Drawer slides up from bottom with scale and opacity changes
- **Implementation**:
  - `hidden`: Starts at `y: 90`, `opacity: 0`, `scale: 1`
  - `root`: Animates to `y: 0`, `scale: 1`, `opacity: 1` with spring physics
  - `exit`: Returns to `y: 90`, `opacity: 0`
  - Uses **spring animation** with `damping: 24` and `stiffness: 320` for natural, bouncy feel

### 3. **Nested State Scale Animation**
- **Location**: Main drawer surface when navigating to submenus
- **Effect**: Drawer subtly scales down and moves up to indicate depth
- **Implementation**:
  - Transitions from `root` state to `nested` state
  - `nested`: `y: -12`, `scale: 0.94`, `opacity: 1`
  - Creates visual hierarchy showing you're in a submenu
  - Uses easeOut timing (duration: 0.18s)

### 4. **List Content Slide Animation**
- **Location**: Menu items list
- **Effect**: Horizontal slide animation when transitioning between menu levels
- **Implementation**:
  - Uses `listVariants` with directional sliding
  - **Forward navigation**: Slides from right (`x: 40`) to center (`x: 0`)
  - **Backward navigation**: Slides from left (`x: -40`) to center
  - Includes opacity fade (0 → 1) during transitions
  - Custom direction prop determines slide direction
  - Duration: 0.25s (enter), 0.2s (exit)

### 5. **Drag-to-Dismiss Gesture**
- **Location**: Entire drawer surface
- **Effect**: Users can drag drawer down to close it
- **Implementation**:
  - Uses `useDragControls()` hook for programmatic drag control
  - Custom drag handle in the top area of the drawer
  - `dragConstraints`: Limits drag to vertical axis (`top: 0`, `bottom: 180`)
  - `dragElastic`: No bounce on top (0), slight stretch on bottom (0.3)
  - **Dismiss threshold**: Closes if dragged >120px down OR velocity >800px/s
  - `touchAction: 'none'` prevents default touch behaviors

### 6. **AnimatePresence for Mount/Unmount**
- **Location**: Wrapping both the entire drawer and the list content
- **Effect**: Enables exit animations when components unmount
- **Implementation**:
  - Outer `AnimatePresence`: Controls drawer/overlay mount/unmount
  - Inner `AnimatePresence` with `mode="wait"`: Ensures one list animates out before next animates in
  - `initial={false}`: Prevents animation on first render of list changes
  - Enables smooth transitions when closing drawer or changing menu levels

## Animation Configuration Details

### Spring Physics (Drawer Entry)
```typescript
transition: { 
  type: 'spring', 
  damping: 24,      // Controls oscillation (higher = less bounce)
  stiffness: 320    // Controls speed (higher = snappier)
}
```

### Easing Functions
- **easeOut**: Used for nested state and list entry (decelerating motion)
- **easeInOut**: Used for exit animations (smooth both ways)

## Gesture Interactions

1. **Touch/Mouse Drag**: Vertical dragging to dismiss drawer
2. **Overlay Click**: Click backdrop to close drawer
3. **Keyboard Navigation**: 
   - `Escape` key: Close drawer
   - `ArrowLeft` key: Navigate back in menu hierarchy

## Performance Optimizations

- Uses `useMemo` to prevent unnecessary re-renders of item keys
- `AnimatePresence mode="wait"` prevents multiple animations simultaneously
- Drag listener disabled by default (`dragListener={false}`), only activated on drag handle
- First item focus management with `useRef` for accessibility

## User Experience Features

1. **Visual Depth Perception**: Scale and position changes indicate menu depth
2. **Natural Motion**: Spring physics create realistic, satisfying animations
3. **Directional Awareness**: Slide direction indicates forward/backward navigation
4. **Gesture-Friendly**: Intuitive drag-to-dismiss gesture
5. **Smooth Transitions**: All state changes are animated for cohesive experience

## Technical Stack

- **Framer Motion**: v12.23.24
- **React**: v19.2.0
- **TypeScript**: For type-safe animation variants
- **Tailwind CSS**: For styling
- **Lucide React**: For icons

## Key Framer Motion Features Used

- `motion` components (`motion.button`, `motion.section`, `motion.ul`)
- `AnimatePresence` for exit animations
- `variants` for declarative animation states
- `useDragControls` for gesture handling
- Custom props: `drag`, `dragConstraints`, `dragElastic`, `onDragEnd`
- Animation props: `initial`, `animate`, `exit`, `custom`
- Transition customization: `type`, `damping`, `stiffness`, `duration`, `ease`
