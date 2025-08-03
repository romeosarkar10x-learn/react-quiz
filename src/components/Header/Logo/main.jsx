import "./main.scss";

export default function Logo() {
    return (
        <img
            className="component_logo"
            src={import.meta.env.BASE_URL + "/logo.png"}
            alt="Logo"
        />
    );
}
