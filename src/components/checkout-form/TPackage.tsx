export type TPackage = {
    id: string | undefined;
    title: string;
    description: string;
    displayAmount: string;
    amount: string | number;
    disabled: (totalItems?: number) => boolean;
    upperLimit: number;
    lowerLimit: number;
}