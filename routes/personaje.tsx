import Axios from "npm:axios"
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";


type Character = {
    id: string
    name: string
    birth_year: string
    eye_color: string
    gender:string 
    height: string 
    mass: string 
    skin_color: string 
    homeworld: string 
    films: string[] 
    species: string []
    starships: string[]
    vehicles: string[]
    url: string
    created: string 
    edited: string
}

export const handler:Handlers={
    GET:async (_req:Request,ctx: FreshContext<unknown,{characters: Character[], search: string}>)=>{
        try {
            const url = new URL(_req.url);
            const search = url.searchParams.get("search");

            if (!search) {
                return ctx.render({characters:[], search: ""});
            }

            const response = await Axios.get<{results:Character[]}>(`https://swapi.dev/api/people/?search=${search}&format=json`);
            const characters = response.data.results;

            return ctx.render({characters, search});

        } catch (error) {
            console.error(error);
            throw new Response ("Error en el servidor",{status:500})
        }
    }
};

const Page = (props: PageProps<{ characters: Character[]; search: string }>,) => {

    const characters = props.data.characters;

    return (
        
            <div class="character-list ">    
                <ul>
                    {characters.map((character) => (
                        <li key={character.id}>
                            <h2>{character.name}</h2>
                            <p>Fecha de nacimiento: {character.birth_year}</p>
                            <p>Color de ojos: {character.eye_color}</p>
                            <p>Genero: {character.gender}</p>
                            <p>Altura: {character.height}</p>
                            <p>Peso: {character.mass}</p>
                            <p>Color de piel: {character.skin_color}</p>
                            <p>Mundo natal: <a href={character.homeworld}> {character.homeworld}</a></p>  
                            <p>Peliculas:</p>
                                <ul>
                                    {character.films.map((film, index) => (
                                        <li key={index}>
                                        <a href={film} target="_blank" rel="noopener noreferrer">
                                                {film}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            <p>Especies: {character.species}</p>
                            <p>Naves:</p>
                                <ul>
                                    {character.starships.map((starship, index) => (
                                        <li key={index}>
                                        <a href={starship} target="_blank" rel="noopener noreferrer">
                                                {starship}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            <p>Vehiculos:</p>
                                <ul>
                                    {character.vehicles.map((vehicle, index) => (
                                        <li key={index}>
                                            <a href={vehicle} target="_blank" rel="noopener noreferrer">
                                                {vehicle}
                                            </a>
                                        </li>
                                    ))}
                                </ul>          
                            <p>URL: <a href={character.url}> {character.url}</a></p>              
                            <p>Creado: {character.created}</p>
                            <p>Editado: {character.edited}</p>
                        </li>
                    ))}
                </ul>
                <a href="/"> 🛸 Buscar otro Personaje 🛸</a>
            </div>
           
  
    );
};

export default Page;