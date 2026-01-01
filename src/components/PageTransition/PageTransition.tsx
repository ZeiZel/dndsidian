import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '@docusaurus/router';
import type { ReactNode } from 'react';

interface PageTransitionProps {
	children: ReactNode;
}

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	exit: {
		opacity: 0,
		y: -20,
	},
};

export function PageTransition({ children }: PageTransitionProps) {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={location.pathname}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageVariants}
				transition={{
					duration: 0.4,
					ease: 'easeOut',
				}}
				style={{ width: '100%' }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

