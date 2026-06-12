// Labelled text input used in forms.
export default function InputField({ label, id, password = false, className = '', ...props }) {
	return (
		<div className={`flex flex-col gap-2 ${className}`}>
			{label && (
				<label htmlFor={id} className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{label}</label>
			)}
			<input id={id} type={password ? 'password' : 'text'} className='rounded-[10px] border-[0.5px] border-(--color-border-secondary) bg-(--color-surface-white) px-5 py-4 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-primary) outline-none transition-colors focus:border-(--color-border-primary) disabled:bg-(--color-surface-background) disabled:text-(--color-text-secondary)' {...props} />
		</div>
	)
}
