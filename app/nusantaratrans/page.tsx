// Service: reactwebprofile | File: app/nusantaratrans/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar';
import { HiChevronLeft, HiChevronRight, HiStar, HiShieldCheck, HiSparkles } from 'react-icons/hi';

interface Slide {
  id: number;
  title: string;
  badge: string;
  description: string;
  image: string;
  specs: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Executive Super Luxury Coach',
    badge: 'Premier Fleet',
    description: 'Armada bus antar kota kelas eksekutif dengan leg-rest reclining seat, individual AC, dan Wi-Fi super cepat.',
    image: '/assets/images/Notebook.png',
    specs: ['28 Seats 2-1 Layout', 'Air Suspension', 'USB Charging Port', 'Onboard Restroom'],
  },
  {
    id: 2,
    title: 'HiAce Commuter Premiere VIP',
    badge: 'Express Shuttle',
    description: 'Solusi perjalanan point-to-point cepat, privat, dan nyaman untuk mobilitas profesional dan keluarga.',
    image: '/assets/images/coding.png',
    specs: ['10 VIP Seats', 'Captain Chair', 'Full Audio Entertainment', 'Luggage Compartment'],
  },
  {
    id: 3,
    title: 'Double Decker Ultra Grand Tourer',
    badge: 'Flagship Sleeper',
    description: 'Pengalaman perjalanan malam bintang lima dengan kabin sleeper privat dan panorama panoramic view lantai atas.',
    image: '/assets/images/Notebook.png',
    specs: ['Individual Sleeper Pods', 'Snack & Dinner Inclusive', 'Safety First ADAS', 'Dedicated Steward'],
  },
];

export default function NusantaraTransPage() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <Navbar title="NusantaraTrans Showcase" subtitle="Interactive Carousel Sandbox & fleet slider demo" />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((item) => (
              <div key={item.id} className="min-w-full p-6 sm:p-12">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <HiSparkles /> {item.badge}
                    </span>
                    <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 dark:text-zinc-300">
                      {item.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {item.specs.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200"
                        >
                          <HiShieldCheck className="h-4 w-4 text-emerald-500" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <button
                        type="button"
                        className="rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                      >
                        Pesan Tiket Sekarang
                      </button>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <HiStar className="h-4 w-4" />
                        <span>4.9 / 5.0 Rating Pelanggan</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center lg:col-span-5">
                    <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-100 to-blue-50 p-6 sm:h-80 dark:from-zinc-800 dark:to-zinc-900">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-md backdrop-blur-md transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>

          {/* Bullet Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}