import ProfilePicture from '../components/ProfilePicture.jsx';
import Achievement from '../components/Achievement.jsx';
import StatsKM from '../components/StatsKM.jsx';
import StatsBPM from '../components/StatsBPM.jsx';
import PieChart from '../components/PieChart.jsx';
import StatCard from '../components/StatCard.jsx';

// Sample data: user information.
const USER = {
  name: 'Clara Dupont',
  memberSince: 'Membre depuis le 14 juin 2023',
  photo: 'https://thesportsedit.com/cdn/shop/files/carbon_plated_running_shoes_CL_645x900_crop_center.jpg?v=5545842323198498418',
  totalDistance: '312 km',
};

// Sample data: weekly distance.
const WEEKLY_DISTANCE = {
  title: '18km en moyenne',
  subtitle: 'Total des kilomètres 4 dernières semaines',
  period: '28 mai - 25 juin',
  data: [
    { label: 'S1', km: 20, range: '28.05 au 03.06' },
    { label: 'S2', km: 24, range: '04.06 au 10.06' },
    { label: 'S3', km: 16, range: '11.06 au 17.06' },
    { label: 'S4', km: 30, range: '18.06 au 24.06' },
  ],
};

// Sample data: heart rate.
const HEART_RATE = {
  title: '163 BPM',
  subtitle: 'Fréquence cardiaque moyenne',
  period: '28 mai - 04 juin',
  data: [
    { day: 'Lun', min: 138, max: 172, avg: 167 },
    { day: 'Mar', min: 139, max: 180, avg: 170 },
    { day: 'Mer', min: 145, max: 187, avg: 171 },
    { day: 'Jeu', min: 140, max: 173, avg: 165 },
    { day: 'Ven', min: 134, max: 170, avg: 169 },
    { day: 'Sam', min: 145, max: 165, avg: 162 },
    { day: 'Dim', min: 136, max: 181, avg: 168 },
  ],
};

// Sample data: weekly goal.
const WEEKLY_GOAL = {
  value: 4,
  goal: 6,
  subtitle: 'Courses hebdomadaire réalisées',
};

// Sample data: week summary.
const WEEK = {
  range: 'Du 23/06/2025 au 30/06/2025',
  duration: { label: "Durée d'activité", value: '140', unit: 'minutes' },
  distance: { label: 'Distance', value: '21.7', unit: 'kilomètres', valueClassName: 'text-(--color-text-orange)' },
};

export default function DashboardPage() {
  return (
    <div className='mx-auto flex max-w-300 flex-col gap-10'>

      {/* Profile header */}
      <section className='flex items-center justify-between gap-6 rounded-xl bg-[linear-gradient(to_bottom,var(--color-surface-white),transparent)] p-8'>
        <div className='flex items-center gap-6'>
          <ProfilePicture src={USER.photo} alt={USER.name} />
          <div>
            <h1 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>{USER.name}</h1>
            <p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{USER.memberSince}</p>
          </div>
        </div>
        <div className='flex items-center gap-6'>
          <p className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>Distance totale parcourue</p>
          <Achievement value={USER.totalDistance} />
        </div>
      </section>

      {/* Recent performances */}
      <section className='flex flex-col gap-4'>
        <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Vos dernières performances</h2>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]'>
          <StatsKM {...WEEKLY_DISTANCE} />
          <StatsBPM {...HEART_RATE} />
        </div>
      </section>

      {/* This week */}
      <section className='flex flex-col gap-4'>
        <div>
          <h2 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-primary)'>Cette semaine</h2>
          <p className='mt-1 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{WEEK.range}</p>
        </div>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[2fr_3fr]'>
          <PieChart {...WEEKLY_GOAL} />
          <div className='flex flex-col gap-6'>
            <StatCard {...WEEK.duration} />
            <StatCard {...WEEK.distance} />
          </div>
        </div>
      </section>
    </div>
  );
}
