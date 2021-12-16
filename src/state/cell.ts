export type CellType = 'Code' | 'text';

export interface Cell {
    id: string;
    type: CellType;
    content: string;
}