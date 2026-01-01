import { motion, useInView } from 'framer-motion';
import { Card } from 'antd';
import type { CardProps } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';

interface AnimatedCardProps extends CardProps {
	children: ReactNode;
	delay?: number;
}

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
	},
};

export function AnimatedCard({
	children,
	delay = 0,
	...cardProps
}: AnimatedCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-100px' });

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={cardVariants}
			transition={{
				duration: 0.5,
				ease: 'easeOut',
				delay,
			}}
		>
			<Card
				{...cardProps}
				style={{
					...cardProps.style,
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
					transition: 'all 0.3s ease',
				}}
				hoverable
			>
				{children}
			</Card>
		</motion.div>
	);
}

