import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Title, P } from '@site/src/components';
import { GithubOutlined, ProjectOutlined, RocketOutlined } from '@ant-design/icons';

export default function MePage(): ReactNode {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Layout
			title={`Об авторе - ${siteConfig.title}`}
			description='Узнайте больше об авторе проекта D&D Sidian'
		>
			<main style={{ padding: '2rem 0', maxWidth: '900px', margin: '0 auto' }}>
				<div style={{ padding: '0 1rem' }}>
					<Title level={1} appearance="primary" style={{ marginBottom: '2rem' }}>
						Об авторе
					</Title>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							👋 Привет!
						</Title>
						<P appearance="default">
							Меня зовут <strong>ZeiZel</strong>, и я создал D&D Sidian — проект, который
							помогает русскоязычным игрокам погрузиться в мир Dungeons & Dragons.
						</P>
						<P appearance="default">
							Я разработчик и энтузиаст настольных ролевых игр. D&D изменил мою жизнь, дав
							возможность создавать истории, встречать удивительных людей и развивать
							креативность. Этот проект — моя попытка поделиться этой магией с другими.
						</P>
					</section>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							<GithubOutlined /> GitHub
						</Title>
						<P appearance="default">
							Весь код проекта открыт и доступен на GitHub. Вы можете изучить его,
							предложить улучшения или даже создать свой форк!
						</P>
						<div style={{ marginTop: '1rem' }}>
							<a
								href="https://github.com/ZeiZel"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: 'inline-block',
									padding: '0.75rem 1.5rem',
									background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
									color: 'white',
									borderRadius: '8px',
									textDecoration: 'none',
									fontWeight: 'bold',
									marginRight: '1rem',
								}}
							>
								<GithubOutlined /> Мой GitHub
							</a>
							<a
								href="https://github.com/ZeiZel/dndsidian"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: 'inline-block',
									padding: '0.75rem 1.5rem',
									background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
									color: 'white',
									borderRadius: '8px',
									textDecoration: 'none',
									fontWeight: 'bold',
								}}
							>
								<ProjectOutlined /> Репозиторий проекта
							</a>
						</div>
					</section>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							<RocketOutlined /> Проекты для игроков
						</Title>
						<P appearance="default">
							D&D Sidian — это главный проект, но я планирую развивать экосистему
							инструментов для русскоязычного D&D-сообщества:
						</P>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
								gap: '1.5rem',
								marginTop: '1.5rem',
							}}
						>
							<div
								style={{
									padding: '1.5rem',
									border: '2px solid #667eea',
									borderRadius: '12px',
									background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
								}}
							>
								<Title level={3} appearance="secondary" style={{ marginBottom: '0.5rem' }}>
									🎨 D&D Sidian
								</Title>
								<P appearance="default">
									<strong>Что это:</strong> Комплексная документация на русском языке
								</P>
								<P appearance="default">
									<strong>Кому поможет:</strong> Новичкам и опытным игрокам, мастерам
								</P>
								<P appearance="default">
									<strong>Особенности:</strong>
								</P>
								<ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
									<li>Полные правила на русском</li>
									<li>Гайды для игроков и мастеров</li>
									<li>Интерактивные компоненты</li>
									<li>Организация игры (дома, онлайн, в клубах)</li>
									<li>Коллекция ресурсов (карты, токены, музыка)</li>
								</ul>
							</div>

							<div
								style={{
									padding: '1.5rem',
									border: '2px solid #f093fb',
									borderRadius: '12px',
									background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
								}}
							>
								<Title level={3} appearance="secondary" style={{ marginBottom: '0.5rem' }}>
									🔮 Будущие проекты
								</Title>
								<P appearance="default">
									Планирую развивать дополнительные инструменты для игроков:
								</P>
								<ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
									<li>Генератор персонажей (web-приложение)</li>
									<li>Трекер кампаний и сессий</li>
									<li>Коллекция переведённых модулей</li>
									<li>Инструменты для мастеров (NPC, столкновения)</li>
								</ul>
								<P appearance="default" style={{ marginTop: '1rem', fontStyle: 'italic' }}>
									Следите за обновлениями на GitHub!
								</P>
							</div>
						</div>
					</section>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							🎯 Как я могу помочь игрокам?
						</Title>
						<P appearance="default">Через этот проект я стремлюсь:</P>
						<ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
							<li>
								<strong>Снизить порог входа</strong> — сделать D&D доступным для
								русскоязычных новичков
							</li>
							<li>
								<strong>Собрать знания в одном месте</strong> — не нужно искать информацию
								по десяткам сайтов
							</li>
							<li>
								<strong>Предоставить практические гайды</strong> — не только правила, но и
								советы по организации
							</li>
							<li>
								<strong>Создать сообщество</strong> — где игроки могут делиться опытом и
								помогать друг другу
							</li>
						</ul>
					</section>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							💬 Свяжитесь со мной
						</Title>
						<P appearance="default">
							Если у вас есть предложения, нашли ошибку или просто хотите поделиться
							фидбеком:
						</P>
						<ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
							<li>
								<strong>GitHub Issues:</strong>{' '}
								<a
									href="https://github.com/ZeiZel/dndsidian/issues"
									target="_blank"
									rel="noopener noreferrer"
								>
									Создать issue
								</a>
							</li>
							<li>
								<strong>Pull Requests:</strong> Вклад в проект всегда приветствуется!
							</li>
						</ul>
					</section>

					<section style={{ marginBottom: '3rem', textAlign: 'center' }}>
						<Title level={2} appearance="primary" style={{ marginBottom: '1rem' }}>
							Благодарности
						</Title>
						<P appearance="default">
							Огромное спасибо сообществу D&D — игрокам, мастерам, создателям контента. Вы
							вдохновляете меня продолжать развивать этот проект.
						</P>
						<P appearance="secondary" style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
							Пусть ваши броски будут критичными! 🎲✨
						</P>
					</section>
				</div>
			</main>
		</Layout>
	);
}

