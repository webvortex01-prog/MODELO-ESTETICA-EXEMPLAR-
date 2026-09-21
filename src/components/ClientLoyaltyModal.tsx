import { motion } from 'motion/react';
import { Gem, Sparkles, Award, X, Check } from 'lucide-react';

interface ClientLoyaltyModalProps {
  onClose: () => void;
}

export default function ClientLoyaltyModal({ onClose }: ClientLoyaltyModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 animate-in fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gradient-to-b from-[#141619] via-[#0E1012] to-[#08090A] border border-[#D4AF37]/50 rounded-3xl max-w-xl w-full p-8 md:p-12 relative shadow-[0_0_80px_rgba(212,175,55,0.2)] space-y-8"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] rounded-full mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <Gem className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-3xl md:text-4xl text-white">Lumière Black Circle</h3>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[9px] uppercase tracking-[0.25em]">
            <Sparkles className="w-3 h-3" />
            Clube de Membros VIP & Cashback
          </div>
        </div>

        <div className="bg-stone-950/80 rounded-2xl p-6 border border-[#D4AF37]/30 space-y-5 shadow-inner">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest">Nível de Elegância</p>
              <p className="font-serif text-2xl text-white mt-0.5">Black Diamond Member</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] text-stone-400 uppercase tracking-widest">Pontos Acumulados</p>
              <p className="font-mono text-2xl text-[#D4AF37] font-bold">2.450 pts</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">Benefícios Exclusivos Ativos:</p>
            <ul className="space-y-2 font-mono text-xs text-stone-200">
              <li className="flex items-center gap-3 bg-stone-900/50 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                10% de Cashback em todos os procedimentos
              </li>
              <li className="flex items-center gap-3 bg-stone-900/50 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                Atendimento VIP com Champagne & Amenities finos
              </li>
              <li className="flex items-center gap-3 bg-stone-900/50 p-2.5 rounded-xl border border-white/5">
                <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                Prioridade absoluta na agenda da Dra. Eliana Becker
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[10px] uppercase tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all cursor-pointer"
          >
            Fechar Clube VIP
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
