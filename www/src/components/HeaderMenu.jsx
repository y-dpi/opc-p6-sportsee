// Dependencies.
import { NavLink } from 'react-router-dom';

// Header navigation menu component.
export default function HeaderMenu({ routes = [] }) {
	return (
		<nav className='flex flex-row items-center gap-8 rounded-full bg-(--color-surface-white) px-10 py-3 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-primary)'>
			{routes.map(({ route, label }) => (
				<NavLink key={route} to={route} className='transition-colors hover:text-(--color-text-blue) aria-[current=page]:text-(--color-text-blue)'>{label}</NavLink>
			))}
			<span className='h-4 w-px bg-(--color-gray-30)' />
			<NavLink to='/login' className='text-(--color-text-blue) transition-colors hover:text-(--color-surface-action-hover)'>Se déconnecter</NavLink>
		</nav>
	)
}