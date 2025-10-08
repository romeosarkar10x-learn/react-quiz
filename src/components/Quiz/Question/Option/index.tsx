import "./index.scss";
import type { IOption } from "../../../../interfaces/IOption.ts";
import { ActionDispatch, MouseEventHandler } from "react";

import { OptionState } from "../../../../enums/OptionState.js";
import type { ValueOf } from "../../../../utilities/Type.ts";
import { QuizState } from "../../../../enums/QuizState.ts";
import { QuizEvent } from "../../../../enums/QuizEvent.ts";
import type { IQuizEvents } from "../../../../interfaces/events/IQuizEvent.ts";

export default function Option({
    isSelected,
    isCorrect,
    option,
    index,
    quizState,
    dispatch,
}: {
    isSelected: boolean;
    isCorrect: boolean;
    option: IOption;
    index: number;
    quizState: typeof QuizState.START | typeof QuizState.REVIEW;
    dispatch: ActionDispatch<[IQuizEvents]>;
}) {
    let className = "component_option";

    /*
    switch (state) {
        case OptionState.SELECTED:
            className += " selected";

        case OptionState.CORRECT:
            className += " correct";
            break;

        case OptionState.INCORRECT:
            className += " incorrect";
            break;

        default:
            break;
    }
            */

    if (isSelected) {
        className += " selected";
    }

    if (quizState === QuizState.REVIEW) {
        className += isCorrect ? " correct" : " incorrect";
    }

    if (quizState === QuizState.START) {
        className += " pointer";
    }
    /*
    if (questionAnswered) {
        className += " answered";
    }
        */

    return (
        <button
            className={className}
            onClick={
                quizState === QuizState.START
                    ? () => {
                          dispatch({ eType: QuizEvent.ANSWER_QUESTION, ansIndex: index });
                      }
                    : () => {}
            }>
            <span>{String.fromCodePoint(65 + index)}. </span>
            <span>{option.text}</span>

            {quizState === QuizState.REVIEW && typeof option.reason === "string" && option.reason.length > 0 && (
                <p className="reason">{option.reason}</p>
            )}
        </button>
    );
}
