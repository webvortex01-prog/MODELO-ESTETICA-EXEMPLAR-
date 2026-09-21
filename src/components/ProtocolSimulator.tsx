import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { Procedure } from '../types';

interface ProtocolSimulatorProps {
  procedures: Procedure[];
  onSelectProcedure: (proc: Procedure) => void;
}

export default function ProtocolSimulator({ procedures, onSelectProcedure }: ProtocolSimulatorProps) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string>('rejuvenation');
  const [concern, setConcern] = useState<string>('wrinkles');
  const [result, setResult] = useState<Procedure | null>(null);

  const handleCalculate = () => {
    let matched = procedures[0];
    if (goal === 'lips') {
      matched = procedures.find(p => p.name.toLowerCase().includes('labial')) || procedures[1];
    } else if (goal === 'contour') {
      matched = procedures.find(p => p.name.toLowerCase().includes('harmonização') || p.name.toLowerCase().includes('malar')) || procedures[0];
    } else if (goal === 'skin') {
      matched = procedures.find(p => p.name.toLowerCase().includes('laser') || p.name.toLowerCase().includes('skinbooster')) || procedures[2];
    }
    setResult(matched);
    setStep(3);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-b from-[#101216] via-[#0A0A0A] to-[#050505] border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 shadow-[0_0_60px_rgba(212,175,55,0.1)] relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em]">Inteligência Estética Lumière</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl text-white tracking-tight">
            Simulador de <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">Protocolo Ideal</span>
          </h3>
          <p className="font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider sm:tracking-widest max-w-lg mx-auto leading-relaxed px-2">
            Responda 2 perguntas e receba a indicação clínica personalizada para os melhores resultados.
          </p>
        </div>

        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#D4AF37] text-center font-semibold">
              1. Qual é o seu principal objetivo estético?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                { id: 'rejuvenation', title: 'Rejuvenescimento & Firmeza', desc: 'Suavizar rugas e estimular colágeno natural' },
                { id: 'contour', title: 'Harmonização & Contorno', desc: 'Definição de mandíbula, malar e proporção' },
                { id: 'lips', title: 'Lábios & Proporção', desc: 'Volume natural, contorno e hidratação labial' },
                { id: 'skin', title: 'Qualidade de Pele & Poros', desc: 'Efeito pele de porcelana, viço e luminosidade' }
              ].map(item => (
                <motion.div 
                  key={item.id}
                  onClick={() => setGoal(item.id)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-300 ${
                    goal === item.id 
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-amber-900/20 border-[#D4AF37] text-white shadow-[0_0_30px_rgba(212,175,55,0.25)]' 
                      : 'bg-stone-900/60 border-stone-800/80 text-stone-400 hover:border-stone-600 hover:bg-stone-900'
                  }`}
                >
                  <p className="font-serif text-base sm:text-lg text-white mb-1">{item.title}</p>
                  <p className="font-mono text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-wider sm:tracking-widest">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center pt-2 sm:pt-4">
              <motion.button 
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all inline-flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
              >
                Avançar <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#D4AF37] text-center font-semibold">
              2. Qual região mais te incomoda atualmente?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {[
                { id: 'wrinkles', label: 'Testa & Olhos (Rugas)' },
                { id: 'middle', label: 'Terço Médio (Bochechas & Malar)' },
                { id: 'lower', label: 'Mandíbula & Pescoço' }
              ].map(item => (
                <motion.div 
                  key={item.id}
                  onClick={() => setConcern(item.id)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border text-center cursor-pointer transition-all duration-300 ${
                    concern === item.id 
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-amber-900/20 border-[#D4AF37] text-white shadow-[0_0_30px_rgba(212,175,55,0.25)]' 
                      : 'bg-stone-900/60 border-stone-800/80 text-stone-400 hover:border-stone-600 hover:bg-stone-900'
                  }`}
                >
                  <p className="font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button 
                onClick={() => setStep(1)} 
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-stone-800 text-stone-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hover:text-white hover:border-stone-600 transition-all cursor-pointer text-center"
              >
                Voltar
              </button>
              <motion.button 
                onClick={handleCalculate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all inline-flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
              >
                Gerar Protocolo Exclusivo <Sparkles className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 3 && result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 sm:space-y-8 bg-gradient-to-b from-[#141619] to-[#0C0D0F] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/50 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-4 sm:pb-6">
              <div>
                <span className="font-mono text-[9px] sm:text-[10px] text-[#D4AF37] uppercase tracking-wider sm:tracking-widest font-semibold block">
                  Protocolo Recomendado por Especialistas
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mt-1">{result.name}</h4>
              </div>
              <div className="md:text-right">
                <span className="font-mono text-[8px] sm:text-[9px] text-stone-500 uppercase tracking-widest block">Investimento Estimado</span>
                <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">R$ {result.price.toLocaleString('pt-BR')}</span>
              </div>
            </div>

            <p className="font-mono text-[11px] sm:text-xs text-stone-300 uppercase tracking-wider leading-relaxed">
              {result.description} • Desenvolvido com ativos de altíssima pureza e protocolo exclusivo da Dra. Eliana Becker.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-white/10">
              <button 
                onClick={() => { setStep(1); setResult(null); }} 
                className="w-full sm:w-auto text-stone-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest hover:text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer py-2 sm:py-0"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Refazer Simulação
              </button>
              <motion.button 
                onClick={() => onSelectProcedure(result)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all inline-flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
              >
                Agendar Este Protocolo <CheckCircle2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
