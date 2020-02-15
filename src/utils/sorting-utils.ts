interface IName {
    name: string
}

interface IDate {
    date: string
}

interface IAmount {
    amount: number
}

interface IPaid {
    paid: boolean
}

export const sortByName = (a: IName, b: IName): number => a.name < b.name ? -1 : 1;

export const sortByDate = (a: IDate, b: IDate): number => a.date > b.date ? -1 : 1;

export const sortByAmount = (a: IAmount, b: IAmount): number => a.amount > b.amount ? -1 : 1;

export const sortByPaid = (a: IPaid, b: IPaid): number => {
    if (a.paid !== b.paid) {
        return a.paid ? 1 : -1;
    }

    return 0;
};
