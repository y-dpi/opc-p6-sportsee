// Dependencies.
import { useState } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Button from './Button.jsx';

// Color palette: copied from index.css.
const COLOR_MIN = '#FCC1B6';
const COLOR_MIN_ACTIVE = '#F99885';
const COLOR_MAX = '#F4320B';
const COLOR_MAX_ACTIVE = '#C8280A';
const COLOR_LINE = '#CED3FD';
const COLOR_LINE_ACTIVE = '#0B23F4';
const COLOR_DOT = '#0B23F4';
const COLOR_GRID = '#E7E7E7';
const COLOR_AXIS = '#707070';
const COLOR_AXIS_LINE = '#000000';

const SAMPLE_DATA = [
	{ day: 'Lun', min: 138, max: 172, avg: 167 },
	{ day: 'Mar', min: 139, max: 180, avg: 170 },
	{ day: 'Mer', min: 145, max: 187, avg: 171 },
	{ day: 'Jeu', min: 140, max: 173, avg: 165 },
	{ day: 'Ven', min: 134, max: 170, avg: 169 },
	{ day: 'Sam', min: 145, max: 165, avg: 162 },
	{ day: 'Dim', min: 136, max: 181, avg: 168 },
];

// Value preview overlay.
function ChartTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null
	const { min, max, avg } = payload[0].payload
	const rows = [
		['Min', min],
		['Max', max],
		['Moyenne', avg],
	]
	return (
		<div className='rounded-xl bg-(--color-surface-black) px-4 py-3 text-(--color-surface-white)'>
			<p className='text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight)'>{label}</p>
			<div className='mt-1 flex flex-col gap-0.5 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight)'>
				{rows.map(([name, value]) => (
					<p key={name}>{name} : <span className='font-(--font-body-large-weight)'>{value}</span> bpm</p>
				))}
			</div>
		</div>
	)
}

// BPM bar chart.
export default function StatsBPM({ title = '163 BPM', subtitle = 'Fréquence cardiaque moyenne', period = '28 mai - 04 juin', data = SAMPLE_DATA, onPrev, onNext, className = '' }) {
	const [hovered, setHovered] = useState(false);

	return (
		<div className={`flex flex-col rounded-xl bg-(--color-surface-white) p-8 ${className}`}>
			{/* Header */}
			<div>
				<div className='flex items-center justify-between gap-4'>
					<h3 className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-orange)'>{title}</h3>
					<div className='flex shrink-0 items-center gap-2'>
						<Button variant='navl' onClick={onPrev} aria-label='Période précédente' />
						<span className='whitespace-nowrap text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-primary)'>{period}</span>
						<Button variant='navr' onClick={onNext} aria-label='Période suivante' />
					</div>
				</div>
				<p className='mt-1 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{subtitle}</p>
			</div>

			{/* Chart */}
			<div className='mt-6 h-64 w-full'>
				<ResponsiveContainer width='100%' height='100%'>
					<ComposedChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }} barGap={4} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
						<CartesianGrid strokeDasharray='4 4' stroke={COLOR_GRID} />
						<XAxis dataKey='day' tickLine={false} axisLine={{ stroke: COLOR_AXIS_LINE }} tick={{ fill: COLOR_AXIS, fontSize: 12 }} dy={8} />
						<YAxis domain={[130, 187]} ticks={[130, 145, 160, 187]} tickLine={false} axisLine={{ stroke: COLOR_AXIS_LINE }} tick={{ fill: COLOR_AXIS, fontSize: 12 }} width={36} />
						<Tooltip cursor={false} content={<ChartTooltip />} />
						<Bar dataKey='min' fill={COLOR_MIN} barSize={9} radius={[6, 6, 6, 6]} activeBar={{ fill: COLOR_MIN_ACTIVE }} />
						<Bar dataKey='max' fill={COLOR_MAX} barSize={9} radius={[6, 6, 6, 6]} activeBar={{ fill: COLOR_MAX_ACTIVE }} />
						<Line type='monotone' dataKey='avg' stroke={hovered ? COLOR_LINE_ACTIVE : COLOR_LINE} strokeWidth={3} dot={{ r: 4, fill: COLOR_DOT, stroke: '#FFFFFF', strokeWidth: 1 }} activeDot={false} isAnimationActive={false} />
					</ComposedChart>
				</ResponsiveContainer>
			</div>

			{/* Legend */}
			<div className='mt-2 flex items-center gap-5 text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-secondary)'>
				<span className='flex items-center gap-2'><span className='size-2 rounded-full bg-(--color-orange-30)' />Min</span>
				<span className='flex items-center gap-2'><span className='size-2 rounded-full bg-(--color-orange-100)' />Max BPM</span>
				<span className='flex items-center gap-2'><span className='size-2 rounded-full bg-(--color-blue-100)' />Moyenne</span>
			</div>
		</div>
	);
}
