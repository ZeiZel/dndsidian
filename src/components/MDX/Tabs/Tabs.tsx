import { Tabs as AntTabs } from 'antd';
import { motion } from 'framer-motion';
import type { TabsProps as AntTabsProps } from 'antd';
import { useState } from 'react';

interface TabsProps extends Omit<AntTabsProps, 'items'> {
	items: Array<{
		key: string;
		label: React.ReactNode;
		children: React.ReactNode;
	}>;
}

const tabContentVariants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
};

export function Tabs({ items, ...props }: TabsProps) {
	const [activeKey, setActiveKey] = useState(items[0]?.key || '');

	return (
		<AntTabs
			{...props}
			activeKey={activeKey}
			onChange={setActiveKey}
			items={items.map((item) => ({
				...item,
				children: (
					<motion.div
						key={item.key}
						initial="hidden"
						animate="visible"
						variants={tabContentVariants}
						transition={{
							duration: 0.3,
							ease: 'easeOut',
						}}
					>
						{item.children}
					</motion.div>
				),
			}))}
		/>
	);
}

