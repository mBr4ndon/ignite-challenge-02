import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

export interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface IGenreContext {
    selectedGenreId: number;
    selectedGenre: GenreResponseProps;
    handleClickButton: (id: number) => void;
}

interface GenreContextProviderProps {
    children: ReactNode;
}

export const GenreContext = createContext({} as IGenreContext);

export function GenreContextProvider({ children } : GenreContextProviderProps) {
  
    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {    
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <GenreContext.Provider value={{selectedGenreId, selectedGenre, handleClickButton}}>
            {children}
        </GenreContext.Provider>
    );
}