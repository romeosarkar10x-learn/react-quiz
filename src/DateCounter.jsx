import { useState, useReducer } from "react";

function DateCounter() {
    function reducer(state, action) {
        switch (action.type) {
            case "inc":
                return state + action.payload;
            case "dec":
                return state - action.payload;
            case "set":
                return action.payload;
        }
    }

    const [count, dispatch] = useReducer(reducer, 0);
    const [step, setStep] = useState(1);

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec", payload: 1 });
    };

    const inc = function () {
        dispatch({ type: "inc", payload: 1 });
    };

    function set(event) {
        dispatch({ type: "set", payload: Number(event.target.value) });
        event.preventDefault();
    }

    const reset = function () {
        setStep(1);
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onInput={event => {
                        setStep(parseInt(event.target.value));
                        event.preventDefault();
                    }}
                    step="1"
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input
                    value={count}
                    onInput={set}
                />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
