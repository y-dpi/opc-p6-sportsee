// Rounded profile photo card.
export default function ProfilePicture({ src, alt = '', className = '' }) {
	return (
		<div className={`group h-29.25 w-26 shrink-0 overflow-hidden rounded-[10px] ${className}`}>
			<img className='h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-180' src={src} alt={alt} />
		</div>
	)
}
