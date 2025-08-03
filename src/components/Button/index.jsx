import "./index.scss";

export default function Button({ onClick, children }) {
    return (
        <button
            className="component_button"
            onClick={onClick}>
            {children}
        </button>
    );
}
