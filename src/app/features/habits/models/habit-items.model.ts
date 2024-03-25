import { HabitItem } from "./habit-item.model";

export interface HabitItems {
    [key: string]: HabitItemByDate;
}

interface HabitItemByDate {
    [key: string]: HabitItem;
}