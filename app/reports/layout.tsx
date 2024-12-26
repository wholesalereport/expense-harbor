import {PropsWithChildren} from "react";
import {MainMenu} from "@/src/components/navbar";
import {BentoBox} from "@/src/components/bento-box";
import {ReportsLayoutProvider} from "@/src/contexts/reports-context";

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <ReportsLayoutProvider>
            <div className={""}>
                <MainMenu/>
                <div>
                    {children}
                </div>
            </div>
        </ReportsLayoutProvider>
    )

}

//max-w-2xl px-6 lg:max-w-7xl lg:px-8


/*
<p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                                Mobile friendly
                            </p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                                commodo.
                            </p>
 */