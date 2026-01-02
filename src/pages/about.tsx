import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import { Title, P } from '@site/src/components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

export default function AboutPage(): ReactNode {
	const { siteConfig } = useDocusaurusContext();

	return (
		<Layout
			title={`О проекте - ${siteConfig.title}`}
			description='Узнайте больше о проекте D&DSidian и Dungeons & Dragons'
		>
			<main style={{ padding: '2rem 0', maxWidth: '900px', margin: '0 auto' }}>
				<div style={{ padding: '0 1rem' }}>
					<Title level={1} appearance="primary" style={{ marginBottom: '2rem' }}>
						О проекте
					</Title>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							Что такое Dungeons & Dragons?
						</Title>
						<P appearance="default" style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
							<strong>Dungeons & Dragons (D&D)</strong> — это настольная ролевая игра (НРИ), созданная 
							Gary Gygax и Dave Arneson в 1974 году. Это одна из самых известных и влиятельных игр 
							в жанре, ставшая основой для целой индустрии настольных ролевых игр.
						</P>
						<P appearance="default" style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
							В D&D игроки берут на себя роли персонажей в фэнтезийном мире: от храбрых воинов до 
							могущественных магов, от хитрых воров до мудрых клириков. Один из участников берёт на себя 
							роль <strong>Мастера Подземелья (Dungeon Master, DM)</strong> — рассказчика, который описывает 
							мир, управляет персонажами-неигровыми персонажами (NPC) и монстрами, и создаёт приключения 
							для остальных игроков.
						</P>
						<P appearance="default" style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
							Игра использует кости (dice) для определения результатов действий: от броска атаки до 
							проверки навыков. История развивается совместными усилиями всех участников, создавая 
							уникальные повествования и незабываемые моменты.
						</P>
						<P appearance="default" style={{ lineHeight: '1.8' }}>
							На данный момент актуальной является <strong>5-я редакция D&D (5e)</strong>, которая известна 
							своей доступностью для новичков, при этом сохраняя глубину для опытных игроков. Именно эта 
							редакция является основой для нашего проекта.
						</P>
					</section>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							Что такое D&DSidian?
						</Title>
						<P appearance="default" style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
							<strong>D&DSidian</strong> — это комплексный ресурс, объединяющий все правила, инструменты 
							и материалы для настольной ролевой игры "Dungeons & Dragons" 5-й редакции в одном месте.
						</P>
						<P appearance="default" style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
							Это документированная база знаний и интерактивный справочник, созданный для:
						</P>
						<ul style={{ marginBottom: '1rem', lineHeight: '1.8', paddingLeft: '2rem' }}>
							<li><strong>Новых игроков</strong> — разобраться в основных правилах и механиках D&D</li>
							<li><strong>Опытных мастеров</strong> — быстро найти нужную информацию во время сессии</li>
							<li><strong>Групп игроков</strong> — иметь единый источник истины для вашего игрового компендиума</li>
						</ul>
						<P appearance="default" style={{ lineHeight: '1.8' }}>
							Наша цель — сделать D&D доступным и понятным для всех, от новичков до опытных мастеров. 
							Мы стремимся собрать все необходимые материалы и инструменты в одном месте, чтобы вы могли 
							полностью сосредоточиться на самом важном — на игре и создании незабываемых историй.
						</P>
					</section>

					<section style={{ marginBottom: '3rem' }}>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							Дорожная карта проекта
						</Title>
						<P appearance="default" style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
							Проект активно развивается. Ниже представлен план развития функционала:
						</P>

						<div style={{ marginBottom: '2rem' }}>
							<Title level={3} appearance="default" style={{ marginBottom: '0.75rem' }}>
								📚 Полные правила
							</Title>
							<ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem', listStyle: 'none' }}>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Все классы персонажей с описанием способностей</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Полный бестиарий монстров и врагов</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" checked disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Системы боевых характеристик и механик</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Заклинания и магические предметы</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" checked disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Правила для мастера подземелья</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Скрипты для автоматической установки Foundry VTT на ваш сервер</span>
								</li>
							</ul>
						</div>

						<div style={{ marginBottom: '2rem' }}>
							<Title level={3} appearance="default" style={{ marginBottom: '0.75rem' }}>
								⚔️ Инструменты мастера
							</Title>
							<ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem', listStyle: 'none' }}>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Генераторы (карт, токенов, портретов)</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Ресурсы для сбора готовых материалов</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Как настроить Foundry VTT</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Все нужные правила в компактном виде</span>
								</li>
							</ul>
						</div>

						<div>
							<Title level={3} appearance="default" style={{ marginBottom: '0.75rem' }}>
								🛠️ Кастомизация
							</Title>
							<ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem', listStyle: 'none' }}>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Создание собственных классов и подклассов</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Проектирование уникальных монстров и боссов</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Разработка новых заклинаний</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Создание магических предметов</span>
								</li>
								<li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
									<input type="checkbox" disabled style={{ marginRight: '0.5rem', marginTop: '0.25rem', flexShrink: 0 }} />
									<span>Правила возведения своих игровых миров</span>
								</li>
							</ul>
						</div>
					</section>

					<section>
						<Title level={2} appearance="default" style={{ marginBottom: '1rem' }}>
							Лицензия
						</Title>
						<P appearance="default" style={{ lineHeight: '1.8' }}>
							Текст и код распространяются под лицензией MIT.
						</P>
						<P appearance="default" style={{ lineHeight: '1.8' }}>
							Официальные материалы D&D 5-й редакции — собственность Wizards of the Coast и используются 
							в образовательных целях согласно политике справедливого использования.
						</P>
					</section>
				</div>
			</main>
		</Layout>
	);
}
