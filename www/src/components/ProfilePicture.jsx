// Rounded profile photo card.
export default function ProfilePicture({ src, alt = '', fallback = '', className = '' }) {
	
  // Use fallback image on error.
	const handleError = (event) => {
		if (fallback && event.currentTarget.src !== fallback) {
			event.currentTarget.src = fallback;
		}
	};

	return (
		<div className={`group h-29.25 w-26 shrink-0 overflow-hidden rounded-[10px] ${className}`}>
			<img className='h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-180' src={src || fallback} alt={alt} onError={handleError} />
		</div>
	)
}
