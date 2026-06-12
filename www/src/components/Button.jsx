// Stylised button (regular + variant).
export default function Button({ variant = 'action', children, className = '', ...props }) {
	if (variant === 'navl' || variant === 'navr') {
		return (
			<button type='button' className={`group flex size-6 items-center justify-center rounded-[40%] border border-(--color-border-secondary) bg-(--color-surface-white) transition-colors hover:border-(--color-border-primary) hover:bg-(--color-surface-action-hover) disabled:pointer-events-none disabled:opacity-40 ${className}`} {...props} >
				<svg className={((variant === 'navl') ? 'rotate-180 ' : '') + 'size-2.5 text-(--color-text-primary) transition-colors group-hover:text-(--color-surface-white)'} viewBox='0 0 8 12' fill='none' aria-hidden='true'>
					<path d='M1.5 1L6.5 6L1.5 11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
			</button>
		)
	}

	return (
		<button className={`rounded-[10px] bg-(--color-surface-action) px-10 py-4 text-[calc(var(--font-body-large-size)*1px)] font-(--font-body-large-weight) text-(--color-text-tertiary) transition-colors hover:bg-(--color-surface-action-hover) disabled:cursor-not-allowed disabled:bg-(--color-surface-background) disabled:text-(--color-text-secondary) ${className}`} {...props} >
			{children}
		</button>
	)
}
