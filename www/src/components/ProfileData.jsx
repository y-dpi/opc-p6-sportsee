// Profile stats card (blue).
export default function ProfileData({ label, value, unit, className = '' }) {
	return (
		<div className={`flex flex-col gap-3 rounded-[10px] bg-(--color-surface-blue) px-8 pt-5 pb-4 ${className}`}>
			<p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-surface-white)'>{label}</p>
			<p className='flex items-baseline gap-1'>
				<span className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-surface-white)'>{value}</span>
				{unit && (
					<span className='text-[calc(var(--font-body-large-size)*1px)] font-(--font-body-large-weight) text-(--color-surface-light-blue)'>{unit}</span>
				)}
			</p>
		</div>
	)
}
