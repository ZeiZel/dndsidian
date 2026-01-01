import { motion, useInView } from 'framer-motion';
import { Card } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Title, P } from '@site/src/components';
import styles from './styles.module.css';

interface FeatureCardProps {
	title: string;
	description: ReactNode;
	icon?: ReactNode;
	delay?: number;
}

const featureVariants = {
	hidden: {
		opacity: 0,
		y: 40,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

export function FeatureCard({
	title,
	description,
	icon,
	delay = 0,
}: FeatureCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={featureVariants}
			transition={{
				duration: 0.6,
				ease: 'easeOut',
				delay,
			}}
			className={styles.featureCard}
		>
			<Card
				className={styles.card}
				style={{
					height: '100%',
					border: `2px solid var(--color-primary)`,
					background:
						'linear-gradient(135deg, rgba(253, 246, 227, 0.95), rgba(245, 232, 199, 0.95))',
					boxShadow: '0 8px 24px var(--dnd-shadow)',
				}}
				hoverable
			>
				{icon && (
					<div className={styles.iconContainer}>
						<motion.div
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.95 }}
						>
							{icon}
						</motion.div>
					</div>
				)}
				<Title level={3} appearance="primary" className={styles.title}>
					{title}
				</Title>
				<P appearance="default" className={styles.description}>
					{description}
				</P>
			</Card>
		</motion.div>
	);
}

