export type Filter = {
    id: number,
    name: string,
    slug: string,
    options: FilterOption[]
}

export type FilterOption = {
    id: number,
    name: string,
    slug: string,
    selected: boolean
}