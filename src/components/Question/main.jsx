import "./main.scss";
import Option from "./Option/main.jsx";
import Button from "../Button/index.jsx";
import { STATE as OPTION_STATE } from "./Option/main.jsx";
import { useState } from "react";

const QUESTION_STATE = {
    unanswered: 0,
    answered: 1,
    answerRevealed: 2,
};

export default function Question({ question, i, next }) {
    const [{ state, answer }, setState] = useState({ state: QUESTION_STATE.unanswered });

    if (i == null) {
        i = "{i}";
    }

    function getOptionState(option, i, questionState, answer) {
        if (questionState !== QUESTION_STATE.unanswered) {
            if (option.isCorrect) {
                return OPTION_STATE.correct;
            }

            if (questionState === QUESTION_STATE.answered) {
                if (answer === i) {
                    return OPTION_STATE.incorrect;
                }
            }
        }

        return OPTION_STATE.none;
    }

    return (
        <div className="component_question">
            <div className="question">
                <span>{(i + 1).toString()}. </span>
                <span>{question.question}</span>
            </div>

            {question.options.map((option, i) => (
                <Option
                    i={i}
                    key={i}
                    text={option.text}
                    onClick={() => {
                        setState({ state: QUESTION_STATE.answered, answer: i });
                    }}
                    state={getOptionState(option, i, state, answer)}
                    reason={option.reason}
                    questionAnswered={state === QUESTION_STATE.answered}
                />
            ))}

            {state != QUESTION_STATE.unanswered && <Button onClick={next}>Next</Button>}
        </div>
    );
}
