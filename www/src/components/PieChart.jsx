// Dependencies.
import { useState } from 'react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Sector, Tooltip } from 'recharts';

// Color palette: copied from index.css.
const COLOR_DONE = '#0B23F4';
const COLOR_DONE_ACTIVE = '#081BB8';
const COLOR_LEFT = '#CED3FD';
const COLOR_LEFT_ACTIVE = '#9DA7FB';

// Highlighted value.
function renderActiveSlice(props) {
	return <Sector {...props} cornerRadius={4} fill={props.fill === COLOR_LEFT ? COLOR_LEFT_ACTIVE : COLOR_DONE_ACTIVE} />
}

// Value preview overlay.
function ChartTooltip({ active, payload }) {
	if (!active || !payload?.length) return null
	const { name, value } = payload[0].payload
	return (
		<div className='rounded-xl bg-(--color-surface-black) px-4 py-3 text-(--color-surface-white)'>
			<p className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight)'>{value}</p>
			<p className='text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight)'>{name}</p>
		</div>
	)
}

// Pie chart.
export default function PieChart({ value = 4, goal = 6, subtitle = 'Courses hebdomadaire réalisées', className = '' }) {
	const [activeIndex, setActiveIndex] = useState(-1);
	const remaining = Math.max(goal - value, 0);
  
	const data = [
		{ name: 'restants', value: remaining },
		{ name: 'réalisées', value },
	];

	return (
		<div className={`flex flex-col rounded-xl bg-(--color-surface-white) p-8 ${className}`}>
			{/* Header */}
			<div>
				<h3>
					<span className='text-[calc(var(--font-heading-4-size)*1px)] font-(--font-heading-4-weight) text-(--color-text-blue)'>x{value} </span>
          <span className='text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-blue) opacity-50'>sur objectif de {goal}</span>
				</h3>
				<p className='mt-1 text-[calc(var(--font-body-default-size)*1px)] font-(--font-body-default-weight) text-(--color-text-secondary)'>{subtitle}</p>
			</div>

			{/* Chart */}
			<div className='relative mt-6 h-64 w-full'>
				<span className='absolute right-4 top-4 flex items-center gap-2 text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-secondary)'>
					<span className='size-2 rounded-full bg-(--color-blue-20)' />{remaining} restants
				</span>
				<span className='absolute bottom-10 left-2 flex items-center gap-2 text-[calc(var(--font-body-small-size)*1px)] font-(--font-body-small-weight) text-(--color-text-secondary)'>
					<span className='size-2 rounded-full bg-(--color-blue-100)' />{value} réalisées
				</span>
				<ResponsiveContainer width='100%' height='100%'>
					<RePieChart>
						<Tooltip cursor={false} content={<ChartTooltip />} />
						<Pie
							data={data}
							dataKey='value'
							innerRadius='50%'
							outerRadius='100%'
							cornerRadius={4}
							paddingAngle={1}
							startAngle={90}
							endAngle={-270}
							stroke='none'
							activeIndex={activeIndex}
							activeShape={renderActiveSlice}
							onMouseEnter={(_, index) => setActiveIndex(index)}
							onMouseLeave={() => setActiveIndex(-1)}
						>
							<Cell fill={COLOR_LEFT} />
							<Cell fill={COLOR_DONE} />
						</Pie>
					</RePieChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
