import { QuizEvent } from "../../enums/QuizEvent.ts";
import { IQuestion } from "../IQuestion.ts";
import { Event } from "src/utilities/StateMachine.ts";

/*
export interface IQuizEvent {
    type: (typeof QuizEvent)[keyof typeof QuizEvent];
}
    */

type IQuizEvent = Event<typeof QuizEvent>;

export interface IQuizEvent_ReceivedData extends IQuizEvent {
    eType: typeof QuizEvent.RECEIVED_DATA;
    questions: IQuestion[];
}

export interface IQuizEvent_FailedToReceiveData extends IQuizEvent {
    eType: typeof QuizEvent.FAILED_RECEIVING_DATA;
}

export interface IQuizEvent_StartQuiz extends IQuizEvent {
    eType: typeof QuizEvent.START_QUIZ;
}

export interface IQuizEvent_GoToPreviousQuestion extends IQuizEvent {
    eType: typeof QuizEvent.GO_TO_PREVIOUS_QUESTION;
}

export interface IQuizEvent_GoToNextQuestion extends IQuizEvent {
    eType: typeof QuizEvent.GO_TO_NEXT_QUESTION;
}

export interface IQuizEvent_FinishQuiz extends IQuizEvent {
    eType: typeof QuizEvent.FINISH_QUIZ;
}

export interface IQuizEvent_AnswerQuestion extends IQuizEvent {
    eType: typeof QuizEvent.ANSWER_QUESTION;
    ansIndex: number;
}

export interface IQuizEvent_ReviewQuiz extends IQuizEvent {
    eType: typeof QuizEvent.REVIEW_QUIZ;
}

export type IQuizEvents =
    | IQuizEvent_ReceivedData
    | IQuizEvent_FailedToReceiveData
    | IQuizEvent_StartQuiz
    | IQuizEvent_GoToPreviousQuestion
    | IQuizEvent_GoToNextQuestion
    | IQuizEvent_AnswerQuestion
    | IQuizEvent_FinishQuiz
    | IQuizEvent_ReviewQuiz;
