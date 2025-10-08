import "./index.scss";
import Option from "./Option/index.tsx";
import QuestionNav from "./QuestionNav/index.tsx";

import { OptionState } from "../../../enums/OptionState.ts";
// import { useState } from "react";
import type { ValueOf } from "../../../utilities/Type.ts";

import { QuestionState } from "../../../enums/QuestionState.ts";
import { QuizEvent } from "../../../enums/QuizEvent.ts";
import { IQuestion } from "../../../interfaces/IQuestion.ts";
import { IQuizEvents } from "../../../interfaces/events/IQuizEvent.ts";
import { ActionDispatch } from "react";
import { QuizState } from "../../../enums/QuizState.ts";
// import { IOption } from "src/interfaces/IOption.ts";

export default function Question({
    question,
    quizState,
    userAnsIndex,
    state,
    index,
    totalNumQuestions,
    dispatch,
}: {
    question: IQuestion;
    quizState: typeof QuizState.START | typeof QuizState.REVIEW;
    state: ValueOf<typeof QuestionState>;
    index: number;
    userAnsIndex: number | undefined;
    totalNumQuestions: number;
    dispatch: ActionDispatch<[IQuizEvents]>;
}) {
    function getOptionState(
        optionIndex: number,
        questionState: ValueOf<typeof QuestionState>,
        ansIndex: number,
        userAnsIndex: number | undefined,
    ) {
        // console.log(ansIndex, index);
        if (questionState === QuestionState.ANSWER_REVEALED) {
            return ansIndex === optionIndex ? OptionState.CORRECT : OptionState.INCORRECT;
        }

        if (questionState === QuestionState.ANSWERED && userAnsIndex === optionIndex) {
            return OptionState.SELECTED;
        }

        return OptionState.NONE;
    }

    return (
        <div className="component_question">
            <div className="question">
                <span>{(index + 1).toString()}. </span>
                <span>{question.text}</span>
            </div>

            {question.options.map((option, index) => (
                <Option
                    index={index}
                    key={index}
                    option={option}
                    dispatch={dispatch}
                    quizState={quizState}
                    isSelected={userAnsIndex === index}
                    isCorrect={question.ansIndex === index}
                    // state={getOptionState(index, state, question.ansIndex, userAnsIndex)}
                />
            ))}
            <QuestionNav
                quizState={quizState}
                isFirstQuestion={index === 0}
                isLastQuestion={index === totalNumQuestions - 1}
                dispatch={dispatch}
            />
        </div>
    );
}
