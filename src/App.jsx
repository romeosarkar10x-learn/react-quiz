import { useEffect, useReducer } from "react";
import Header from "./components/Header/main.jsx";
import Loader from "./components/Loader/main.jsx";
import Start from "./components/Start/index.jsx";
import Question from "./components/Question/main.jsx";

const STATUS = {
    none: 0,
    loading: 1,
    error: 2,
    ready: 3,
    active: 4,
    finished: 5,
};

const ACTION = {
    dataReceived: 0,
    dataFailed: 1,
    start: 2,
    nextQuestion: 3,
};

function Main() {
    const initialState = {
        // questions: [],
        status: STATUS.none,
    };

    const [{ status, questions, i }, dispatch] = useReducer(function reducer(state, action) {
        switch (action.type) {
            case ACTION.dataReceived:
                console.log("dataReceived", action.payload);
                return {
                    ...state,
                    questions: action.payload,
                    status: STATUS.ready,
                };
            case ACTION.dataFailed:
                return {
                    ...state,
                    // questions: action.payload,
                    status: STATUS.error,
                };

            case ACTION.start:
                return {
                    ...state,
                    status: STATUS.active,
                    i: 0,
                };

            case ACTION.nextQuestion:
                return {
                    ...state,
                    i: state.i + 1,
                };
            default:
                throw Error("Invalid Case!");
        }
    }, initialState);

    useEffect(function () {
        (async function () {
            // dispatch({ type: ACTION.})
            try {
                const res = await fetch(import.meta.env.BASE_URL + "/questions.json");
                const resObj = await res.json();
                // console.log(resObj);
                dispatch({ type: ACTION.dataReceived, payload: resObj.questions });
            } catch {
                dispatch({ type: ACTION.dataFailed });
            }
        })();
    }, []);

    /*
    function nextQuestion() {
        dispatch({ type: ACTION.nextQuestion });
    }
        */

    return (
        <main className="main">
            {status === STATUS.loading ? (
                <Loader />
            ) : status === STATUS.ready ? (
                <Start
                    n={questions.length}
                    topic="React"
                    onClick={() => dispatch({ type: ACTION.start })}
                />
            ) : status === STATUS.error ? (
                <Error />
            ) : status === STATUS.active ? (
                <Question
                    i={i}
                    key={i}
                    question={questions[i]}
                    next={function nextQuestion() {
                        dispatch({ type: ACTION.nextQuestion });
                    }}
                />
            ) : (
                <p>INVALID STATUS</p>
            )}
        </main>
    );
}

export default function App() {
    return (
        <div className="app">
            <Header />
            <Main />
        </div>
    );
}
