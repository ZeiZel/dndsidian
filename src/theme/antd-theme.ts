import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
	token: {
		colorPrimary: 'var(--color-primary)',
		colorSuccess: 'var(--color-secondary)',
		colorWarning: 'var(--color-secondary-light)',
		colorError: 'var(--color-danger)',
		colorInfo: 'var(--color-secondary-dark)',
		borderRadius: 6,
		fontFamily: 'var(--font-family-base)',
		fontSize: 16,
		colorBgContainer: 'var(--dnd-bg-secondary)',
		colorText: 'var(--dnd-text)',
		colorBorder: 'var(--dnd-border)',
	},
	components: {
		Card: {
			borderRadius: 8,
			boxShadow: '0 4px 12px var(--dnd-shadow)',
			colorBgContainer: 'var(--dnd-bg-secondary)',
			colorBorderSecondary: 'var(--dnd-border)',
		},
		Button: {
			borderRadius: 6,
			fontWeight: 600,
			fontFamily: 'var(--font-family-base)',
		},
		Typography: {
			fontFamily: 'var(--font-family-base)',
			colorText: 'var(--dnd-text)',
		},
		Menu: {
			colorBgContainer: 'transparent',
			colorItemBg: 'transparent',
			colorItemText: 'var(--dnd-text)',
			colorItemTextHover: 'var(--color-primary)',
			colorItemBgHover: 'var(--dnd-bg-tertiary)',
			colorItemTextSelected: 'var(--dnd-text)',
			colorItemBgSelected: 'var(--color-primary)',
		},
	},
	algorithm: undefined, // Будет установлен динамически в зависимости от темы
};

