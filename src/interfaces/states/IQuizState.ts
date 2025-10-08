import { QuizState } from "../../enums/QuizState.ts";
import { IQuestion } from "../IQuestion.ts";
import { State } from "../../utilities/StateMachine.ts";
// import { QuizState } from "../../enums/QuizState.ts";

/*
export interface IQuizState {
    type: (typeof QuizState)[keyof typeof QuizState];
}
*/

type IQuizState = State<typeof QuizState>;

export interface IQuizState_Loading extends IQuizState {
    sType: typeof QuizState.LOADING;
}

export interface IQuizState_Error extends IQuizState {
    sType: typeof QuizState.ERROR;
}

export interface IQuizState_Ready extends IQuizState {
    sType: typeof QuizState.READY;
    questions: IQuestion[];
}

export interface IQuizState_Started extends IQuizState {
    sType: typeof QuizState.START;
    questions: IQuestion[];
    indexQuestion: number;
    // numCorrectAnswers: number;
    numQuestionsAnswered: number;
    userAnswersIndex: (number | undefined)[];
    // maxIndexOfQuestion: number;
    // maxIndexOfQuestionAnswered: number;
}

export interface IQuizState_Ended extends IQuizState {
    sType: typeof QuizState.END;
    questions: IQuestion[];
    indexQuestion: number;
    numCorrectAnswers: number;
    numQuestionsAnswered: number;
    userAnswersIndex: (number | undefined)[];
    // maxIndexOfQuestion: number;
    // maxIndexOfQuestionAnswered: number;
}

export interface IQuizState_Review extends IQuizState {
    sType: typeof QuizState.REVIEW;
    questions: IQuestion[];
    indexQuestion: number;
    numCorrectAnswers: number;
    numQuestionsAnswered: number;
    userAnswersIndex: (number | undefined)[];
    // maxIndexOfQuestion: number;
    // maxIndexOfQuestionAnswered: number;
}

export type IQuizStates =
    | IQuizState_Loading
    | IQuizState_Error
    | IQuizState_Ready
    | IQuizState_Started
    | IQuizState_Ended
    | IQuizState_Review;

/*
 */
