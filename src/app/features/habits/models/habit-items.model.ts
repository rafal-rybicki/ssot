import { HabitItem } from "./habit-item.model";

export interface HabitItems {
    [habitId: number]: HabitItemByDate;
}

export interface HabitItemByDate {
    [date: string]: HabitItem;
}