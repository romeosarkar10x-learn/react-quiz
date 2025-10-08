import { IQuestion } from "./IQuestion.ts";

export interface IQuiz {
    questions: IQuestion[];
    topic: string;
    id: string;
}
