import { IOption } from "./IOption.ts";

export interface IQuestion {
    text: string;
    hint: string;
    options: IOption[];
    ansIndex: number;
}
