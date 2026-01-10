import React, { useState } from 'react';

import { Steps, Card, Button, Space } from 'antd';
import {
	BookOutlined,
	CommentOutlined,
	SearchOutlined,
	FireOutlined,
	TrophyOutlined,
	LeftOutlined,
	RightOutlined,
} from '@ant-design/icons';

import { motion, AnimatePresence } from 'framer-motion';
import clsx from "clsx";

import styles from './GameplayGuide.module.css';

const { Step } = Steps;

interface GameStep {
	title: string;
	icon: React.ReactNode;
	description: string;
	example: {
		dm?: string;
		player?: string;
		action?: string;
	}[];
}

const gameSteps: GameStep[] = [
	{
		title: 'Подготовка',
		icon: <BookOutlined />,
		description:
			'Мастер готовит сессию: продумывает сцены, готовит карты, музыку и характеристики врагов. Игроки вспоминают события прошлой сессии и проверяют свои листы персонажей.',
		example: [
			{
				action:
					'🎲 Мастер открывает заметки, загружает карту таверны в Foundry VTT и включает фоновую музыку',
			},
			{
				action: '📝 Игроки просматривают свои листы персонажей и вспоминают активные квесты',
			},
		],
	},
	{
		title: 'Введение',
		icon: <CommentOutlined />,
		description:
			'Мастер кратко пересказывает события прошлой сессии и описывает текущую ситуацию. Устанавливается цель сессии и создаётся нужная атмосфера.',
		example: [
			{
				dm: 'Итак, на прошлой сессии вы прибыли в город Ивовая Лощина и узнали о таинственных исчезновениях. Сейчас вы сидите в таверне "Пляшущий дракон", и к вам подходит встревоженная женщина...',
			},
			{
				player: 'Я встаю и приглашаю её присесть к нам за стол.',
			},
			{
				dm: 'Она благодарно кивает. "Меня зовут Марта, и мне нужна ваша помощь. Моя дочь Элара не вернулась домой третью ночь подряд..."',
			},
		],
	},
	{
		title: 'Исследование',
		icon: <SearchOutlined />,
		description:
			'Игроки общаются с NPC, собирают информацию, исследуют локации и используют свои навыки для решения загадок. Это основная часть ролевой игры.',
		example: [
			{
				player:
					'Я хочу использовать Проницательность, чтобы понять, говорит ли она правду.',
			},
			{
				dm: 'Сделай проверку Проницательности.',
			},
			{
				player: '*бросает d20* 18 плюс мой бонус... 22!',
			},
			{
				dm: 'Ты чувствуешь, что она абсолютно искренна и действительно отчаянно ищет помощи. Более того, ты замечаешь странный символ на её медальоне.',
			},
			{
				player: 'Я спрашиваю её про медальон.',
			},
		],
	},
	{
		title: 'Бой',
		icon: <FireOutlined />,
		description:
			'Начинается столкновение! Определяется инициатива, игроки и враги совершают ходы. Используются способности, заклинания и тактика. Это самая динамичная часть игры.',
		example: [
			{
				dm: 'Когда вы подходите к старому кладбищу, из тумана появляются три скелета и призрак! Бросайте инициативу!',
			},
			{
				action: '🎲 Все бросают d20 + модификатор Ловкости',
			},
			{
				player:
					'У меня 19 инициативы. Я использую Действие рывка, чтобы добежать до призрака, и атакую его своим мечом!',
			},
			{
				action: '*бросает d20* Попал! 16 против его КБ.',
			},
			{
				dm: 'Попадание! Брось урон.',
			},
			{
				player: '*бросает 1d8+3* 9 рубящего урона!',
			},
			{
				dm: 'Твой меч проходит сквозь призрачную форму, и она вздрагивает от боли.',
			},
		],
	},
	{
		title: 'Развязка',
		icon: <TrophyOutlined />,
		description:
			'Бой завершён, цели достигнуты. Игроки получают награды: опыт, сокровища, информацию. Мастер создаёт cliffhanger - интригующий момент, который заинтересует игроков к следующей сессии.',
		example: [
			{
				dm: 'Последний скелет рассыпается в прах. Вы находите 50 золотых и странный древний свиток. Элара благодарит вас за спасение.',
			},
			{
				action: '💰 Группа получает 300 опыта',
			},
			{
				player: 'Я спрашиваю Элару, что она помнит.',
			},
			{
				dm: 'Она говорит дрожащим голосом: "Я ничего не помню... но у меня теперь есть эта метка." Она показывает вам руку - на ней светится странный магический символ.',
			},
			{
				action: '⏸️ Cliffhanger для следующей сессии!',
			},
		],
	},
];

export const GameplayGuide: React.FC = () => {
	const [current, setCurrent] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const currentStep = gameSteps[current];

	return (
		<div className={styles["gameplay-guide"]}>
			<Steps current={current} className={styles["gameplay-steps"]}>
				{gameSteps.map((step, index) => (
					<Step key={index} title={step.title} icon={step.icon} />
				))}
			</Steps>

			<AnimatePresence mode="wait">
				<motion.div
					key={current}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.4 }}
					className={styles["step-content"]}
				>
					<Card className={styles["step-card"]} variant={'outlined'}>
						<div className={styles["step-header"]}>
							<div className={styles["step-icon-large"]}>{currentStep.icon}</div>
							<h2>{currentStep.title}</h2>
						</div>
						<p className={styles["step-description"]}>{currentStep.description}</p>

						<div className={styles["step-example"]}>
							<h3>📖 Пример игры:</h3>
							<div className={styles["dialogue"]}>
								{currentStep.example.map((line, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										className={clsx({
											[styles['dialogue-dm']]: line.dm,
											[styles['dialogue-player']]: !line.dm && line.player,
											[styles['dialogue-action']]: !line.dm && !line.player,
										})}
									>
										{line.dm && (
											<>
												<strong className="speaker">🎭 Мастер:</strong>{' '}
												<span>{line.dm}</span>
											</>
										)}
										{line.player && (
											<>
												<strong className="speaker">🎲 Игрок:</strong>{' '}
												<span>{line.player}</span>
											</>
										)}
										{line.action && <span className="action-text">{line.action}</span>}
									</motion.div>
								))}
							</div>
						</div>
					</Card>

					<Space className={styles["step-navigation"]} size="middle">
						<Button
							icon={<LeftOutlined />}
							onClick={prev}
							disabled={current === 0}
							size="large"
						>
							Назад
						</Button>
						{current < gameSteps.length - 1 ? (
							<Button type="primary" onClick={next} size="large">
								Далее <RightOutlined />
							</Button>
						) : (
							<Button type="primary" href="./rules" size="large">
								К документации <RightOutlined />
							</Button>
						)}
					</Space>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default GameplayGuide;



