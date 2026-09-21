import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  description: string;
  technique: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Preenchimento Labial Russo',
    category: 'filler',
    categoryLabel: 'Preenchimento',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    description: 'Definição de contorno vertical e hidratação profunda com ácido hialurônico.',
    technique: 'Técnica Russian Lips 1.1ml'
  },
  {
    id: 'g2',
    title: 'Harmonização Facial Global',
    category: 'harmonization',
    categoryLabel: 'Harmonização',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    description: 'Projeção de malar, mandíbula e mento para simetria e proporção áurea.',
    technique: 'Ácido Hialurônico Alta Densidade'
  },
  {
    id: 'g3',
    title: 'Toxina Botulínica (Full Face)',
    category: 'toxin',
    categoryLabel: 'Toxina Botulínica',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    description: 'Suavização de rugas dinâmicas na testa, glabela e área dos olhos com naturalidade.',
    technique: 'Botox Allergan Premium'
  },
  {
    id: 'g4',
    title: 'Bioestimulação de Colágeno',
    category: 'biostimulator',
    categoryLabel: 'Bioestimuladores',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    description: 'Restauração da firmeza cutânea e estímulo natural de colágeno tipo I e III.',
    technique: 'Sculptra Facial + Radiesse'
  },
  {
    id: 'g5',
    title: 'Protocolo Lavieen (BB Laser)',
    category: 'laser',
    categoryLabel: 'Laser & Skincare',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    description: 'Efeito pele de porcelana, uniformização de tom e fechamento de poros.',
    technique: 'Laser Thulium 1927nm'
  },
  {
    id: 'g6',
    title: 'Rinomodelação Avançada',
    category: 'harmonization',
    categoryLabel: 'Harmonização',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    description: 'Empinamento da ponta nasal e correção de pequenas irregularidades do dorso.',
    technique: 'Ácido Hialurônico Estrutural'
  },
  {
    id: 'g7',
    title: 'Skinbooster com Ácido Hialurônico',
    category: 'laser',
    categoryLabel: 'Laser & Skincare',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    description: 'Hidratação profunda injetável, viço imediato e melhora da elasticidade.',
    technique: 'Restylane Skinboosters'
  },
  {
    id: 'g8',
    title: 'Fios de Sustentação PDO',
    category: 'biostimulator',
    categoryLabel: 'Bioestimuladores',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    description: 'Efeito lifting imediato e estímulo prolongado de colágeno sem cirurgia.',
    technique: 'Fios Espiculados de Polidioxanona'
  }
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section className="py-32 px-6 lg:px-16 bg-[#08090B] border-b border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono text-[#D4AF37] text-[10px] uppercase tracking-[0.4em]">Portfólio de Excelência</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Galeria de <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">Resultados</span>
          </h2>
          <p className="font-mono text-[11px] text-stone-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
            Casos clínicos reais documentados com rigor estético. Conheça a precisão dos nossos procedimentos de alto padrão.
          </p>
        </div>

        {/* Category Filters (Curved Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {[
            { id: 'all', label: 'Todos os Casos' },
            { id: 'harmonization', label: 'Harmonização' },
            { id: 'filler', label: 'Preenchimento' },
            { id: 'toxin', label: 'Toxina Botulínica' },
            { id: 'biostimulator', label: 'Bioestimuladores' },
            { id: 'laser', label: 'Laser & Skincare' }
          ].map(filter => {
            const isActive = activeFilter === filter.id;
            return (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#F3E5AB]'
                    : 'bg-stone-900/80 text-stone-400 border border-stone-800 hover:border-[#D4AF37]/50 hover:text-white'
                }`}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </div>

        {/* Gallery Grid with Curved 3D Hover Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <motion.div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-[#121417] border border-[#D4AF37]/20 rounded-3xl overflow-hidden cursor-pointer hover:border-[#D4AF37] transition-all duration-500 shadow-xl"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                  <h3 className="font-serif text-xl text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[9px] text-stone-300 uppercase tracking-widest line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="pt-2 flex items-center gap-1.5 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal with Curved Corners */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#121417] border border-[#D4AF37]/50 rounded-3xl max-w-4xl w-full grid md:grid-cols-2 overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.2)] relative"
              >
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/80 border border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center font-mono text-sm cursor-pointer shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="aspect-square md:aspect-auto relative min-h-[300px]">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.25em] mb-4">
                      {selectedItem.categoryLabel}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">{selectedItem.title}</h3>
                    <p className="font-mono text-xs text-stone-300 uppercase tracking-widest leading-relaxed mb-6">
                      {selectedItem.description}
                    </p>
                    
                    <div className="bg-stone-950/80 rounded-2xl border border-[#D4AF37]/25 p-5 space-y-2">
                      <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest">Técnica Aplicada</p>
                      <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">
                        {selectedItem.technique}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-mono text-[9px] text-stone-400 uppercase tracking-widest">Lumière Clinic Standard</span>
                    <motion.button 
                      onClick={() => { 
                        setSelectedItem(null); 
                        const el = document.getElementById('booking-section'); 
                        el?.scrollIntoView({ behavior: 'smooth' }); 
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[9px] uppercase tracking-[0.25em] font-bold hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Agendar Avaliação <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
