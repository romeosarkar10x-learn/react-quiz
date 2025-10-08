import "./index.scss";
import Button from "../../Button/index.tsx";
import { QuizEvent } from "../../../enums/QuizEvent.ts";
import { IQuizEvents } from "../../../interfaces/events/IQuizEvent.ts";
import { ActionDispatch } from "react";

export default function Result({
    dispatch,
    numCorrectAnswers,
    totalNumQuestions,
}: {
    dispatch: ActionDispatch<[IQuizEvents]>;
    numCorrectAnswers: number;
    totalNumQuestions: number;
}) {
    return (
        <div className="component_result">
            <p>
                You scored {numCorrectAnswers} / {totalNumQuestions}
            </p>
            <Button
                onClick={() => {
                    dispatch({ eType: QuizEvent.REVIEW_QUIZ });
                }}>
                Review
            </Button>
        </div>
    );
}
