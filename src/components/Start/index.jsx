import "./index.scss";
import Button from "../Button/index.jsx";

export default function Start({ n, topic, onClick }) {
    n = n || "{n}";
    topic = topic || "{topic}";

    return (
        <section className="component_start">
            <p>😊 Welcome to `{topic}` quiz.</p>
            <p>
                There are {n} questions to test your `{topic}` mastery.
            </p>
            <Button onClick={onClick}>Start quiz</Button>
        </section>
    );
}
