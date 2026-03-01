import { motion, useInView } from 'framer-motion';
import { Card, Tag, Tooltip } from 'antd';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import Link from '@docusaurus/Link';
import { Title, P } from '@site/src/components';
import styles from './styles.module.css';

export type ItemRarity =
	| 'common'
	| 'uncommon'
	| 'rare'
	| 'very-rare'
	| 'legendary'
	| 'artifact';

export type ItemType =
	| 'weapon'
	| 'armor'
	| 'potion'
	| 'scroll'
	| 'wondrous'
	| 'ring'
	| 'rod'
	| 'staff'
	| 'wand';

export interface ItemCardProps {
	name: string;
	nameEn: string;
	rarity: ItemRarity;
	type: ItemType;
	attunement?: boolean;
	description: ReactNode;
	properties?: string[];
	icon?: ReactNode;
	link?: string;
	delay?: number;
}

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: { opacity: 1, y: 0 },
};

const rarityLabels: Record<ItemRarity, string> = {
	common: 'Обычный',
	uncommon: 'Необычный',
	rare: 'Редкий',
	'very-rare': 'Очень редкий',
	legendary: 'Легендарный',
	artifact: 'Артефакт',
};

const rarityColors: Record<ItemRarity, string> = {
	common: '#9E9E9E',
	uncommon: '#4CAF50',
	rare: '#2196F3',
	'very-rare': '#9C27B0',
	legendary: '#FF9800',
	artifact: '#C9A961',
};

const typeLabels: Record<ItemType, string> = {
	weapon: 'Оружие',
	armor: 'Доспех',
	potion: 'Зелье',
	scroll: 'Свиток',
	wondrous: 'Чудесный предмет',
	ring: 'Кольцо',
	rod: 'Жезл',
	staff: 'Посох',
	wand: 'Волшебная палочка',
};

export function ItemCard({
	name,
	nameEn,
	rarity,
	type,
	attunement = false,
	description,
	properties = [],
	icon,
	link,
	delay = 0,
}: ItemCardProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });

	const cardContent = (
		<Card
			className={styles.card}
			hoverable
			style={{ borderColor: rarityColors[rarity] }}
		>
			<div className={styles.header}>
				{icon && (
					<div
						className={styles.iconContainer}
						style={{ color: rarityColors[rarity] }}
					>
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
				<Tag color={rarityColors[rarity]} className={styles.rarityTag}>
					{rarityLabels[rarity]}
				</Tag>
				<Tag className={styles.typeTag}>{typeLabels[type]}</Tag>
				{attunement && (
					<Tooltip title="Требуется настройка">
						<Tag color="purple" className={styles.attunementTag}>
							Настройка
						</Tag>
					</Tooltip>
				)}
			</div>

			<P appearance="default" className={styles.description}>
				{description}
			</P>

			{properties.length > 0 && (
				<div className={styles.properties}>
					{properties.map((prop) => (
						<Tag key={prop} className={styles.propertyTag}>
							{prop}
						</Tag>
					))}
				</div>
			)}
		</Card>
	);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={cardVariants}
			transition={{ duration: 0.6, ease: 'easeOut', delay }}
			className={styles.itemCard}
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
