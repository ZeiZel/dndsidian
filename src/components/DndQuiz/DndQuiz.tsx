import React, { useState } from 'react';

import { Card, Radio, Button, Progress, Space, Typography } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

import { motion, AnimatePresence } from 'framer-motion';
import clsx from "clsx";

import styles from './DndQuiz.module.css';

const { Title, Paragraph } = Typography;

interface Question {
	id: number;
	text: string;
	options: { value: string; label: string; types: string[] }[];
}

interface PlayerType {
	type: string;
	name: string;
	description: string;
	recommendedClasses: string[];
	icon: string;
}

const questions: Question[] = [
	{
		id: 1,
		text: 'Что тебя больше привлекает в играх?',
		options: [
			{ value: 'strategy', label: 'Стратегия и тактика', types: ['tactician'] },
			{ value: 'story', label: 'Интересная история и персонажи', types: ['actor'] },
			{ value: 'exploration', label: 'Исследование мира и тайн', types: ['explorer'] },
			{ value: 'social', label: 'Общение и взаимодействие', types: ['social'] },
		],
	},
	{
		id: 2,
		text: 'Как ты предпочитаешь решать конфликты?',
		options: [
			{ value: 'combat', label: 'Бой - самый честный способ', types: ['tactician'] },
			{ value: 'diplomacy', label: 'Переговоры и убеждение', types: ['social'] },
			{ value: 'stealth', label: 'Скрытность и хитрость', types: ['tactician', 'explorer'] },
			{ value: 'creative', label: 'Креативное нестандартное решение', types: ['actor', 'explorer'] },
		],
	},
	{
		id: 3,
		text: 'Сколько времени ты готов потратить на изучение правил?',
		options: [
			{ value: 'deep', label: 'Хочу знать все тонкости механик', types: ['tactician'] },
			{ value: 'moderate', label: 'Основы достаточно', types: ['actor', 'social'] },
			{ value: 'minimal', label: 'Минимум правил, максимум импровизации', types: ['actor'] },
			{ value: 'learn', label: 'Буду изучать постепенно', types: ['explorer', 'social'] },
		],
	},
	{
		id: 4,
		text: 'Что важнее в бою?',
		options: [
			{ value: 'damage', label: 'Наносить максимальный урон', types: ['tactician'] },
			{ value: 'support', label: 'Помогать союзникам', types: ['social'] },
			{ value: 'control', label: 'Контролировать поле боя', types: ['tactician', 'explorer'] },
			{ value: 'drama', label: 'Создавать драматические моменты', types: ['actor'] },
		],
	},
	{
		id: 5,
		text: 'Твой идеальный игровой момент?',
		options: [
			{ value: 'victory', label: 'Победа в сложном бою', types: ['tactician'] },
			{ value: 'roleplay', label: 'Эмоциональная ролевая сцена', types: ['actor'] },
			{ value: 'discovery', label: 'Раскрытие тайны или секрета', types: ['explorer'] },
			{ value: 'connection', label: 'Сближение с другим персонажем', types: ['social'] },
		],
	},
	{
		id: 6,
		text: 'Как ты относишься к отыгрышу персонажа?',
		options: [
			{ value: 'immersive', label: 'Полностью погружаюсь в роль', types: ['actor'] },
			{ value: 'tactical', label: 'Принимаю оптимальные решения', types: ['tactician'] },
			{ value: 'balanced', label: 'Балансирую между ролью и эффективностью', types: ['social', 'explorer'] },
			{ value: 'flexible', label: 'Решаю по ситуации', types: ['explorer'] },
		],
	},
	{
		id: 7,
		text: 'Что тебя больше интересует в мире игры?',
		options: [
			{ value: 'lore', label: 'История и мифология мира', types: ['explorer'] },
			{ value: 'npcs', label: 'Персонажи и их истории', types: ['social', 'actor'] },
			{ value: 'mechanics', label: 'Как устроены магия и правила', types: ['tactician', 'explorer'] },
			{ value: 'atmosphere', label: 'Атмосфера и настроение', types: ['actor'] },
		],
	},
	{
		id: 8,
		text: 'Как ты готовишься к игровой сессии?',
		options: [
			{ value: 'optimize', label: 'Планирую билд и тактику', types: ['tactician'] },
			{ value: 'character', label: 'Думаю о мотивациях персонажа', types: ['actor'] },
			{ value: 'notes', label: 'Изучаю заметки о мире', types: ['explorer'] },
			{ value: 'casual', label: 'Просто прихожу и играю', types: ['social'] },
		],
	},
];

const playerTypes: PlayerType[] = [
	{
		type: 'tactician',
		name: 'Тактик',
		description:
			'Ты любишь оптимизацию и стратегию! Для тебя важны механики боя, эффективность билдов и тактическое превосходство. Ты знаешь правила и используешь их максимально.',
		recommendedClasses: ['Воин', 'Волшебник', 'Паладин', 'Колдун'],
		icon: '⚔️',
	},
	{
		type: 'actor',
		name: 'Актёр',
		description:
			'Ты - настоящий ролевой игрок! Для тебя важна драма, эмоциональные сцены и глубокое погружение в персонажа. Ты создаёшь незабываемые истории.',
		recommendedClasses: ['Бард', 'Плут', 'Колдун', 'Монах'],
		icon: '🎭',
	},
	{
		type: 'explorer',
		name: 'Исследователь',
		description:
			'Ты жаждешь раскрывать тайны мира! Для тебя важны лор, загадки, секреты и исследование неизведанного. Ты тот, кто всегда найдёт скрытую дверь.',
		recommendedClasses: ['Следопыт', 'Друид', 'Плут', 'Волшебник'],
		icon: '🗺️',
	},
	{
		type: 'social',
		name: 'Социальный игрок',
		description:
			'Ты - душа компании! Для тебя важно взаимодействие с другими игроками и NPC, дипломатия, командная работа и создание связей. Ты делаешь игру лучше для всех.',
		recommendedClasses: ['Бард', 'Жрец', 'Паладин', 'Чародей'],
		icon: '🤝',
	},
];

const DNDResult = ({ icon, name, recommendedClasses, description, type, resetQuiz }: PlayerType & { resetQuiz: () => void }) => {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Card className={clsx(styles['dnd-quiz-result'])} variant={'outlined'}>
				<Space orientation="vertical" size="large" style={{ width: '100%' }}>
					<div className={styles["result-icon"]}>{icon}</div>
					<Title level={2} style={{ textAlign: 'center', margin: 0 }}>
						Ты - {name}!
					</Title>
					<Paragraph style={{ fontSize: '16px', textAlign: 'center' }}>
						{description}
					</Paragraph>
					<Card className={styles["recommended-classes"]} title="Рекомендуемые классы">
						<Space wrap>
							{recommendedClasses.map((cls) => (
								<span key={cls} className="class-tag">
										{cls}
									</span>
							))}
						</Space>
					</Card>
					<Space style={{ width: '100%', justifyContent: 'center' }} size="middle">
						<Button
							type="primary"
							size="large"
							icon={<RocketOutlined />}
							href="./rules/character-creation"
						>
							Создать персонажа
						</Button>
						<Button size="large" onClick={resetQuiz}>
							Пройти ещё раз
						</Button>
					</Space>
				</Space>
			</Card>
		</motion.div>
	)
}

export const DndQuiz: React.FC = () => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<string[]>([]);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [showResult, setShowResult] = useState(false);

	const handleAnswer = () => {
		if (selectedAnswer) {
			const newAnswers = [...answers, selectedAnswer];
			setAnswers(newAnswers);
			setSelectedAnswer(null);

			if (currentQuestion < questions.length - 1) {
				setCurrentQuestion(currentQuestion + 1);
			} else {
				setShowResult(true);
			}
		}
	};

	const calculateResult = (): PlayerType => {
		const typeCounts: Record<string, number> = {
			tactician: 0,
			actor: 0,
			explorer: 0,
			social: 0,
		};

		answers.forEach((answer) => {
			questions.forEach((question) => {
				const option = question.options.find((opt) => opt.value === answer);
				if (option) {
					option.types.forEach((type) => {
						typeCounts[type] = (typeCounts[type] || 0) + 1;
					});
				}
			});
		});

		const maxType = Object.keys(typeCounts).reduce((a, b) =>
			typeCounts[a] > typeCounts[b] ? a : b
		);
		return playerTypes.find((pt) => pt.type === maxType) || playerTypes[0];
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setAnswers([]);
		setSelectedAnswer(null);
		setShowResult(false);
	};

	const progress = ((currentQuestion + 1) / questions.length) * 100;

	if (showResult) {
		const result = calculateResult();
		return <DNDResult {...result} resetQuiz={resetQuiz} />
	}

	return (
		<Card className={styles["dnd-quiz"]} variant={'outlined'}>
			<Space orientation="vertical" size="large" style={{ width: '100%' }}>
				<div>
					<Title level={4} style={{ marginBottom: '8px' }}>
						Вопрос {currentQuestion + 1} из {questions.length}
					</Title>
					<Progress percent={progress} showInfo={false} strokeColor="#52c41a" />
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestion}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.3 }}
					>
						<Title level={3} style={{ marginBottom: '24px' }}>
							{questions[currentQuestion].text}
						</Title>
						<Radio.Group
							onChange={(e) => setSelectedAnswer(e.target.value)}
							value={selectedAnswer}
							style={{ width: '100%' }}
						>
							<Space orientation="vertical" style={{ width: '100%' }} size="middle">
								{questions[currentQuestion].options.map((option) => (
									<Radio.Button
										key={option.value}
										value={option.value}
										className={styles["quiz-option"]}
									>
										{option.label}
									</Radio.Button>
								))}
							</Space>
						</Radio.Group>
					</motion.div>
				</AnimatePresence>

				<Button
					type="primary"
					size="large"
					onClick={handleAnswer}
					disabled={!selectedAnswer}
					style={{ width: '100%' }}
				>
					{currentQuestion < questions.length - 1 ? 'Далее' : 'Показать результат'}
				</Button>
			</Space>
		</Card>
	);
};

export default DndQuiz;



