// Service: reactwebprofile | File: app/pokeapi/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar';
import { HiSearch, HiSparkles } from 'react-icons/hi';

interface PokemonItem {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  stats: { name: string; value: number }[];
}

const typeColors: Record<string, string> = {
  fire: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900/40',
  water: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/40',
  grass: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/40',
  electric: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/40',
  poison: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900/40',
  bug: 'bg-lime-500/10 text-lime-600 border-lime-200 dark:border-lime-900/40',
  normal: 'bg-slate-500/10 text-slate-600 border-slate-200 dark:border-slate-800',
  flying: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-900/40',
  psychic: 'bg-pink-500/10 text-pink-600 border-pink-200 dark:border-pink-900/40',
};

export default function PokeApiPage() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=24&offset=0');
        const data = await res.json();

        const detailedData: PokemonItem[] = await Promise.all(
          data.results.map(async (item: { url: string }) => {
            const detailRes = await fetch(item.url);
            const detail = await detailRes.json();
            return {
              id: detail.id,
              name: detail.name,
              types: detail.types.map((t: { type: { name: string } }) => t.type.name),
              imageUrl:
                detail.sprites.other?.['official-artwork']?.front_default ||
                detail.sprites.front_default,
              stats: detail.stats.slice(0, 3).map((s: { stat: { name: string }; base_stat: number }) => ({
                name: s.stat.name,
                value: s.base_stat,
              })),
            };
          })
        );
        setPokemonList(detailedData);
      } catch (err) {
        console.error('Failed fetching PokeAPI data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, []);

  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.types.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              <HiSparkles className="text-amber-500" />
              PokeAPI Explorer
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Showcase konsumsi REST API publik dengan asynchronous micro-detail and visual badges.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Pokémon / tipe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-60 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="self-end text-xs font-black text-slate-400 dark:text-zinc-600">
                  #{String(item.id).padStart(3, '0')}
                </span>

                <div className="relative h-28 w-28 transition group-hover:scale-105">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 150px"
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-3 text-sm font-bold capitalize text-slate-900 dark:text-white">
                  {item.name}
                </h3>

                <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                  {item.types.map((type) => (
                    <span
                      key={type}
                      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        typeColors[type] || 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}