import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import './QuoteCarousel.css';

interface Quote {
	text: string;
	author: string;
	role: string;
}

const quotes: Quote[] = [
	{
		text: 'D&D — это не игра, в которой можно выиграть. Это история, которую вы рассказываете вместе.',
		author: 'Matthew Mercer',
		role: 'Ведущий Critical Role',
	},
	{
		text: 'В D&D единственным ограничением является ваше воображение.',
		author: 'Gary Gygax',
		role: 'Создатель Dungeons & Dragons',
	},
	{
		text: 'Лучшие моменты в D&D — это те, которые никто не планировал.',
		author: 'Brennan Lee Mulligan',
		role: 'Ведущий Dimension 20',
	},
	{
		text: 'D&D учит нас, что неудачи — это просто часть истории, которая делает победы ещё слаще.',
		author: 'Chris Perkins',
		role: 'Principal Story Designer, Wizards of the Coast',
	},
	{
		text: 'За столом D&D нет чужих — только друзья, которых ты ещё не встретил.',
		author: 'Сообщество игроков',
		role: 'Мудрость стола',
	},
	{
		text: 'Магия D&D в том, что каждый бросок кубика может изменить всю историю.',
		author: 'Matt Colville',
		role: 'Создатель контента для мастеров',
	},
	{
		text: 'Самые эпичные сражения происходят не на поле боя, а в сердцах персонажей.',
		author: 'Laura Bailey',
		role: 'Актриса Critical Role',
	},
	{
		text: 'D&D — это место, где ты можешь быть героем, злодеем или кем угодно между ними.',
		author: 'Travis Willingham',
		role: 'Актёр Critical Role',
	},
];

export const QuoteCarousel: React.FC = () => {
	const [currentQuote, setCurrentQuote] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentQuote((prev) => (prev + 1) % quotes.length);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	const quote = quotes[currentQuote];

	return (
		<div className="quote-carousel">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentQuote}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.6, ease: 'easeInOut' }}
				>
					<Card className="quote-card" bordered={false}>
						<div className="quote-icon">❝</div>
						<p className="quote-text">{quote.text}</p>
						<div className="quote-author">
							<div className="author-name">{quote.author}</div>
							<div className="author-role">{quote.role}</div>
						</div>
						<div className="quote-indicators">
							{quotes.map((_, index) => (
								<span
									key={index}
									className={`indicator ${index === currentQuote ? 'active' : ''}`}
									onClick={() => setCurrentQuote(index)}
								/>
							))}
						</div>
					</Card>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default QuoteCarousel;



