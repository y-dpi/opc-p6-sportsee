import ProfilePicture from '../components/ProfilePicture.jsx';
import ProfileData from '../components/ProfileData.jsx';

// Sample data: user information.
const USER = {
  name: 'Clara Dupont',
  memberSince: 'Membre depuis le 14 juin 2023',
  photo: 'https://thesportsedit.com/cdn/shop/files/carbon_plated_running_shoes_CL_645x900_crop_center.jpg?v=5545842323198498418',
  statsSince: 'depuis le 14 juin 2023',
};

// Sample data: user extended information.
const PROFILE = [
  ['Âge', '29'],
  ['Genre', 'Femme'],
  ['Taille', '1m68'],
  ['Poids', '58kg'],
];

// Sample data: user stats.
const STATS = [
  { label: 'Temps total couru', value: '27h', unit: '15min' },
  { label: 'Calories brûlées', value: '25000', unit: 'cal' },
  { label: 'Distance totale parcourue', value: '312', unit: 'km' },
  { label: 'Nombre de jours de repos', value: '9', unit: 'jours' },
  { label: 'Nombre de sessions', value: '41', unit: 'sessions' },
];

export default function ProfilePage() {
  return (
    <div className='mx-auto grid max-w-300 grid-cols-1 items-start gap-14 lg:grid-cols-2'>

      {/* Left: identity + profile details */}
      <div className='flex flex-col gap-6'>
        <section className='flex items-center gap-6 rounded-xl bg-(--color-surface-white) p-8'>
          <ProfilePicture src={USER.photo} alt={USER.name} />
          <div>
            <h1 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>{USER.name}</h1>
            <p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{USER.memberSince}</p>
          </div>
        </section>

        <section className='flex flex-col gap-6 rounded-xl bg-(--color-surface-white) px-8 py-10'>
          <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Votre profil</h2>
          <hr className='border-(--color-gray-10)' />
          <dl className='py-2 flex flex-col gap-5 text-[calc(var(--font-body-large-size)*1px)] font-(--font-body-large-weight) text-(--color-text-secondary)'>
            {PROFILE.map(([label, value]) => (
              <div key={label}>
                <dt className='inline'>{label} : </dt>
                <dd className='inline'>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Right: statistics */}
      <section className='flex flex-col gap-4'>
        <div>
          <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Vos statistiques</h2>
          <p className='mb-4 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{USER.statsSince}</p>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {STATS.map((stat) => (
            <ProfileData key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </div>
  );
}
