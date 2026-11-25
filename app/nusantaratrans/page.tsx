'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SubPageHeader from "@/app/components/SubPageHeader";
import { FiChevronLeft, FiChevronRight, FiShield } from 'react-icons/fi';

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
    description: 'Pengalaman perjalanan malam dengan kabin sleeper privat dan pemandangan panorama lantai atas.',
    image: '/assets/images/Notebook.png',
    specs: ['Individual Sleeper Pods', 'Snack & Dinner Inclusive', 'Safety First ADAS', 'Dedicated Steward'],
  },
];

export default function NusantaraTransPage() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [reservedFleet, setReservedFleet] = useState<string | null>(null);

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <SubPageHeader title="NusantaraTrans Showcase" subtitle="Interactive Carousel Sandbox & Fleet slider demo" />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((item) => (
              <div key={item.id} className="min-w-full p-6 sm:p-12">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                      {item.badge}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                      {item.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-2.5">
                      {item.specs.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200"
                        >
                          <FiShield className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setReservedFleet(item.title)}
                        className="rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                      >
                        Pesan Tiket Sekarang
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center lg:col-span-5">
                    <div className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl bg-zinc-100 p-6 sm:h-80 dark:bg-zinc-800/60">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-4"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/90 p-3 text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-zinc-200 bg-white/90 p-3 text-zinc-700 shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          {/* Bullet Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrent(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-colors duration-200 ${
                  current === idx ? 'w-8 bg-indigo-600' : 'w-2 bg-zinc-300 dark:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {reservedFleet && (
          <div
            role="status"
            className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-medium text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300"
          >
            <span>
              Simulasi reservasi untuk armada <strong>{reservedFleet}</strong> berhasil dicatat. Tim layanan akan menghubungi Anda.
            </span>
            <button
              type="button"
              onClick={() => setReservedFleet(null)}
              className="rounded-lg border border-emerald-300 px-3 py-1 font-semibold hover:bg-emerald-100 dark:border-emerald-800 dark:hover:bg-emerald-900/40"
            >
              Tutup
            </button>
          </div>
        )}
      </main>
    </div>
  );
}