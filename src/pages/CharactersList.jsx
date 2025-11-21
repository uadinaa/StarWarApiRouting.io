import React, { useEffect, useState } from "react";
import {fetchCharacters, fetchNextPage, getById} from "../services/itemsService.js";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import "../styles/CharactersList.css";
import {Link, useParams} from "react-router-dom";

const CharactersList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favourites, setFavourites] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [filterMode, setFilterMode] = useState("all"); // "all" | "favourites"

    const getIdFromUrl = (url) => {
        if (typeof url !== "string") return null;
        const parts = url.split("/").filter(Boolean);
        return parts[parts.length - 1];
    };

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    useEffect(() => {
        localStorage.setItem("deleted", JSON.stringify(deleted));
    }, [deleted]);

    useEffect(() => {
        setLoading(true);
        fetchCharacters()
            .then((data) => {
                // normalize API characters
                const normalized = data.map(c => ({
                    ...c,
                    id: getIdFromUrl(c.url),
                }));

                // load local characters
                const saved = JSON.parse(localStorage.getItem("newCharacter") || "[]");

                setCharacters([...normalized, ...saved]);
            })
            .catch((error) => console.log(error.message || "failed to load characters"))
            .finally(() => setLoading(false));
    }, []);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        if (id.startsWith("local-")) {
            const saved = JSON.parse(localStorage.getItem("newCharacter") || "[]");
            const character = saved.find(c => c.id === id);
            if (character) setCharacters([character]);
        } else {
            getById(id).then(data => {
                setCharacters([{ ...data, id }]);
            });
        }
    }, [id]);

    const handleMore = () => {
        setLoading(true);
        fetchNextPage()
            .then((data) => {
                const normalized = data.map(c => ({
                    ...c,
                    id: getIdFromUrl(c.url),
                }));
                setCharacters((prev) => [
                    ...prev,
                    ...normalized.filter((c) => !deleted.includes(c.id)),
                ]);
            })
            .catch((error) => console.log(error.message || "failed to load next page"))
            .finally(() => setLoading(false));
    };


    const handleDelete = (urlOrId) => {
        setCharacters((prev) => prev.filter((c) => (c.url || c.id) !== urlOrId));
        setFavourites((prev) => prev.filter((c) => (c.url || c.id) !== urlOrId));
        setDeleted((prev) => [...prev, urlOrId]);
    };

    const handleLike = (character) => {
        if (favourites.find((f) => f.url === character.url)) {
            setFavourites((prev) => prev.filter((f) => f.id !== character.id));
        } else {
            setFavourites((prev) => [...prev, character]);
        }
    };

    if (loading && characters.length === 0) return <p>Loading...</p>;

    const visibleCharacters =
        filterMode === "all" ? characters : favourites;

    return (
        <div>
            <div className="filters">
                <button className="all" onClick={() => setFilterMode("all")}>All characters </button>
                <button className="fav" onClick={() => setFilterMode("favourites")}>Favorite ones</button>
            </div>

            <div className="character-list">
                {visibleCharacters.map((c) => {
                    const id = c.id;
                    if (!id) return null;

                    const isLiked = favourites.some(f => f.id === c.id);
                    return (
                        <Link
                            key={c.id}
                            to={`/products/${c.id}`}
                            className="character-card"
                        >
                            <div className="character-list-item">
                                <div className="icons">
                                    <div className="left-like">
                                        <button
                                            className={`like ${isLiked ? "liked" : ""}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLike(c);
                                            }}
                                        >
                                            {isLiked ? <AiFillHeart/> : <AiOutlineHeart />}
                                        </button>
                                    </div>

                                    <div className="right-trash">
                                        <button
                                            className="delete"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(c.url || c.id);
                                            }}
                                        >
                                            <AiOutlineDelete className="trash-outline" />
                                            <AiFillDelete className="trash-fill" />
                                        </button>
                                    </div>
                                </div>

                                <h2 className="name">{c.name}</h2>
                                <p className="gender">
                                    <strong>Gender:</strong> {c.gender}
                                </p>
                                <p className="birth_year">
                                    <strong>Birth year:</strong> {c.birth_year}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <button className="moreButton" onClick={handleMore}>
                More
            </button>
        </div>
    );
};

export default CharactersList;
