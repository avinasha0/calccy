function SectionWrapper({ title, subtitle, children, className = '' }) {
  return (
    <section className={`py-10 sm:py-14 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <header className="mb-6 sm:mb-8">
            {title ? <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2> : null}
            {subtitle ? <p className="mt-2 text-sm text-slate-600 sm:text-base">{subtitle}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
