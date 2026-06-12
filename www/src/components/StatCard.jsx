// Dashboard stats card (white).
export default function StatCard({ label, value, unit, valueClassName = 'text-(--color-text-blue)', className = '' }) {
	return (
		<div className={`flex flex-col gap-4 rounded-xl bg-(--color-surface-white) px-8 pt-5 pb-4 ${className}`}>
			<p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{label}</p>
			<p className='flex items-baseline gap-1'>
				<span className={`text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) ${valueClassName}`}>{value}</span>
				{unit && (
					<span className={`text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) opacity-50 ${valueClassName}`}>{unit}</span>
				)}
			</p>
		</div>
	)
}
