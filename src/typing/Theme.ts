export enum ThemeColorType {
    main = "main",
    sora = "sora",
    grey = "grey",
    pinkLight = "pinkLight",
    purple = "purple"
}

export const themeColorMap: { [type: string]: string } = {
    [ThemeColorType.main]: "#000",
    [ThemeColorType.sora]: "#85BBD4",
    [ThemeColorType.grey]: "#515558",
    [ThemeColorType.pinkLight]: "#C2B0BB",
    [ThemeColorType.purple]: "#8a778a",
}
