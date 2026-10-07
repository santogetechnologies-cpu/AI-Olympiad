import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500 flex-wrap">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />}
          {item.href && i < items.length - 1 ? (
            <Link to={item.href} className="hover:text-blue-600 transition-colors truncate max-w-[140px]">
              {item.label}
            </Link>
          ) : (
            <span className={`truncate max-w-[200px] ${i === items.length - 1 ? 'text-slate-800 font-medium' : ''}`}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}
