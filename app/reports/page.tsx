import {BentoBox} from "@/src/components/bento-box";

import ReportsNavigation from "@/src/components/reports/ReportsNavigation";
import ReportsBody from "@/src/components/reports/ReportsBody";



export default function Reports() {
    return (
        <>
            <div className="relative lg:row-span-1">
                <BentoBox id={"section-one"}>
                    <ReportsNavigation />
                </BentoBox>
            </div>
            <div className="relative max-lg:row-start-2 lg:col-span-2">
                <BentoBox id={"section-two"}>
                    <ReportsBody />
                </BentoBox>
            </div>

        </>
    )
}