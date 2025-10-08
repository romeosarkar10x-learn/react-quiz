import { ActionDispatch, useEffect, useReducer } from "react";

import Question from "./Question/index.tsx";
import ProgressBar from "./ProgressBar/index.tsx";

import Loader from "../Loader/index.tsx";
import Start from "../Start/index.tsx";
import ErrorComp from "./ErrorComp/index.tsx";

import { QuestionState } from "../../enums/QuestionState.ts";

import { QuizEvent } from "../../enums/QuizEvent.ts";
// import { IQuizEvent } from "../../interfaces/events/IQuizEvent.ts";

import { QuizState } from "../../enums/QuizState.ts";
// import { IQuizState } from "../../interfaces/states/IQuizState.ts";

import { QuizTransitions } from "../../enums/QuizTransition.ts";
import { StateMachine } from "../../utilities/StateMachine.ts";
import type { UnionToTupleT } from "../../utilities/StateMachine.ts";
import { IQuestion } from "src/interfaces/IQuestion.ts";
import Result from "./Result/index.tsx";

import { IQuizStates } from "../../interfaces/states/IQuizState.ts";
import { IQuizEvents } from "../../interfaces/events/IQuizEvent.ts";

export default function Quiz() {
    function reducer(state: IQuizStates, event: IQuizEvents): IQuizStates {
        const transitionFunction = (QuizTransitions as any)[state.sType]?.[event.eType];
        // console.log(state.sType, event.eType, transitionFunction);

        if (transitionFunction == null) {
            throw new Error(`No transition defined for state: ${state.sType}, event: ${event.eType}`);
        }

        return transitionFunction(state, event);
    }

    const [quiz, dispatch]: [IQuizStates, ActionDispatch<[IQuizEvents]>] = useReducer(reducer, {
        sType: QuizState.LOADING,
    });

    useEffect(function () {
        (async function () {
            try {
                const res = await fetch(import.meta.env.BASE_URL + "/questions.json");
                const resObj = await res.json();

                dispatch({ eType: QuizEvent.RECEIVED_DATA, questions: resObj.questions });
            } catch {
                dispatch({ eType: QuizEvent.FAILED_RECEIVING_DATA });
            }
        })();
    }, []);

    return (
        <div className="component_quiz">
            {quiz.sType === QuizState.LOADING ? (
                <Loader />
            ) : quiz.sType === QuizState.READY ? (
                <Start
                    numQuestions={quiz.questions.length}
                    topic="React"
                    onClick={() => dispatch({ eType: QuizEvent.START_QUIZ })}
                />
            ) : quiz.sType === QuizState.ERROR ? (
                <ErrorComp />
            ) : quiz.sType === QuizState.START || quiz.sType === QuizState.REVIEW ? (
                <>
                    {quiz.sType === QuizState.START ? (
                        <ProgressBar
                            current={quiz.numQuestionsAnswered}
                            total={quiz.questions.length}
                        />
                    ) : (
                        <></>
                    )}
                    <Question
                        index={quiz.indexQuestion}
                        quizState={quiz.sType}
                        userAnsIndex={quiz.userAnswersIndex[quiz.indexQuestion] as number}
                        totalNumQuestions={quiz.questions.length}
                        state={
                            quiz.sType === QuizState.START
                                ? quiz.userAnswersIndex[quiz.indexQuestion] == null
                                    ? QuestionState.UNANSWERED
                                    : QuestionState.ANSWERED
                                : QuestionState.ANSWER_REVEALED
                        }
                        key={quiz.indexQuestion}
                        question={quiz.questions[quiz.indexQuestion] as IQuestion}
                        dispatch={dispatch}
                    />
                </>
            ) : quiz.sType === QuizState.END ? (
                <Result
                    totalNumQuestions={quiz.questions.length}
                    numCorrectAnswers={quiz.numCorrectAnswers}
                    dispatch={dispatch}
                />
            ) : (
                <p>Invalid {`{quizState}`}</p>
            )}
        </div>
    );

    // return <div></div>;
}
