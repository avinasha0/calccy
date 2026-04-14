function Button({ children, ...props }) {
  return (
    <button
      className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
