import type { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './P.module.css';

export type Appearance = 'default' | 'primary' | 'secondary' | 'danger';

export interface PProps extends HTMLAttributes<HTMLParagraphElement> {
	appearance?: Appearance;
	children: ReactNode;
	className?: string;
	role?: string;
	'aria-label'?: string;
}

export function P({
	appearance = 'default',
	children,
	className,
	role,
	'aria-label': ariaLabel,
	...props
}: PProps) {
	const appearanceClass = `appearance-${appearance}`;

	return (
		<p
			className={clsx(styles.paragraph, styles[appearanceClass], className)}
			role={role}
			aria-label={ariaLabel}
			{...props}
		>
			{children}
		</p>
	);
}

