import "./index.scss";
import Button from "../Button/index.tsx";

export default function Start({
    numQuestions,
    topic,
    onClick,
}: {
    numQuestions: number;
    topic: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
    // numQuestions
    // topic = topic || "{topic}";

    return (
        <section className="component_start">
            <p>😊 Welcome to `{topic}` quiz.</p>
            <p>
                There are {numQuestions} questions to test your `{topic}` mastery.
            </p>
            <Button onClick={onClick}>Start quiz</Button>
        </section>
    );
}
