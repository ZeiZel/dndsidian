import type { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Title.module.css';

export type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Appearance = 'default' | 'primary' | 'secondary' | 'danger';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
	level?: TitleLevel;
	appearance?: Appearance;
	children: ReactNode;
	className?: string;
	role?: string;
	'aria-label'?: string;
}

const TitleComponentMap = {
	1: 'h1',
	2: 'h2',
	3: 'h3',
	4: 'h4',
	5: 'h5',
	6: 'h6',
} as const;

export function Title({
	level = 1,
	appearance = 'default',
	children,
	className,
	role,
	'aria-label': ariaLabel,
	...props
}: TitleProps) {
	const Component = TitleComponentMap[level] as keyof JSX.IntrinsicElements;
	const appearanceClass = `appearance-${appearance}`;

	return (
		<Component
			className={clsx(
				styles.title,
				styles[`title-level-${level}`],
				styles[appearanceClass],
				className
			)}
			role={role}
			aria-label={ariaLabel}
			{...props}
		>
			{children}
		</Component>
	);
}

