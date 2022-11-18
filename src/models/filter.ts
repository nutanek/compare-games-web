export type Filter = {
    id: number,
    name: string,
    name_th: string;
    slug: string,
    options: FilterOption[]
}

export type FilterOption = {
    id: number,
    name: string,
    name_th: string;
    slug: string,
    selected: boolean
}