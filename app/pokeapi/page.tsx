"use client";
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

  const fetchPokemonData = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonResults = data.results as PokeProps[];

    // Fetch detailed data (including images)
    const promises = pokemonResults.map(async (pokemon) => {
      const pokemonDetailResponse = await fetch(pokemon.url);
      const pokemonDetailData = await pokemonDetailResponse.json();

      return {
        name: pokemon.name,
        image: pokemonDetailData.sprites.front_default, // Assuming this is the correct image field
      } as PokeImage;
    });

    // Await all promises and update state
    const pokemonImages = await Promise.all(promises);
    setPokemonResults(pokemonImages);
    setNextUrl(data.next); // Set URL for the next page
    setPreviousUrl(data.previous); // Set URL for the previous page
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
