// Service: reactwebprofile | File: app/pokeapi/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar';
import { HiSearch, HiSparkles, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PokemonItem {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
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

const ITEMS_PER_PAGE = 18;

export default function PokeApiPage() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(151); // Gen 1 cap default
  const [isLoading, setIsLoading] = useState(true);

  const fetchPokemons = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
      const data = await res.json();
      setTotalCount(data.count || 151);

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
              detail.sprites.front_default ||
              '/assets/images/emptyprofile.png',
          };
        })
      );
      setPokemonList(detailedData);
    } catch (err) {
      console.error('Failed fetching PokeAPI data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage, fetchPokemons]);

  const filtered = pokemonList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.types.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Controls */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              <HiSparkles className="text-amber-500" />
              PokeAPI Explorer
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Paginated REST API showcase Pokémon database dengan realtime query filter.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama Pokémon / tipe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="self-end text-xs font-black text-slate-400 dark:text-zinc-600">
                  #{String(item.id).padStart(3, '0')}
                </span>

                <div className="relative h-24 w-24 transition duration-300 group-hover:scale-110 sm:h-28 sm:w-28">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100px, 120px"
                    className="object-contain"
                  />
                </div>

                <h3 className="mt-3 text-sm font-bold capitalize text-slate-900 dark:text-white">
                  {item.name}
                </h3>

                <div className="mt-2 flex flex-wrap justify-center gap-1">
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

        {/* Pagination Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-zinc-800">
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Halaman <span className="font-bold text-slate-900 dark:text-white">{currentPage}</span> dari{' '}
            <span className="font-bold text-slate-900 dark:text-white">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <HiChevronLeft className="h-4 w-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              <span>Berikutnya</span>
              <HiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}