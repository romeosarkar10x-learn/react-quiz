import {
    IQuizState_Loading,
    IQuizState_Error,
    IQuizState_Ready,
    IQuizState_Started,
    IQuizState_Ended,
    IQuizState_Review,
} from "../interfaces/states/IQuizState.ts";

import {
    IQuizEvent_ReceivedData,
    IQuizEvent_FailedToReceiveData,
    IQuizEvent_StartQuiz,
    IQuizEvent_AnswerQuestion,
    IQuizEvent_GoToPreviousQuestion,
    IQuizEvent_GoToNextQuestion,
    IQuizEvent_FinishQuiz,
    IQuizEvent_ReviewQuiz,
} from "../interfaces/events/IQuizEvent.ts";

import { QuizState } from "./QuizState.ts";
import { QuizEvent } from "./QuizEvent.ts";

export const QuizTransitions = {
    [QuizState.LOADING]: {
        [QuizEvent.RECEIVED_DATA]: function (
            state: IQuizState_Loading,
            event: IQuizEvent_ReceivedData,
        ): IQuizState_Ready {
            return {
                ...state,
                sType: QuizState.READY,
                questions: event.questions,
            };
        },

        [QuizEvent.FAILED_RECEIVING_DATA]: function (
            state: IQuizState_Loading,
            _event: IQuizEvent_FailedToReceiveData,
        ): IQuizState_Error {
            return {
                ...state,
                sType: QuizState.ERROR,
            };
        },
    },

    [QuizState.READY]: {
        [QuizEvent.START_QUIZ]: function (state: IQuizState_Ready, _event: IQuizEvent_StartQuiz): IQuizState_Started {
            return {
                ...state,
                sType: QuizState.START,
                indexQuestion: 0,
                // numCorrectAnswers: 0,
                numQuestionsAnswered: 0,
                userAnswersIndex: new Array(state.questions.length),
            };
        },
    },

    [QuizState.START]: {
        [QuizEvent.ANSWER_QUESTION]: function (
            state: IQuizState_Started,
            event: IQuizEvent_AnswerQuestion,
        ): IQuizState_Started {
            let numQuestionsAnswered = state.numQuestionsAnswered;
            const userAnswersIndex = [...state.userAnswersIndex];

            if (
                userAnswersIndex[state.indexQuestion] != null &&
                userAnswersIndex[state.indexQuestion] === event.ansIndex
            ) {
                userAnswersIndex[state.indexQuestion] = undefined;
                numQuestionsAnswered--;
            } else {
                if (userAnswersIndex[state.indexQuestion] == null) {
                    numQuestionsAnswered++;
                }
                userAnswersIndex[state.indexQuestion] = event.ansIndex;
            }

            return {
                ...state,
                userAnswersIndex,
                numQuestionsAnswered,
            };
        },

        [QuizEvent.GO_TO_PREVIOUS_QUESTION]: function (
            state: IQuizState_Started,
            _: IQuizEvent_GoToPreviousQuestion,
        ): IQuizState_Started {
            return {
                ...state,
                indexQuestion: state.indexQuestion - 1,
            };
        },

        [QuizEvent.GO_TO_NEXT_QUESTION]: function (
            state: IQuizState_Started,
            _event: IQuizEvent_GoToNextQuestion,
        ): IQuizState_Started {
            return {
                ...state,
                indexQuestion: state.indexQuestion + 1,
            };
        },

        [QuizEvent.FINISH_QUIZ]: function (state: IQuizState_Started, _event: IQuizEvent_FinishQuiz): IQuizState_Ended {
            return {
                ...state,
                sType: QuizState.END,
                numCorrectAnswers: state.questions
                    .map((question, index): number => {
                        return question.ansIndex === state.userAnswersIndex[index] ? 1 : 0;
                    })
                    .reduce((a, b) => a + b),
            };
        },
    },
    [QuizState.END]: {
        [QuizEvent.REVIEW_QUIZ]: function (state: IQuizState_Ended, _event: IQuizEvent_ReviewQuiz): IQuizState_Review {
            return {
                ...state,
                sType: QuizState.REVIEW,
                indexQuestion: 0,
            };
        },
    },
    [QuizState.REVIEW]: {
        [QuizEvent.GO_TO_PREVIOUS_QUESTION]: function (
            state: IQuizState_Review,
            _event: IQuizEvent_GoToPreviousQuestion,
        ): IQuizState_Review {
            return {
                ...state,
                indexQuestion: state.indexQuestion - 1,
            };
        },
        [QuizEvent.GO_TO_NEXT_QUESTION]: function (
            state: IQuizState_Review,
            _event: IQuizEvent_GoToNextQuestion,
        ): IQuizState_Review {
            return {
                ...state,
                indexQuestion: state.indexQuestion + 1,
            };
        },
    },
} as const;
