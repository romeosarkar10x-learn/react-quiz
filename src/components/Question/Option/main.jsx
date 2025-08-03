import "./main.scss";

const STATE = {
    none: 0,
    correct: 1,
    incorrect: 2,
};

export { STATE };

export default function Option({ i, state, text, reason, onClick, questionAnswered }) {
    let className = "component_option";

    switch (state) {
        case STATE.correct:
            className += " correct";
            break;

        case STATE.incorrect:
            className += " incorrect";
            break;

        default:
            break;
    }

    /*
    if (questionAnswered) {
        className += " answered";
    }
        */

    return (
        <button
            className={className}
            onClick={questionAnswered ? () => {} : onClick}>
            <span>{String.fromCodePoint("A".codePointAt(0) + i)}. </span>
            <span>{text}</span>

            {state != STATE.none && <p className="reason">{reason}</p>}
        </button>
    );
}
