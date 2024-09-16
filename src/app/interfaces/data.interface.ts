interface Data {
    id: string;
    date: string;
    override?: boolean;
}

export interface RawData extends Data {
    rawValue: number;
}

export interface FilteredData extends Data {
    filteredValue: number;
}