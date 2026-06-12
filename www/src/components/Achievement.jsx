// Dependencies.
import achievementIcon from '../assets/achievement-icon.svg';

// Achievement badge card.
export default function Achievement({ value, icon, className = '' }) {
	return (
		<div className={`flex items-center gap-5 rounded-[10px] border border-(--color-surface-blue) bg-(--color-surface-blue) px-7 py-7 ${className}`}>
			<span className='shrink-0 text-(--color-surface-white)'>
				{icon ?? (
					<img className='size-9' src={achievementIcon} alt='' />
				)}
			</span>
			<p className='whitespace-nowrap text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-surface-white)'>{value}</p>
		</div>
	)
}
