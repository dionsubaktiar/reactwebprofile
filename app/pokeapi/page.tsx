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
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPokemonData = async (url: string) => {
    setLoading(true);
    try {
      const jsonPokemon = await axios.get(url);
      const pokemonResults = jsonPokemon.data.results as PokeProps[];

      const promises = pokemonResults.map(async (pokemon) => {
        const pokemonDetailData = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          image: pokemonDetailData.data.sprites.front_default,
        } as PokeImage;
      });

      const pokemonImages = await Promise.all(promises);
      setPokemonResults(pokemonImages);
      setNextUrl(jsonPokemon.data.next);
      setPreviousUrl(jsonPokemon.data.previous);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData("https://pokeapi.co/api/v2/pokemon/");
  }, []);

  const handlePageChange = (url: string) => {
    fetchPokemonData(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 font-poppins transition-colors duration-300">
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        <Navbar title="PokeAPI Explorer" />

        {loading ? (
          <div className="flex justify-center items-center h-[55vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {pokemonResults.map((pokeData) => (
              <div
                key={pokeData.name}
                className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-500/50 flex flex-col items-center gap-4 transition-all duration-300 group"
              >
                <p className="text-sm font-bold tracking-wide capitalize font-poppins text-zinc-850 dark:text-zinc-200 group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                  {pokeData.name}
                </p>
                
                <div className="relative w-24 h-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-xl flex items-center justify-center p-2">
                  {pokeData.image ? (
                    <Image
                      src={pokeData.image}
                      alt={pokeData.name}
                      width={80}
                      height={80}
                      className="object-contain transform group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-[10px] text-zinc-400">No Sprite</span>
                  )}
                </div>
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
