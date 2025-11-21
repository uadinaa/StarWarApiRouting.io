import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getById} from "../services/itemsService.js";
import { GoArrowLeft } from "react-icons/go";
import '../styles/CardDetails.css'


export default function CharacterDetails() {
    const {id} = useParams();
    const [character, setCharacter] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [films, setFilms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                if (!id) {
                    throw new Error("No id provided");
                }

                if (id.startsWith("local-")) {
                    const saved = JSON.parse(localStorage.getItem("newCharacter") || "[]");
                    const found = saved.find((c) => c.id === id);
                    if (!found) throw new Error("Local character not found");
                    if (mounted) setCharacter(found);
                } else {
                    const json = await getById(id);
                    if (mounted) setCharacter(json.data || json);
                }

            } catch (err) {
                if (mounted) setError(err.message || "Failed to load character");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => { mounted = false; };
    }, [id]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>error {error.message}</p>;
    if(!character) return <p>character is not found</p>;

    return (
        <section className="character-details">
            <button className="back-button" onClick={() => navigate(-1) || navigate("/products")}>
                <GoArrowLeft className="icon" /> Back
            </button>

            <h2 className="character-name">{character.name}</h2>
            <h3 className="birth_year"> birth year: {character.birth_year}</h3>
            <h3 className="gender">gender: {character.gender}</h3>

            <div className="characterictic">
                <p><strong>height:</strong> {character.height}</p>
                <p><strong>mass:</strong> {character.mass}</p>
                <p><strong>hair color:</strong> {character.hair_color}</p>
                <p><strong>skin color:</strong> {character.skin_color}</p>
                <p><strong>eye color:</strong> {character.eye_color}</p>
            </div>

            <div className="films">
                <strong>Films:</strong>
                <ul>
                    {films.map((title) => (
                        <li key={title}>{title}</li>
                    ))}
                </ul>
            </div>

        </section>
    );
}
