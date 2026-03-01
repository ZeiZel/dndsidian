import { motion, useInView } from 'framer-motion';
import { Card, Tag, Tooltip } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import Link from '@docusaurus/Link';
import { Title, P } from '@site/src/components';
import styles from './styles.module.css';

export type RaceSize = 'small' | 'medium' | 'large';
export type RaceSource = 'PHB' | 'VGM' | 'MTOF' | 'TCOE' | 'MMOM';

export interface RaceTrait {
	name: string;
	description: string;
}

export interface RaceCardProps {
	name: string;
	nameEn: string;
	description: ReactNode;
	size: RaceSize;
	speed: number;
	abilityBonuses: string[];
	traits: string[];
	source?: RaceSource;
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

const sizeLabels: Record<RaceSize, string> = {
	small: 'Маленький',
	medium: 'Средний',
	large: 'Большой',
};

const sourceLabels: Record<RaceSource, string> = {
	PHB: "Player's Handbook",
	VGM: "Volo's Guide to Monsters",
	MTOF: "Mordenkainen's Tome of Foes",
	TCOE: "Tasha's Cauldron of Everything",
	MMOM: "Mordenkainen Presents: Monsters of the Multiverse",
};

const sourceColors: Record<RaceSource, string> = {
	PHB: '#4CAF50',
	VGM: '#9C27B0',
	MTOF: '#673AB7',
	TCOE: '#2196F3',
	MMOM: '#FF9800',
};

export function RaceCard({
	name,
	nameEn,
	description,
	size,
	speed,
	abilityBonuses,
	traits,
	source = 'PHB',
	icon,
	link,
	delay = 0,
}: RaceCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });

	const cardContent = (
		<Card className={styles.card} hoverable>
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
				{source && (
					<Tooltip title={sourceLabels[source]}>
						<Tag color={sourceColors[source]} className={styles.sourceTag}>
							{source}
						</Tag>
					</Tooltip>
				)}
			</div>

			<P appearance="default" className={styles.description}>
				{description}
			</P>

			<div className={styles.stats}>
				<div className={styles.statRow}>
					<span className={styles.statLabel}>Размер:</span>
					<Tag className={styles.statValue}>{sizeLabels[size]}</Tag>
				</div>
				<div className={styles.statRow}>
					<span className={styles.statLabel}>Скорость:</span>
					<Tag className={styles.statValue}>{speed} фт</Tag>
				</div>
				<div className={styles.statRow}>
					<span className={styles.statLabel}>Бонусы:</span>
					<div className={styles.statTags}>
						{abilityBonuses.map((bonus) => (
							<Tag key={bonus} color="gold" className={styles.bonusTag}>
								{bonus}
							</Tag>
						))}
					</div>
				</div>
			</div>

			<div className={styles.traits}>
				<span className={styles.traitsLabel}>Особенности:</span>
				<div className={styles.traitsList}>
					{traits.map((trait) => (
						<Tag key={trait} className={styles.traitTag}>
							{trait}
						</Tag>
					))}
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
			className={styles.raceCard}
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
