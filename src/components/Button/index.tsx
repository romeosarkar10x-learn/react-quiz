import "./index.scss";

export default function Button({
    children,
    onClick,
    className,
}: {
    children: string;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            className={"component_button" + (className ? " " + className : "")}
            onClick={onClick}>
            {children}
        </button>
    );
}
