import { Alert } from 'antd';
import { motion } from 'framer-motion';
import type { AlertProps } from 'antd';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AdmonitionProps extends Omit<AlertProps, 'type'> {
	type?: 'info' | 'success' | 'warning' | 'error' | 'note' | 'tip';
	title?: React.ReactNode;
	children: React.ReactNode;
}

const admonitionVariants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
};

const typeMap: Record<string, AlertProps['type']> = {
	note: 'info',
	tip: 'success',
	warning: 'warning',
	error: 'error',
	info: 'info',
	success: 'success',
};

export function Admonition({
	type = 'info',
	title,
	children,
	...props
}: AdmonitionProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });

	const alertType = typeMap[type] || 'info';

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			variants={admonitionVariants}
			transition={{
				duration: 0.4,
				ease: 'easeOut',
			}}
			style={{ margin: '1rem 0' }}
		>
			<Alert
				{...props}
				type={alertType}
				message={title}
				description={children}
				showIcon
				style={{
					border: `2px solid var(--dnd-gold)`,
					borderRadius: '8px',
				}}
			/>
		</motion.div>
	);
}

