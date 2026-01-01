import type { ReactNode } from 'react';
import { FeatureCard } from '@site/src/components/FeatureCard';
import styles from './styles.module.css';

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<'svg'>>;
	description: ReactNode;
};

const FeatureList: FeatureItem[] = [
	{
		title: 'Правила и механика',
		Svg: require('@site/static/img/dnd-book.svg').default,
		description: (
			<>
				Полное руководство по правилам игры, созданию персонажей и их характеристикам. 
				Всё необходимое для понимания механики D&D в одном месте — от базовых концепций 
				до продвинутых техник для мастеров игры.
			</>
		),
	},
	{
		title: 'Роли и персонажи',
		Svg: require('@site/static/img/dnd-wizard.svg').default,
		description: (
			<>
				Подробные описания различных ролей и классов персонажей. Узнайте о возможностях 
				каждого класса, их особенностях и стратегиях игры. Создавайте уникальных героев 
				для ваших приключений.
			</>
		),
	},
	{
		title: 'Организация игр',
		Svg: require('@site/static/img/dnd-map.svg').default,
		description: (
			<>
				Руководства по организации игровых сессий, включая настройку удалённых игр через 
				Docker и Caddy. Пошаговые инструкции помогут вам быстро настроить виртуальный 
				игровой стол для вашей группы.
			</>
		),
	},
	{
		title: 'Материалы и ресурсы',
		Svg: require('@site/static/img/dnd-shield.svg').default,
		description: (
			<>
				Доступ к официальным материалам и руководствам в формате PDF. Книга игрока, 
				Руководство мастера, Бестиарий и другие важные ресурсы для полноценной игры.
			</>
		),
	},
];

export const HomepageFeatures = () => {
	return (
		<section className={styles.features}>
			<div className='container'>
				<div className={styles.featuresRow}>
					{FeatureList.map((props, idx) => (
						<div key={idx} className={styles.featureCol}>
							<FeatureCard
								title={props.title}
								description={props.description}
								icon={<props.Svg className={styles.featureSvg} role='img' />}
								delay={idx * 0.1}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HomepageFeatures;
