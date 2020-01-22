interface IName {
    name: string
}

export const sortByName = (a: IName, b: IName): number => a.name < b.name ? -1 : 1;
