import { motion, useInView } from 'framer-motion';
import { Card, Tag, Tooltip, Collapse } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Title, P } from '@site/src/components';
import styles from './styles.module.css';

export type CreatureType =
	| 'aberration'
	| 'beast'
	| 'celestial'
	| 'construct'
	| 'dragon'
	| 'elemental'
	| 'fey'
	| 'fiend'
	| 'giant'
	| 'humanoid'
	| 'monstrosity'
	| 'ooze'
	| 'plant'
	| 'undead';

export type CreatureSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';

export interface CreatureCardProps {
	name: string;
	nameEn: string;
	type: CreatureType;
	size: CreatureSize;
	cr: string;
	ac: number;
	hp: string;
	speed: string;
	str: number;
	dex: number;
	con: number;
	int: number;
	wis: number;
	cha: number;
	abilities?: string[];
	actions?: string[];
	description?: ReactNode;
	icon?: ReactNode;
	delay?: number;
}

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0 },
};

const typeLabels: Record<CreatureType, string> = {
	aberration: 'Аберрация',
	beast: 'Зверь',
	celestial: 'Небожитель',
	construct: 'Конструкт',
	dragon: 'Дракон',
	elemental: 'Элементаль',
	fey: 'Фея',
	fiend: 'Исчадие',
	giant: 'Великан',
	humanoid: 'Гуманоид',
	monstrosity: 'Монстр',
	ooze: 'Слизь',
	plant: 'Растение',
	undead: 'Нежить',
};

const typeColors: Record<CreatureType, string> = {
	aberration: '#9C27B0',
	beast: '#8BC34A',
	celestial: '#FFD700',
	construct: '#607D8B',
	dragon: '#F44336',
	elemental: '#03A9F4',
	fey: '#E91E63',
	fiend: '#B71C1C',
	giant: '#795548',
	humanoid: '#9E9E9E',
	monstrosity: '#FF5722',
	ooze: '#4CAF50',
	plant: '#2E7D32',
	undead: '#424242',
};

const sizeLabels: Record<CreatureSize, string> = {
	tiny: 'Крошечный',
	small: 'Маленький',
	medium: 'Средний',
	large: 'Большой',
	huge: 'Огромный',
	gargantuan: 'Исполинский',
};

function getModifier(stat: number): string {
	const mod = Math.floor((stat - 10) / 2);
	return mod >= 0 ? `+${mod}` : `${mod}`;
}

function getCRColor(cr: string): string {
	const crNum = cr.includes('/') ? 0.5 : parseFloat(cr);
	if (crNum <= 1) return '#4CAF50';
	if (crNum <= 4) return '#8BC34A';
	if (crNum <= 10) return '#FFC107';
	if (crNum <= 16) return '#FF9800';
	return '#F44336';
}

export function CreatureCard({
	name,
	nameEn,
	type,
	size,
	cr,
	ac,
	hp,
	speed,
	str,
	dex,
	con,
	int,
	wis,
	cha,
	abilities = [],
	actions = [],
	description,
	icon,
	delay = 0,
}: CreatureCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });

	const collapseItems = [];
	if (abilities.length > 0) {
		collapseItems.push({
			key: 'abilities',
			label: 'Способности',
			children: (
				<ul className={styles.abilityList}>
					{abilities.map((ability, index) => (
						<li key={index}>{ability}</li>
					))}
				</ul>
			),
		});
	}
	if (actions.length > 0) {
		collapseItems.push({
			key: 'actions',
			label: 'Действия',
			children: (
				<ul className={styles.abilityList}>
					{actions.map((action, index) => (
						<li key={index}>{action}</li>
					))}
				</ul>
			),
		});
	}

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={cardVariants}
			transition={{ duration: 0.6, ease: 'easeOut', delay }}
			className={styles.creatureCard}
		>
			<Card className={styles.card} hoverable>
				<div className={styles.header}>
					{icon && (
						<div className={styles.iconContainer}>
							<motion.div
								whileHover={{ scale: 1.1 }}
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
					<Tooltip title="Уровень опасности">
						<Tag
							color={getCRColor(cr)}
							className={styles.crTag}
						>
							КО {cr}
						</Tag>
					</Tooltip>
				</div>

				<div className={styles.typeLine}>
					<Tag color={typeColors[type]}>{typeLabels[type]}</Tag>
					<span className={styles.sizeLine}>{sizeLabels[size]}</span>
				</div>

				{description && (
					<P appearance="default" className={styles.description}>
						{description}
					</P>
				)}

				<div className={styles.combatStats}>
					<div className={styles.statBlock}>
						<span className={styles.statLabel}>КД</span>
						<span className={styles.statValue}>{ac}</span>
					</div>
					<div className={styles.statBlock}>
						<span className={styles.statLabel}>ХП</span>
						<span className={styles.statValue}>{hp}</span>
					</div>
					<div className={styles.statBlock}>
						<span className={styles.statLabel}>Скорость</span>
						<span className={styles.statValue}>{speed}</span>
					</div>
				</div>

				<div className={styles.abilityScores}>
					<div className={styles.abilityScore}>
						<span className={styles.abilityLabel}>СИЛ</span>
						<span className={styles.abilityValue}>{str}</span>
						<span className={styles.abilityMod}>{getModifier(str)}</span>
					</div>
					<div className={styles.abilityScore}>
						<span className={styles.abilityLabel}>ЛОВ</span>
						<span className={styles.abilityValue}>{dex}</span>
						<span className={styles.abilityMod}>{getModifier(dex)}</span>
					</div>
					<div className={styles.abilityScore}>
						<span className={styles.abilityLabel}>ТЕЛ</span>
						<span className={styles.abilityValue}>{con}</span>
						<span className={styles.abilityMod}>{getModifier(con)}</span>
					</div>
					<div className={styles.abilityScore}>
						<span className={styles.abilityLabel}>ИНТ</span>
						<span className={styles.abilityValue}>{int}</span>
						<span className={styles.abilityMod}>{getModifier(int)}</span>
					</div>
					<div className={styles.abilityScore}>
						<span className={styles.abilityLabel}>МДР</span>
						<span className={styles.abilityValue}>{wis}</span>
						<span className={styles.abilityMod}>{getModifier(wis)}</span>
					</div>
					<div className={styles.abilityScore}>
						<span className={styles.abilityLabel}>ХАР</span>
						<span className={styles.abilityValue}>{cha}</span>
						<span className={styles.abilityMod}>{getModifier(cha)}</span>
					</div>
				</div>

				{collapseItems.length > 0 && (
					<Collapse
						items={collapseItems}
						className={styles.collapse}
						ghost
						size="small"
					/>
				)}
			</Card>
		</motion.div>
	);
}
