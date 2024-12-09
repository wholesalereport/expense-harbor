export type TPackage = {
    id: string,
    title: string,
    description: string,
    disabled: (totalNumber: number) => boolean,
    displayAmount: string
    upperLimit: string | number
}