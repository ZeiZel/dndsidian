import React, { type ReactNode } from 'react';
import { useWindowSize } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import IconMenu from '@theme/Icon/Menu';
import { useSidebarContext } from '@theme/DocSidebar/context';

export default function DesktopSidebarToggle(): ReactNode {
	const { toggleDesktopSidebar, isDesktopSidebarOpen } = useSidebarContext();
	const windowSize = useWindowSize();

	// Показываем только на десктопе
	if (windowSize === 'mobile') {
		return null;
	}

	return (
		<button
			onClick={toggleDesktopSidebar}
			aria-label={translate({
				id: 'theme.docs.sidebar.toggleDesktopSidebarButtonAriaLabel',
				message: 'Toggle desktop sidebar',
				description:
					'The ARIA label for hamburger menu button of desktop sidebar',
			})}
			aria-expanded={isDesktopSidebarOpen}
			className="navbar__toggle clean-btn"
			type="button"
		>
			<IconMenu />
		</button>
	);
}

