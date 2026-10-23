function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
