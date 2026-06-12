// Dependencies.
import { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import loginBg from '../assets/login-bg.png';
import mainIcon from '../assets/main-icon.svg';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { login } from '../utils/auth.js';
import { UserInfoContext } from '../context/UserInfoContext.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { resetUserInfo } = useContext(UserInfoContext);

  // Submit credentials, then redirect to the dashboard on success.
  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    try {
      await login(form.get('username'), form.get('password'));
      resetUserInfo();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className='flex h-screen w-screen flex-row bg-(--color-main-background) font-(family-name:--font-main)'>

      {/* Left form */}
      <div className='flex w-2/5 min-w-[40%] flex-col px-25 py-14'>
        <NavLink to='/dashboard'><img className='h-7 w-fit' src={mainIcon} alt='Sportsee main icon' /></NavLink>

        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-100 rounded-xl bg-(--color-surface-white) p-10'>
            <h1 className='text-[calc(var(--font-heading-3-size)*1px)] font-(--font-heading-3-weight) leading-tight text-(--color-text-blue)'>Transformez <br/> vos stats en résultats</h1>
            <h2 className='mt-8 text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Se connecter</h2>
            <form className='mt-6 flex flex-col' onSubmit={handleSubmit}>
              <InputField id='username' name='username' label="Nom d'utilisateur" type='username' />
              <InputField id='password' name='password' label='Mot de passe' password className='mt-5' />
              {error && (
                <p className='mt-4 text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-orange)'>{error}</p>
              )}
              <Button type='submit' className='mt-8 w-full'>Se connecter</Button>
            </form>
            <NavLink className='inline-block transition-colors hover:text-(--color-text-blue) text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-primary) mt-9 mb-6'>Mot de passe oublié ?</NavLink>
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className='relative w-3/5 flex-1'>
        <img className='h-full w-full object-cover object-center' src={loginBg} alt='Running athletes' />
        <p className='absolute bottom-6 right-6 max-w-xs rounded-full bg-(--color-surface-white) p-4 text-center text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-blue)'>Analysez vos performances en un clin d’œil, suivez vos progrès et atteignez vos objectifs.</p>
      </div>
    </main>
  );
}
