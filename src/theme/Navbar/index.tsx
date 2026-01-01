import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from '@theme/Navbar/Content';

const navbarVariants = {
	hidden: {
		y: -100,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
};

export default function Navbar(): ReactNode {
	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={navbarVariants}
			transition={{
				duration: 0.5,
				ease: 'easeOut',
			}}
		>
			<NavbarLayout>
				<NavbarContent />
			</NavbarLayout>
		</motion.div>
	);
}

