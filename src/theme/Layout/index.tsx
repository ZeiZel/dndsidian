import type {  ReactNode } from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
	PageMetadata,
	SkipToContentFallbackId,
	ThemeClassNames,
} from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import type { Props } from '@theme/Layout';
import Root from '@theme/Root';
import { AntdProvider } from '@site/src/components/AntdProvider';
import styles from './styles.module.css';

export default function Layout({
								   children,
								   noFooter,
								   wrapperClassName,
								   title,
								   description,
							   }: Props): ReactNode {

	useKeyboardNavigation();

	return (
		<LayoutProvider>
			<Root>
				<AntdProvider>
					<PageMetadata title={title} description={description} />

					<SkipToContent />

					<AnnouncementBar />

					<Navbar />

					<div
						id={SkipToContentFallbackId}
						className={clsx(
							ThemeClassNames.layout.main.container,
							ThemeClassNames.wrapper.main,
							styles.mainWrapper,
							wrapperClassName,
						)}
					>
					<ErrorBoundary
						fallback={(params) => <ErrorPageContent {...params} />}
					>
						{children}
					</ErrorBoundary>
					</div>

					{!noFooter && <Footer />}
				</AntdProvider>
			</Root>
		</LayoutProvider>
	);
}

