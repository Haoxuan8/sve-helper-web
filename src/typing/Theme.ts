export enum ThemeColorType {
    main = "main",
    sora = "sora",
    grey = "grey",
}

export const themeColorMap: { [type: string]: string } = {
    [ThemeColorType.main]: "#000",
    [ThemeColorType.sora]: "#58B2DC",
    [ThemeColorType.grey]: "#515558"
}
