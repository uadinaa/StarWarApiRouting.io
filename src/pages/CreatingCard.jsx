import React from 'react';
import "../styles/CreatingCard.css"
import {useNavigate} from "react-router-dom";

export default function CreatingCard() {
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        name: "",
        birth_year: "",
        gender: "",
        height: "",
        mass: "",
        skin_color: "",
        hair_color: "",
        eye_color: "",
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = "local-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

        const newCharacter = {
            ...form,
            id,
            url: null,
        };

        const existing = JSON.parse(localStorage.getItem("newCharacter") || "[]");
        localStorage.setItem("newCharacter", JSON.stringify([...existing, newCharacter]));

        console.log("newCharacters:" + JSON.stringify(newCharacter));
        console.log("newCharacters form:" + JSON.stringify(form));

        navigate(`/products/${id}`);
    };

    return (
        <form onSubmit={handleSubmit} className="creating-card" >
            <h2 className="naming-card">Create new character</h2>
            <input
                className="input-name"
                placeholder="name"
                name="name"
                value={form.name}
                onChange={handleChange} />
            <input
                className="input-birth_year"
                placeholder="birth year"
                name="birth_year"
                value={form.birth_year}
                onChange={handleChange} />
            <input
                className="input-gender"
                placeholder="gender"
                name="gender"
                value={form.gender}
                onChange={handleChange} />
            <input
                className="input-height"
                placeholder="height"
                name="height"
                value={form.height}
                onChange={handleChange} />
            <input
                className="input-mass"
                placeholder="mass"
                name="mass"
                value={form.mass}
                onChange={handleChange} />
            <input
                className="input-skin_color"
                placeholder="skin color"
                name="skin_color"
                value={form.skin_color}
                onChange={handleChange} />
            <input
                className="input-hair_color"
                placeholder="hair color of a character"
                name="hair_color"
                value={form.hair_color}
                onChange={handleChange} />
            <input
                className="input-eye_color"
                placeholder="eye color of a character"
                name="eye_color"
                value={form.eye_color}
                onChange={handleChange} />

            <button className="submitButton" onClick={handleSubmit}>create the magic</button>
        </form>
    );
}
