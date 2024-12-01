'use client';
import React, { createContext, useContext, useState } from 'react';
import {NAVIGATION_IDS,REPORT_ID} from "@/constants/reports";



export type NavigationId = keyof typeof NAVIGATION_IDS;

// Define the context type
type ReportsLayoutContextType = {
    navId?: NavigationId | null;
    setNavId?: React.Dispatch<React.SetStateAction<NavigationId>>;
};

const ReportsLayoutContext = createContext<ReportsLayoutContextType>({
    navId: null, // Or provide an initial value
    setNavId: () => {}
});


export const ReportsLayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [navId,setNavId] = useState<NavigationId>(REPORT_ID);

    return (
        <ReportsLayoutContext.Provider value={{navId,setNavId}}>
            {children}
        </ReportsLayoutContext.Provider>
    );
};

export const useRootLayout = () => useContext(ReportsLayoutContext);