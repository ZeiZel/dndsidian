import { useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import type { ReactNode } from 'react';

interface RootProps {
	children: ReactNode;
}

// Root компонент в Docusaurus рендерится до ColorModeProvider
// Ant Design ConfigProvider будет добавлен в Layout компонент
export default function Root({ children }: RootProps) {
	const location = useLocation();
	const prevPathRef = useRef(location.pathname);

	useEffect(() => {
		// Поддержка View Transitions API для плавных переходов между страницами
		if (
			typeof document !== 'undefined' &&
			'startViewTransition' in document &&
			prevPathRef.current !== location.pathname
		) {
			// Применяем view transition при изменении пути
			// CSS @view-transition с navigation: auto должен автоматически обрабатывать переходы
			// Но для React Router нужно явно вызывать startViewTransition
			(document as any).startViewTransition(() => {
				// Переход уже произошел через React Router
				// View Transition API обработает анимацию
			});
			prevPathRef.current = location.pathname;
		}
	}, [location.pathname]);

	return <>{children}</>;
}

