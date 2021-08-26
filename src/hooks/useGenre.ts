import { useContext } from "react";
import { GenreContext } from "../contexts/GenreContext";

export function useGenre() {
    return useContext(GenreContext);
}