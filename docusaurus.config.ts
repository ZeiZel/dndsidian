import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type { Options, ThemeConfig } from '@docusaurus/preset-classic';

const selfHostedConfig = {
	author: 'ZeiZel',
	project: {
		name: 'dndsidian',
	},
	urls: {
		docs: 'https://github.com/ZeiZel/dndsidian',
		stoat: 'https://github.com/ZeiZel/dndsidian',
		rss: 'https://github.com/ZeiZel/dndsidian',
		landing: 'https://zeizel.github.io',
		repo: 'https://github.com/ZeiZel/dndsidian',
	},
};

const classicPreset: Options = {
	docs: {
		sidebarPath: './sidebars.ts',
		editUrl: selfHostedConfig.urls.docs,
	},
	blog: {
		showReadingTime: true,
		feedOptions: {
			type: ['rss', 'atom'],
			xslt: true,
		},
		editUrl: selfHostedConfig.urls.rss,
		onInlineTags: 'warn',
		onInlineAuthors: 'warn',
		onUntruncatedBlogPosts: 'warn',
	},
	theme: {
		customCss: './src/css/custom.css',
	},
};

const themeConfig: ThemeConfig = {
	image: 'img/logo.png',
	colorMode: {
		defaultMode: 'light',
		respectPrefersColorScheme: true,
		disableSwitch: false,
	},
	navbar: {
		title: 'dndsidian',
		logo: {
			alt: 'dndsidian-world',
			src: 'img/logo.png',
		},
		items: [
			{
				type: 'docSidebar',
				sidebarId: 'tutorialSidebar',
				position: 'left',
				label: 'Документация',
			},
			{ to: '/about', label: 'О проекте', position: 'left' },
			{
				href: selfHostedConfig.urls.repo,
				label: 'GitHub',
				position: 'right',
			},
		],
	},
	footer: {
		style: 'dark',
		links: [
			{
				title: 'Документация',
				items: [
					{
						label: 'Интро',
						to: '/docs/intro',
					},
				],
			},
			{
				title: 'Сообщество',
				items: [
					{
						label: 'Stoat сервер сообщества dndsidian',
						href: 'https://stoat.zeizel.ru',
					},
				],
			},
			{
				title: 'Ещё',
				items: [
					{
						label: 'О проекте',
						to: '/about',
					},
					{
						label: 'GitHub',
						href: selfHostedConfig.urls.repo,
					},
				],
			},
		],
		copyright: `ZeiZel ${new Date().getFullYear()} - all rights on DnD 5e reserved by Wizards of the Coast`,
	},
	prism: {
		theme: prismThemes.github,
		darkTheme: prismThemes.dracula,
	},
};

const docusaurus = async (): Promise<Config> => {
	return {
		title: 'D&D',
		tagline: 'Централизованная база знаний для сообщества D&D',
		favicon: 'img/favicon.ico',
		future: {
			v4: true,
		},
		url: selfHostedConfig.urls.landing,
		baseUrl: '/dndsidian/',
		organizationName: 'ZeiZel',
		projectName: 'dndsidian',
		onBrokenLinks: 'throw',
		i18n: {
			defaultLocale: 'ru',
			locales: ['en', 'ru'],
		},
		presets: [['classic', classicPreset]],
		themeConfig,
		markdown: {
			mdx1Compat: {
				comments: true,
				admonitions: true,
				headingIds: true,
			},
		},
	};
};

export default docusaurus;
