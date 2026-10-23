function Button({ children, variant = 'primary', className = '', ...props }) {
  const styles = {
    primary:
      'rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700',
    secondary:
      'rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50',
  };

  return (
    <button className={`${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
