export function Hint({ text }) {
    return (
        <details className="component_hint">
            <summary>Show hint v</summary>
            <p>{text}</p>
        </details>
    );
}
