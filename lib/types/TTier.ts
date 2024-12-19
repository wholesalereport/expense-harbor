export type TTier = {
    id?: string | undefined;
    amount?: number;
    lowerLimit?: number | undefined;
    upperLimit?: number | undefined;
    title?:string;
    description?:string;
    displayAmount?: string;
    disabled?:boolean | (() => boolean) ;

}
