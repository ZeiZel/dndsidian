import { ConfigProvider, theme as antdThemeUtil } from 'antd';
import { antdTheme } from '@theme/antd-theme';
import { useColorMode } from '@docusaurus/theme-common';
import type { ReactNode } from 'react';

interface AntdProviderProps {
	children: ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
	const { colorMode } = useColorMode();
	const isDarkTheme = colorMode === 'dark';

	return (
		<ConfigProvider
			theme={{
				...antdTheme,
				algorithm: isDarkTheme
					? antdThemeUtil.darkAlgorithm
					: antdThemeUtil.defaultAlgorithm,
				token: {
					...antdTheme.token,
					colorBgContainer: isDarkTheme
						? 'var(--dnd-bg-secondary)'
						: 'var(--dnd-bg-secondary)',
					colorText: isDarkTheme ? 'var(--dnd-text)' : 'var(--dnd-text)',
					colorBorder: isDarkTheme ? 'var(--dnd-border)' : 'var(--dnd-border)',
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
}

