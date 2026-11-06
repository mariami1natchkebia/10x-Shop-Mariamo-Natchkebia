import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
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
  const buttonRef = useRef<HTMLButtonElement>(null)

  const options = [
    { slug: '', name: 'All categories' },
    ...categories,
  ]

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.slug === value)
  )

  const selected = options[selectedIndex]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        rootRef.current &&
        !rootRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (open) {
      document
        .getElementById(`cat-opt-${activeIndex}`)
        ?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, activeIndex])

  function toggle() {
    if (!open) {
      setActiveIndex(selectedIndex)
    }

    setOpen((prev) => !prev)
  }

  function choose(slug: string) {
    onChange(slug)
    setOpen(false)
    buttonRef.current?.focus()
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      setOpen(false)
      buttonRef.current?.focus()
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()

      if (!open) {
        setActiveIndex(selectedIndex)
        setOpen(true)
      } else {
        setActiveIndex((prev) =>
          Math.min(prev + 1, options.length - 1)
        )
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()

      if (!open) {
        setActiveIndex(selectedIndex)
        setOpen(true)
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }

    if (e.key === 'Home' && open) {
      e.preventDefault()
      setActiveIndex(0)
    }

    if (e.key === 'End' && open) {
      e.preventDefault()
      setActiveIndex(options.length - 1)
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()

      if (!open) {
        toggle()
      } else if (options[activeIndex]) {
        choose(options[activeIndex].slug)
      }
    }
  }

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        id="categoryFilter"
        name="categoryFilter"
        type="button"
        aria-label="Select product category"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? 'category-options' : undefined}
        aria-activedescendant={
          open ? `cat-opt-${activeIndex}` : undefined
        }
        onClick={toggle}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-primary outline-none transition focus-visible:ring-2 focus-visible:ring-brand"
      >
        <span className="truncate">
          {selected?.name ?? 'All categories'}
        </span>

        <svg
          className={`ml-2 h-4 w-4 shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
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
          id="category-options"
          role="listbox"
          aria-label="Product categories"
          className="absolute left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-border bg-surface p-1.5 shadow-lg shadow-black/5 dark:shadow-black/20 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]"
        >
          {options.map((option, index) => {
            const isSelected = option.slug === value
            const isActive = index === activeIndex

            return (
              <li
                key={option.slug || 'all'}
                id={`cat-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option.slug)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? 'bg-brand text-text-primary font-semibold'
                    : isActive
                      ? 'bg-surface-secondary text-text-primary'
                      : 'text-text-primary hover:bg-surface-secondary'
                }`}
              >
                {option.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default CategorySelect