import ProfilePicture from '../components/ProfilePicture.jsx';
import ProfileData from '../components/ProfileData.jsx';
import { useUserInfo } from '../hooks/useUserInfo.js';
import { FALLBACK_PHOTO, formatDate, formatHeight, formatDuration, formatSex } from '../utils/profile.js';

export default function ProfilePage() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading) {
    return <p className='text-(--color-text-secondary)'>Chargement…</p>;
  }

  if (error || !userInfo) {
    return <p className='text-(--color-text-orange)'>Impossible de charger votre profil.</p>;
  }

  const { profile, statistics } = userInfo;

  const name = `${profile.firstName} ${profile.lastName}`;
  const since = formatDate(profile.createdAt);

  const details = [
    ['Âge', `${profile.age} ans`],
    ['Genre', formatSex(profile.gender) ?? 'Inconnu'],
    ['Taille', formatHeight(profile.height)],
    ['Poids', `${profile.weight}kg`],
  ];

  const totalDuration = formatDuration(statistics.totalDuration);
  const stats = [
    { label: 'Temps total couru', ...totalDuration },
    { label: 'Distance totale parcourue', value: statistics.totalDistance, unit: 'km' },
    { label: 'Nombre de sessions', value: String(statistics.totalSessions), unit: 'sessions' },
  ];

  return (
    <div className='mx-auto grid max-w-300 grid-cols-1 items-start gap-14 lg:grid-cols-[4fr_5fr]'>

      {/* Left: identity + profile details */}
      <div className='flex flex-col gap-6'>
        <section className='flex items-center gap-6 rounded-xl bg-(--color-surface-white) p-8'>
          <ProfilePicture src={profile.profilePicture} fallback={FALLBACK_PHOTO} alt={name} />
          <div>
            <h1 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>{name}</h1>
            <p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>Membre depuis le {since}</p>
          </div>
        </section>

        <section className='flex flex-col gap-6 rounded-xl bg-(--color-surface-white) px-8 py-10'>
          <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Votre profil</h2>
          <hr className='border-(--color-gray-10)' />
          <dl className='py-2 flex flex-col gap-5 text-[calc(var(--font-body-large-size)*1px)] font-(--font-body-large-weight) text-(--color-text-secondary)'>
            {details.map(([label, value]) => (
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
          <p className='mb-4 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>depuis le {since}</p>
        </div>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {stats.map((stat) => (
            <ProfileData key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </div>
  );
}
