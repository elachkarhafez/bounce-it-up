'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80',
    alt: 'Kids on bounce house',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1587653915936-5f35c6aca5a5?w=600&q=80',
    alt: 'Indoor playground',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&q=80',
    alt: 'Kids playing',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1578091879453-9e5b65f82a74?w=600&q=80',
    alt: 'Birthday party celebration',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
    alt: 'Party decorations',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    alt: 'Obstacle course fun',
    span: 'col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    alt: 'Toddler play area',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&q=80',
    alt: 'Fun activities',
    span: '',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox((l) => (l === 0 ? photos.length - 1 : l - 1));
  const next = () => setLightbox((l) => (l === photos.length - 1 ? 0 : l + 1));

  return (
    <section id="gallery" className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 text-xs uppercase tracking-widest font-semibold text-brand-green"
          >
            <ZoomIn size={12} />
            Photo Gallery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4"
          >
            See the <span className="gradient-text">Magic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/55 text-lg"
          >
            Real moments, real smiles.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[180px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setLightbox(i)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${photo.span}`}
              style={{ minHeight: 0 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Zoom icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                  <ZoomIn size={16} className="text-white" />
                </div>
              </div>
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-orange ring-opacity-0 group-hover:ring-opacity-60 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2 rounded-full glass text-white hover:text-brand-orange transition-colors"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-3 rounded-full glass text-white hover:text-brand-orange transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-16 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[lightbox].src.replace('w=600', 'w=1200').replace('w=800', 'w=1200')}
                alt={photos[lightbox].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-full"
              />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-3 rounded-full glass text-white hover:text-brand-orange transition-colors"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
              {lightbox + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
