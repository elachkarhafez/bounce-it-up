'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  'https://images.unsplash.com/photo-1513161455079-7ef1a827d4af?w=800&q=80',
  'https://images.unsplash.com/photo-1587653915936-5f35c6aca5a5?w=600&q=80',
  'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&q=80',
  'https://images.unsplash.com/photo-1578091879453-9e5b65f82a74?w=600&q=80',
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80',
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox((l) => (l === 0 ? photos.length - 1 : l - 1));
  const next = () => setLightbox((l) => (l === photos.length - 1 ? 0 : l + 1));

  return (
    <div className="min-h-screen pt-32 sm:pt-40 pb-20">
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
              See the <span className="gradient-text">Magic</span>
            </h1>
            <p className="text-white/60 text-lg">Real moments, real smiles</p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px]">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => setLightbox(i)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-full"
              >
                <Image
                  src={photo}
                  alt={`Photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 p-2 rounded-full glass text-white hover:text-brand-orange transition-colors"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-3 rounded-full glass text-white hover:text-brand-orange transition-colors sm:flex hidden"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh] w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox]}
                alt={`Photo ${lightbox + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-3 rounded-full glass text-white hover:text-brand-orange transition-colors sm:flex hidden"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
