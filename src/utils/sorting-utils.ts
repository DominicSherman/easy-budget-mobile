interface IName {
    name: string
}

interface IDate {
    date: string
}

export const sortByName = (a: IName, b: IName): number => a.name < b.name ? -1 : 1;

export const sortByDate = (a: IDate, b: IDate): number => a.date > b.date ? -1 : 1;
