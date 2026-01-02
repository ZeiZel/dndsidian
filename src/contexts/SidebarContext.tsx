import { createContext, useContext } from 'react';

export interface SidebarContextType {
	isSidebarHidden: boolean;
	toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebarContext(): SidebarContextType {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebarContext must be used within SidebarProvider');
	}
	return context;
}

