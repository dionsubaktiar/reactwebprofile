"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import BottomNavBar from "../components/bottomNavbar";
import Navbar from "../components/navbar";
import Image from "next/image";

interface PokeProps {
  name: string;
  url: string;
}

interface PokeImage {
  name: string;
  image: string;
}

const PokemonPage = () => {
  const [pokemonResults, setPokemonResults] = useState<PokeImage[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State untuk loading

  const fetchPokemonData = async (url: string) => {
    setLoading(true); // Set loading true saat mulai fetch data
    const jsonPokemon = await axios.get(url);
    const pokemonResults = jsonPokemon.data.results as PokeProps[];

    // Fetch detailed data (including images)
    const promises = pokemonResults.map(async (pokemon) => {
      const pokemonDetailData = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        image: pokemonDetailData.data.sprites.front_default, // Assuming this is the correct image field
      } as PokeImage;
    });

    // Await all promises and update state
    const pokemonImages = await Promise.all(promises);
    setPokemonResults(pokemonImages);
    setNextUrl(jsonPokemon.data.next); // Set URL for the next page
    setPreviousUrl(jsonPokemon.data.previous); // Set URL for the previous page
    setLoading(false); // Set loading false setelah data berhasil di-fetch
  };

  useEffect(() => {
    fetchPokemonData("https://pokeapi.co/api/v2/pokemon/");
  }, []);

  const handlePageChange = (url: string) => {
    fetchPokemonData(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-honeyDew dark:bg-eggplant text-eggplant dark:text-honeyDew">
      <main className="flex-grow">
        <Navbar title="PokeAPI" />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-eggplant dark:border-honeyDew"></div>
          </div> // Komponen Loading, bisa diganti dengan spinner
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {pokemonResults.map((pokeData) => (
              <div
                key={pokeData.name}
                className="border border-customGreen-dark dark:border dark:border-customGreen-light
                 rounded-lg p-4 shadow-md flex flex-col items-center dark:bg-gradient-to-b from-customGreen-dark to-zinc-500"
              >
                <p className="text-xl font-semibold mb-2">{pokeData.name}</p>
                {pokeData.image ? (
                  <Image
                    src={pokeData.image}
                    alt={pokeData.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNavBar
        next={nextUrl}
        previous={previousUrl}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PokemonPage;
