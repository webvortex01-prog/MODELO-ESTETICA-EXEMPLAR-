import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Gem, Activity, Clock, ArrowRight, Star, ShieldCheck, Flame } from 'lucide-react';
import { Procedure } from '../types';

interface ProcedureCarouselProps {
  procedures: Procedure[];
  onSelectProcedure: (proc: Procedure) => void;
}

const PROCEDURE_IMAGES: Record<string, string> = {
  p1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  p2: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
  p3: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
  p4: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
  p5: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  p6: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  p7: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  p8: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  p9: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  p10: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
  p11: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  p12: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  p13: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  p14: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  p15: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
};

const PROCEDURE_TAGS: Record<string, { label: string; icon: any; color: string }> = {
  p1: { label: 'Mais Procurado', icon: Flame, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  p2: { label: 'Técnica Russa', icon: Star, color: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40' },
  p3: { label: 'Efeito Lifting', icon: Sparkles, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  p4: { label: 'Olhar Descansado', icon: ShieldCheck, color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  p5: { label: 'Sem Cirurgia', icon: Gem, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  p6: { label: 'Indução Colágeno', icon: Activity, color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  p7: { label: 'Protocolo VIP', icon: Star, color: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40' },
  p8: { label: 'Corporal Premium', icon: Flame, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  p9: { label: 'Pele de Vidro', icon: Sparkles, color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  p10: { label: 'Definição Mento', icon: ShieldCheck, color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  p11: { label: 'Contorno Mandibular', icon: Gem, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  p12: { label: 'Bioestímulo Ouro', icon: Sparkles, color: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40' },
  p13: { label: 'BB Laser Lavieen', icon: Star, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  p14: { label: 'Linha Nefertiti', icon: ShieldCheck, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  p15: { label: 'Exossomos VIP', icon: Activity, color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
};

export default function ProcedureCarousel({ procedures, onSelectProcedure }: ProcedureCarouselProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselTimerRef = useRef<NodeJS.Timeout | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Protocolos' },
    { id: 'filler', label: 'Harmonização & Preenchimento' },
    { id: 'toxin', label: 'Toxina Botulínica' },
    { id: 'biostimulator', label: 'Bioestimuladores & Fios' },
    { id: 'other', label: 'Corporal & Pele' }
  ];

  const filteredProcedures = activeCategory === 'all' 
    ? procedures 
    : procedures.filter(p => p.category === activeCategory);

  // Carousel constrained strictly to 5 stages (Etapas 01 a 05), looping back to 01 after 05
  const TOTAL_SLIDES = activeCategory === 'all' 
    ? 5 
    : Math.max(1, Math.min(5, Math.ceil(filteredProcedures.length / 3)));
  const maxIndex = Math.max(0, TOTAL_SLIDES - 1);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-play interval looping seamlessly 1 -> 2 -> 3 -> 4 -> 5 -> 1
  useEffect(() => {
    if (!isAutoPlaying) return;

    carouselTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => {
      if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
    };
  }, [isAutoPlaying, maxIndex]);

  return (
    <div 
      className="relative space-y-12"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* CATEGORY FILTER PILLS */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className={`px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-[#F3E5AB]'
                  : 'bg-stone-900/80 text-stone-400 border border-stone-800 hover:border-[#D4AF37]/50 hover:text-white hover:bg-stone-800/80'
              }`}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* CAROUSEL CONTROLS BAR */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
            Etapa {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="w-24 h-1.5 bg-stone-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-200 rounded-full"
              animate={{ width: `${((currentIndex + 1) / TOTAL_SLIDES) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-stone-500">
            {String(TOTAL_SLIDES).padStart(2, '0')}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1, backgroundColor: '#D4AF37', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Procedimento anterior"
            className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-stone-950/80 text-[#D4AF37] flex items-center justify-center shadow-lg backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1, backgroundColor: '#D4AF37', color: '#000' }}
            whileTap={{ scale: 0.9 }}
            aria-label="Próximo procedimento"
            className="w-12 h-12 rounded-full border border-[#D4AF37]/40 bg-stone-950/80 text-[#D4AF37] flex items-center justify-center shadow-lg backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* CAROUSEL TRACK */}
      <div className="relative overflow-hidden py-4">
        <motion.div 
          className="flex gap-6 md:gap-8"
          animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem)` }}
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        >
          {filteredProcedures.map((proc, idx) => {
            const image = PROCEDURE_IMAGES[proc.id] || 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80';
            const tag = PROCEDURE_TAGS[proc.id] || { label: 'Exclusivo', icon: Sparkles, color: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30' };
            const TagIcon = tag.icon;

            return (
              <div 
                key={proc.id} 
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.33rem)] shrink-0"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-gradient-to-b from-[#141619] to-[#0A0A0A] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between h-full min-h-[520px]"
                >
                  {/* Image Container with Luxury Overlay */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <img 
                      src={image} 
                      alt={proc.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141619] via-[#141619]/40 to-transparent" />
                    
                    {/* Badge Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest border backdrop-blur-md ${tag.color}`}>
                        <TagIcon className="w-3 h-3" />
                        {tag.label}
                      </span>
                    </div>

                    {/* Duration Pill */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono text-stone-300 bg-black/60 border border-white/10 backdrop-blur-md">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        {proc.durationMinutes} min
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="font-serif text-2xl text-white tracking-wide group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                        {proc.name}
                      </h3>
                      <p className="font-mono text-xs text-stone-400 uppercase tracking-wider leading-relaxed line-clamp-3">
                        {proc.description}
                      </p>
                    </div>

                    {/* Price and CTA */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500 block">
                          Investimento
                        </span>
                        <span className="font-serif text-2xl text-[#D4AF37] font-normal">
                          R$ {proc.price.toLocaleString('pt-BR')}
                        </span>
                      </div>

                      <motion.button
                        onClick={() => onSelectProcedure(proc)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[10px] uppercase tracking-[0.2em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        Reservar
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* PAGINATION DOTS */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir para etapa ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx 
                ? 'w-8 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]' 
                : 'w-2 bg-stone-800 hover:bg-stone-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
