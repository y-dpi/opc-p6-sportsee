import ProfilePicture from '../components/ProfilePicture.jsx';
import Achievement from '../components/Achievement.jsx';
import DistanceGraph from '../components/DistanceGraph.jsx';
import HeartRateGraph from '../components/HeartRateGraph.jsx';
import CurrentWeek from '../components/CurrentWeek.jsx';
import { useUserInfo } from '../hooks/useUserInfo.js';
import { FALLBACK_PHOTO, formatDate } from '../utils/profile.js';

export default function DashboardPage() {
  const { userInfo, loading, error } = useUserInfo();

  if (loading) {
    return <p className='text-(--color-text-secondary)'>Chargement…</p>;
  }

  if (error || !userInfo) {
    return <p className='text-(--color-text-orange)'>Impossible de charger vos informations.</p>;
  }

  const { profile, statistics } = userInfo;
  const name = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className='mx-auto flex max-w-300 flex-col gap-10'>

      {/* Profile header */}
      <section className='flex items-center justify-between gap-6 rounded-xl bg-[linear-gradient(to_bottom,var(--color-surface-white),transparent)] p-8'>
        <div className='flex items-center gap-6'>
          <ProfilePicture src={profile.profilePicture} fallback={FALLBACK_PHOTO} alt={name} />
          <div>
            <h1 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>{name}</h1>
            <p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>Membre depuis le {formatDate(profile.createdAt)}</p>
          </div>
        </div>
        <div className='flex items-center gap-6'>
          <p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>Distance totale parcourue</p>
          <Achievement value={`${statistics.totalDistance} km`} />
        </div>
      </section>

      {/* Recent performances */}
      <section className='flex flex-col gap-4'>
        <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Vos dernières performances</h2>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]'>
          <DistanceGraph />
          <HeartRateGraph />
        </div>
      </section>

      {/* This week */}
      <CurrentWeek />
    </div>
  );
}
