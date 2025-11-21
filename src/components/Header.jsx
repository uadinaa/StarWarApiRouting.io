import { Link } from "react-router-dom";
import { BsFilePerson } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import '../styles/Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="home-link">
                    <h1 className="header-title">Star War characters</h1>
                </Link>
            </div>

            <nav className="header-nav">
                <Link to="/products" className="header-link">
                    <BsFilePerson className="icon" /> characters
                </Link>
                <Link to="/create-product" className="header-link">
                    <AiOutlinePlus className="icon" /> creating character
                </Link>
            </nav>
        </header>
    );
}
