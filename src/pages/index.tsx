import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from 'antd';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Title, P } from '@site/src/components';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useEffect, useRef } from 'react';

import styles from './index.module.css';

const headerVariants = {
	hidden: {
		opacity: 0,
		y: -30,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	const bannerRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness: 50, damping: 20 });
	const springY = useSpring(y, { stiffness: 50, damping: 20 });
	const bannerImageUrl = useBaseUrl('/img/banner.png');

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!bannerRef.current) return;
			const rect = bannerRef.current.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;
			const moveX = -(e.clientX - centerX) * 0.03;
			const moveY = -(e.clientY - centerY) * 0.03;
			x.set(moveX);
			y.set(moveY);
		};

		const handleMouseLeave = () => {
			x.set(0);
			y.set(0);
		};

		const banner = bannerRef.current;
		if (banner) {
			banner.addEventListener('mousemove', handleMouseMove);
			banner.addEventListener('mouseleave', handleMouseLeave);
		}

		return () => {
			if (banner) {
				banner.removeEventListener('mousemove', handleMouseMove);
				banner.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	}, [x, y]);

	return (
		<header className={styles.heroBanner} ref={bannerRef}>
			<div className={styles.bannerImageContainer}>
				<motion.div
					className={styles.bannerImageWrapper}
					style={{
						x: springX,
						y: springY,
					}}
				>
					<img
						src={bannerImageUrl}
						alt="D&D Banner"
						className={styles.bannerImage}
					/>
				</motion.div>
				<div className={styles.bannerOverlay} />
			</div>
			<motion.div
				className={clsx('container', styles.heroContent)}
				variants={headerVariants}
				initial='hidden'
				animate='visible'
				transition={{
					duration: 0.6,
					ease: 'easeOut',
					delayChildren: 0.2,
				}}
			>
				<motion.div variants={itemVariants}>
					<Title
						level={1}
						appearance="primary"
						className={styles.heroTitle}
					>
						{siteConfig.title}
					</Title>
				</motion.div>
				<motion.div variants={itemVariants}>
					<P
						appearance="default"
						className={styles.heroSubtitle}
					>
						{siteConfig.tagline}
					</P>
				</motion.div>
				<motion.div variants={itemVariants}>
					<P
						appearance="default"
						className={styles.heroDescription}
					>
						Добро пожаловать в централизованную базу знаний для сообщества D&D! 
						Здесь вы найдёте всё необходимое для организации и проведения игровых сессий: 
						от базовых правил и создания персонажей до организации удалённых игр и работы с материалами. 
						Наша цель — сделать D&D доступным и понятным для всех, от новичков до опытных мастеров.
					</P>
				</motion.div>
				<motion.div variants={itemVariants} className={styles.buttons}>
					<Link to='/docs'>
						<Button
							type='primary'
							size='large'
							style={{
								fontSize: '1.2rem',
								padding: '0.75rem 2rem',
								height: 'auto',
							}}
						>
							Начать изучение ⚔️
						</Button>
					</Link>
				</motion.div>
			</motion.div>
		</header>
	);
}

export default function Home(): ReactNode {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`${siteConfig.title} - ${siteConfig.tagline}`}
			description='Система документации для D&D'
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
