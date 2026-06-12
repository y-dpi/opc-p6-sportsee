// Dependencies.
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Button from './Button.jsx';

// Color palette: copied from index.css.
const COLOR_BAR = '#B6BDFC';
const COLOR_BAR_ACTIVE = '#3C4FF6';
const COLOR_GRID = '#E7E7E7';
const COLOR_AXIS = '#707070';
const COLOR_AXIS_LINE = '#000000';

const SAMPLE_DATA = [
	{ label: 'S1', km: 20, range: '28.05 au 03.06' },
	{ label: 'S2', km: 24, range: '04.06 au 10.06' },
	{ label: 'S3', km: 16, range: '11.06 au 17.06' },
	{ label: 'S4', km: 30, range: '18.06 au 24.06' },
];

// Value preview overlay.
function ChartTooltip({ active, payload }) {
	if (!active || !payload?.length) return null
	const { range, km } = payload[0].payload
	return (
		<div className='rounded-xl bg-(--color-surface-black) px-4 py-3 text-(--color-surface-white)'>
			{range && (
				<p className='text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight)'>{range}</p>
			)}
			<p className='mt-1 text-[calc(var(--font-body-large-size)*1px)] font-(--font-body-large-weight)'>{String(km).replace('.', ',')} km</p>
		</div>
	)
}

// Distance bar chart.
export default function StatsKM({ title = '18km en moyenne', subtitle = 'Total des kilomètres 4 dernières semaines', period = '28 mai - 25 juin', data = SAMPLE_DATA, onPrev, onNext, nextDisabled = false, className = '' }) {
	return (
		<div className={`flex flex-col rounded-xl bg-(--color-surface-white) p-8 ${className}`}>
			{/* Header */}
			<div>
				<div className='flex items-center justify-between gap-4'>
					<h3 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-blue)'>{title}</h3>
					<div className='flex shrink-0 items-center gap-2'>
						<Button variant='navl' onClick={onPrev} aria-label='Période précédente' />
						<span className='whitespace-nowrap text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-primary)'>{period}</span>
						<Button variant='navr' onClick={onNext} disabled={nextDisabled} aria-label='Période suivante' />
					</div>
				</div>
				<p className='mt-1 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{subtitle}</p>
			</div>

			{/* Chart */}
			<div className='mt-6 h-64 w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
						<CartesianGrid vertical={false} strokeDasharray='4 4' stroke={COLOR_GRID} />
						<XAxis dataKey='label' tickLine={false} axisLine={{ stroke: COLOR_AXIS_LINE }} tick={{ fill: COLOR_AXIS, fontSize: 12 }} dy={8} />
						<YAxis domain={[0, 30]} ticks={[0, 10, 20, 30]} tickLine={false} axisLine={{ stroke: COLOR_AXIS_LINE }} tick={{ fill: COLOR_AXIS, fontSize: 12 }} width={36} />
						<Tooltip cursor={false} content={<ChartTooltip />} />
						<Bar dataKey='km' fill={COLOR_BAR} barSize={14} radius={[8, 8, 8, 8]} activeBar={{ fill: COLOR_BAR_ACTIVE }} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Legend */}
			<div className='mt-2 flex items-center gap-2'>
				<span className='size-2 rounded-full bg-(--color-blue-40)' />
				<span className='text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-secondary)'>Km</span>
			</div>
		</div>
	)
}
