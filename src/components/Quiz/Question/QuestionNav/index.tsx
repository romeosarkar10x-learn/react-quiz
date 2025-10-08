import "./index.scss";

import { QuizState } from "../../../../enums/QuizState.ts";
import { ActionDispatch } from "react";
import type { IQuizEvents } from "../../../../interfaces/events/IQuizEvent.ts";
import Button from "../../../Button/index.tsx";
import { QuizEvent } from "../../../../enums/QuizEvent.ts";
import { QuestionState } from "../../../../enums/QuestionState.ts";
import { ValueOf } from "../../../../utilities/Type.ts";

export default function QuestionNav({
    quizState,
    isFirstQuestion,
    isLastQuestion,
    dispatch,
}: {
    quizState: typeof QuizState.START | typeof QuizState.REVIEW;
    isLastQuestion: boolean;
    isFirstQuestion: boolean;
    dispatch: ActionDispatch<[IQuizEvents]>;
}) {
    console.log("quizState:", quizState);
    return (
        <nav className="component_question-nav">
            {!isFirstQuestion && (
                <Button
                    className="previous"
                    onClick={function () {
                        dispatch({ eType: QuizEvent.GO_TO_PREVIOUS_QUESTION });
                    }}>
                    Previous
                </Button>
            )}
            {isLastQuestion ? (
                quizState === QuizState.START ? (
                    <Button
                        className="finish"
                        onClick={function () {
                            dispatch({
                                eType: QuizEvent.FINISH_QUIZ,
                            });
                        }}>
                        Finish
                    </Button>
                ) : (
                    <></>
                )
            ) : (
                <Button
                    className="next"
                    onClick={function () {
                        dispatch({
                            eType: QuizEvent.GO_TO_NEXT_QUESTION,
                        });
                    }}>
                    Next
                </Button>
            )}
        </nav>
    );
}
