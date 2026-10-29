import { useEffect, useRef, useState } from 'react'
import type { Category } from '../../types/product'

type Props = {
  value: string
  onChange: (slug: string) => void
  categories: Category[]
}

function CategorySelect({ value, onChange, categories }: Props) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const options = [{ slug: '', name: 'All categories' }, ...categories]
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.slug === value),
  )
  const selected = options[selectedIndex]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open) {
      document.getElementById(`cat-opt-${activeIndex}`)?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIndex])

  function toggle() {
    if (!open) setActiveIndex(selectedIndex)
    setOpen((o) => !o)
  }

  function choose(slug: string) {
    onChange(slug)
    setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) toggle()
      else setActiveIndex((i) => Math.min(i + 1, options.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) toggle()
      else setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) toggle()
      else choose(options[activeIndex].slug)
    }
  }

  return (
    <div ref={rootRef} className="relative w-full" onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-[oklch(0.45_0.16_153.68)] bg-emerald-50 px-4 py-2.5 text-sm font-medium text-[oklch(0.54_0.1_176.85)] outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500/40 dark:bg-[#243629]"
      >
        <span className="truncate">{selected.name}</span>
        <svg
          className={`ml-2 h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-lg border-[1.5px] border-[oklch(0.45_0.16_153.68)] bg-emerald-50 p-1.5 shadow-lg shadow-emerald-900/10 dark:bg-[#243629]
            [scrollbar-width:thin] [scrollbar-color:oklch(0.45_0.16_153.68)_transparent]"
        >
          {options.map((opt, i) => {
            const isSelected = opt.slug === value
            const isActive = i === activeIndex
            return (
              <li
                key={opt.slug || 'all'}
                id={`cat-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(opt.slug)}
                className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? 'bg-emerald-200 font-semibold text-emerald-900 dark:bg-emerald-800 dark:text-emerald-50'
                    : isActive
                      ? 'bg-emerald-100 text-emerald-900 dark:bg-[#2f4a36] dark:text-gray-100'
                      : 'text-gray-800 dark:text-gray-200'
                }`}
              >
                {opt.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CategorySelect