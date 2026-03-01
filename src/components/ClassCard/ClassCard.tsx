import { motion, useInView } from 'framer-motion';
import { Card, Tag, Tooltip, Progress } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import Link from '@docusaurus/Link';
import { Title, P } from '@site/src/components';
import styles from './styles.module.css';

export type HitDie = 'd6' | 'd8' | 'd10' | 'd12';
export type ClassRole = 'tank' | 'dps' | 'support' | 'control';

export interface ClassCardProps {
	name: string;
	nameEn: string;
	description: ReactNode;
	hitDie: HitDie;
	primaryStats: string[];
	role: ClassRole;
	difficulty: 1 | 2 | 3 | 4 | 5;
	icon?: ReactNode;
	link?: string;
	delay?: number;
}

const cardVariants = {
	hidden: {
		opacity: 0,
		y: 40,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

const roleColors: Record<ClassRole, string> = {
	tank: '#4CAF50',
	dps: '#F44336',
	support: '#2196F3',
	control: '#9C27B0',
};

const roleLabels: Record<ClassRole, string> = {
	tank: 'Защитник',
	dps: 'Урон',
	support: 'Поддержка',
	control: 'Контроль',
};

const hitDieColors: Record<HitDie, string> = {
	d6: '#9E9E9E',
	d8: '#4CAF50',
	d10: '#2196F3',
	d12: '#F44336',
};

export function ClassCard({
	name,
	nameEn,
	description,
	hitDie,
	primaryStats,
	role,
	difficulty,
	icon,
	link,
	delay = 0,
}: ClassCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });

	const cardContent = (
		<Card
			className={styles.card}
			hoverable
		>
			<div className={styles.header}>
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
				<div className={styles.titleBlock}>
					<Title level={3} appearance="primary" className={styles.title}>
						{name}
					</Title>
					<span className={styles.nameEn}>{nameEn}</span>
				</div>
			</div>

			<div className={styles.tags}>
				<Tooltip title="Кость хитов">
					<Tag color={hitDieColors[hitDie]} className={styles.tag}>
						{hitDie}
					</Tag>
				</Tooltip>
				<Tooltip title="Роль в команде">
					<Tag color={roleColors[role]} className={styles.tag}>
						{roleLabels[role]}
					</Tag>
				</Tooltip>
			</div>

			<P appearance="default" className={styles.description}>
				{description}
			</P>

			<div className={styles.stats}>
				<div className={styles.statRow}>
					<span className={styles.statLabel}>Основные характеристики:</span>
					<div className={styles.statTags}>
						{primaryStats.map((stat) => (
							<Tag key={stat} className={styles.statTag}>
								{stat}
							</Tag>
						))}
					</div>
				</div>
				<div className={styles.statRow}>
					<span className={styles.statLabel}>Сложность:</span>
					<Progress
						percent={difficulty * 20}
						steps={5}
						size="small"
						strokeColor="var(--color-primary)"
						showInfo={false}
						className={styles.difficultyBar}
					/>
				</div>
			</div>
		</Card>
	);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={cardVariants}
			transition={{
				duration: 0.6,
				ease: 'easeOut',
				delay,
			}}
			className={styles.classCard}
		>
			{link ? (
				<Link to={link} className={styles.cardLink}>
					{cardContent}
				</Link>
			) : (
				cardContent
			)}
		</motion.div>
	);
}
