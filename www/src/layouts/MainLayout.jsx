// Dependencies.
import { Outlet } from 'react-router-dom'
import mainIcon from '../assets/main-icon.svg'
import mainIconMini from '../assets/main-icon-mini.svg'
import { NavLink } from 'react-router-dom'

// Main application layout.
export default function MainLayout() {
  return (
    <div className='flex min-h-screen flex-col bg-(--color-main-background) font-(family-name:--font-main)'>

      {/* Page header */}
      <header className='flex flex-row items-center justify-between px-40 py-9'>
        <NavLink to='/dashboard'><img className='h-7 w-fit' src={mainIcon} alt='Sportsee main icon' /></NavLink>
        <nav className='flex flex-row items-center gap-8 rounded-full bg-(--color-surface-white) px-10 py-3 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-primary)'>
          <NavLink to='/dashboard' className='transition-colors hover:text-(--color-text-blue) aria-[current=page]:text-(--color-text-blue)'>Dashboard</NavLink>
          <NavLink to='/profile' className='transition-colors hover:text-(--color-text-blue) aria-[current=page]:text-(--color-text-blue)'>Mon profil</NavLink>
          <span className='h-4 w-px bg-(--color-gray-30)' />
          <NavLink to='/login' className='text-(--color-text-blue) transition-colors hover:text-(--color-surface-action-hover)'>Se déconnecter</NavLink>
        </nav>
      </header>

      {/* Page content */}
      <main className='flex-1 px-38 py-18'>
        <Outlet />
      </main>

      {/* Page footer */}
      <footer className='flex h-10 flex-row items-center justify-between bg-(--color-surface-white) px-25 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-primary)'>
        <div className='flex flex-row gap-4'>
          <NavLink className='transition-colors hover:text-(--color-text-blue)'>©Sportsee</NavLink>
          <NavLink className='transition-colors hover:text-(--color-text-blue)'>Tous droits réservés</NavLink>
        </div>
        <div className='flex flex-row items-center gap-4'>
          <NavLink className='transition-colors hover:text-(--color-text-blue)'>Conditions générales</NavLink>
          <NavLink className='transition-colors hover:text-(--color-text-blue)'>Contact</NavLink>
          <NavLink><img className='h-5 w-fit pl-5' src={mainIconMini} alt='Sportsee main icon mini' /></NavLink>
        </div>
      </footer>
    </div>
  )
}
