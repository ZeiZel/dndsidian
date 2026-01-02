import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface SidebarContextType {
	isDesktopSidebarOpen: boolean;
	toggleDesktopSidebar: () => void;
	setDesktopSidebarOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }): ReactNode {
	const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);

	const toggleDesktopSidebar = () => {
		setIsDesktopSidebarOpen((prev) => !prev);
	};

	const setDesktopSidebarOpen = (open: boolean) => {
		setIsDesktopSidebarOpen(open);
	};

	return (
		<SidebarContext.Provider
			value={{
				isDesktopSidebarOpen,
				toggleDesktopSidebar,
				setDesktopSidebarOpen,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebarContext(): SidebarContextType {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error('useSidebarContext must be used within a SidebarProvider');
	}
	return context;
}

