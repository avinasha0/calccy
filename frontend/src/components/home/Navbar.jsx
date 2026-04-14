import { useState } from 'react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '/', isHash: false },
  { label: 'Tools', href: '/tools', isHash: false },
  { label: 'Blog', href: '/blog', isHash: false },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const logoSrc = `${import.meta.env.BASE_URL}calccy1.png`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 transition hover:text-blue-700">
          <img src={logoSrc} alt="Calccy logo" className="h-8 w-auto rounded-md object-contain" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            item.isHash ? (
              <a
                key={item.label}
                href={item.href}
                className="group relative text-sm font-medium text-slate-600 transition hover:text-blue-700"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="group relative text-sm font-medium text-slate-600 transition hover:text-blue-700"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/tools/salary-calculator"
            className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg sm:inline-flex"
          >
            Open Calculator
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex rounded-lg border border-slate-300 p-2 text-slate-700 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="text-xs font-semibold">{isOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              item.isHash ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link
              to="/tools/salary-calculator"
              className="mt-2 rounded-xl bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Open Calculator
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
