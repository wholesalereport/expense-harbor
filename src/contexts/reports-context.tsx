'use client';
import React, { createContext, useContext, useState } from 'react';
import {NAVIGATION_IDS,REPORT_ID} from "@/constants/reports";



type NavigationId = keyof typeof NAVIGATION_IDS;

// Define the context type
type ReportsLayoutContextType = {
    navId: NavigationId;
    setNavId: React.Dispatch<React.SetStateAction<NavigationId>>;
};

const ReportsLayoutContext = createContext<ReportsLayoutContextType>(null);


export const ReportsLayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [navId,setNavId] = useState<NavigationId>(REPORT_ID);

    return (
        <ReportsLayoutContext.Provider value={{navId,setNavId}}>
            {children}
        </ReportsLayoutContext.Provider>
    );
};

export const useRootLayout = () => useContext(ReportsLayoutContext);