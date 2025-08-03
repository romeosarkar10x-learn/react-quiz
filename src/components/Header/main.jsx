import "./main.scss";
import Logo from "./Logo/main.jsx";

function Header() {
    return (
        <header className="component_header">
            <Logo />
            <h1>React quiz</h1>
            <Logo />
        </header>
    );
}

export default Header;
