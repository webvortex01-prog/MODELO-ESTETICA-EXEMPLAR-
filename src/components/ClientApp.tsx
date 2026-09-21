import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { procedures, availableTimes } from '../data';
import { ArrowRight, Calendar as CalendarIcon, CheckCircle2, Sparkles, Gem, Clock, Star, ShieldCheck, Copy, Check } from 'lucide-react';
import { Procedure } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';
import GallerySection from './GallerySection';
import ProtocolSimulator from './ProtocolSimulator';
import ClientLoyaltyModal from './ClientLoyaltyModal';
import DigitalConsentModal from './DigitalConsentModal';
import ProcedureCarousel from './ProcedureCarousel';

export default function ClientApp() {
  const [step, setStep] = useState(1);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [hasPreviousProcedure, setHasPreviousProcedure] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLoyalty, setShowLoyalty] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const bookingRef = useRef<HTMLDivElement>(null);
  const vitrineRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = (proc?: Procedure) => {
    if (proc) {
      setSelectedProcedure(proc);
      setStep(2);
    }
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleCopyPix = () => {
    navigator.clipboard?.writeText('00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913LumiereClinic6008BRASILIA62070503***63041234');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-[#030303] scroll-smooth text-stone-200">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 py-12 sm:py-20">
        {/* Abstract Glowing Auras */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="w-[320px] sm:w-[600px] md:w-[900px] h-[320px] sm:h-[600px] md:h-[900px] bg-gradient-to-tr from-[#D4AF37]/15 via-amber-600/5 to-transparent rounded-full blur-[100px] sm:blur-[140px] animate-pulse"></div>
          <div className="absolute top-1/4 -right-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-amber-500/5 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-1/4 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#D4AF37]/5 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6 sm:space-y-10 w-full">
          
          {/* Top Pill Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/15 to-stone-900 border border-[#D4AF37]/40 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)] max-w-full"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0 animate-spin-slow" />
            <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider sm:tracking-[0.35em] font-semibold truncate">
              Clínica de Estética Médica & Alta Performance
            </span>
          </motion.div>
          
          {/* Main Display Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tight leading-[1] sm:leading-[0.92]"
          >
            A Arte da <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] drop-shadow-[0_0_35px_rgba(212,175,55,0.3)]">
              Perfeição
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-stone-300 font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-wider sm:tracking-[0.25em] max-w-2xl mx-auto leading-relaxed px-2"
          >
            Harmonização facial sofisticada, rejuvenescimento de precisão e bioestímulo avançado. Protocolos exclusivos desenhados para a sua singularidade.
          </motion.p>
          
          {/* Rounded Action CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-md sm:max-w-none mx-auto"
          >
            <motion.button 
              onClick={() => scrollToBooking()} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] px-6 sm:px-10 py-3.5 sm:py-4.5 text-black font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-bold shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer text-center"
            >
              Agendar Avaliação
              <ArrowRight className="w-4 h-4 shrink-0" />
            </motion.button>

            <motion.button 
              onClick={() => vitrineRef.current?.scrollIntoView({ behavior: 'smooth' })} 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full sm:w-auto rounded-full border border-stone-700 bg-stone-900/60 hover:border-[#D4AF37]/70 px-6 sm:px-8 py-3.5 sm:py-4.5 text-stone-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] hover:text-white backdrop-blur-md transition-all cursor-pointer text-center"
            >
              Explorar Procedimentos
            </motion.button>
          </motion.div>

          {/* Luxury Micro-Highlights */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 max-w-3xl mx-auto border-t border-white/10 w-full"
          >
            <div className="flex items-center justify-center gap-2 text-stone-400 font-mono text-[10px] uppercase tracking-wider sm:tracking-widest">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37] shrink-0" />
              <span>4.9★ Excelência Médica</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-stone-400 font-mono text-[10px] uppercase tracking-wider sm:tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Insumos Originais Allergan</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-stone-400 font-mono text-[10px] uppercase tracking-wider sm:tracking-widest">
              <Gem className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Atendimento Exclusivo VIP</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
        </div>
      </section>

      {/* VITRINE (SHOWCASE) COM CARROSSEL DE PROCEDIMENTOS */}
      <section ref={vitrineRef} className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-16 bg-[#07080A] border-y border-[#D4AF37]/15 relative">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[9px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Catálogo Exclusivo
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif text-white tracking-tight">
                Nossos <br/><span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">Protocolos</span>
              </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <motion.button 
                onClick={() => setShowLoyalty(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-amber-950/40 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider sm:tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-black transition-all inline-flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer"
              >
                <Gem className="w-4 h-4 text-[#D4AF37]" /> Lumière Black Circle
              </motion.button>
              <p className="font-mono text-stone-500 text-[10px] uppercase tracking-[0.25em] max-w-xs text-left leading-relaxed hidden lg:block">
                Tecnologia, ciência e arte aplicadas para realçar sua beleza autêntica com naturalidade.
              </p>
            </div>
          </div>

          {/* DYNAMIC PROCEDURES CAROUSEL */}
          <ProcedureCarousel 
            procedures={procedures} 
            onSelectProcedure={(proc) => scrollToBooking(proc)} 
          />
        </div>
      </section>

      {/* PROTOCOL SIMULATOR SECTION */}
      <section className="py-28 px-6 lg:px-16 bg-[#040405] border-b border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto">
          <ProtocolSimulator procedures={procedures} onSelectProcedure={(proc) => scrollToBooking(proc)} />
        </div>
      </section>

      {/* GALLERY SECTION */}
      <GallerySection />

      {/* BEFORE / AFTER SECTION */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-16 bg-[#050607] border-b border-[#D4AF37]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.4em]">Resultados Clínicos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white tracking-tight">
              O Poder da <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">Transformação</span>
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider sm:tracking-widest max-w-lg mx-auto px-4">
              Arraste o divisor para comparar o antes e o pós-imediato com protocolo exclusivo.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80" 
              afterImage="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1000&q=80" 
            />
            <p className="font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider sm:tracking-widest mt-4 sm:mt-6 text-center px-4">
              Protocolo: Harmonização Facial Global + Preenchimento Labial Russo
            </p>
          </div>
        </div>
      </section>

      {/* BOOKING ENGINE */}
      <section id="booking-section" ref={bookingRef} className="py-16 sm:py-24 md:py-32 px-3 sm:px-6 lg:px-16 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              <CalendarIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.4em]">Reserva Oficial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-white tracking-tight">
              Reserve seu <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">Horário</span>
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] text-stone-400 uppercase tracking-wider sm:tracking-widest max-w-lg mx-auto px-4">
              Agendamento em tempo real com garantia de horário e atendimento exclusivo.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#101216] via-[#0A0A0C] to-[#050507] border border-[#D4AF37]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-14 shadow-[0_0_70px_rgba(212,175,55,0.1)] relative overflow-hidden">
            {/* Progress Bar with Curved Endpoints */}
            {!isSubmitted && (
              <div className="absolute top-0 left-0 w-full h-1.5 bg-stone-900">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]"
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            )}

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 sm:py-16 space-y-6 sm:space-y-8"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto bg-[#D4AF37]/10 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37]" />
                </div>
                <div className="space-y-3 px-2">
                  <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">Reserva Solicitada com Sucesso</h3>
                  <p className="font-mono text-stone-400 max-w-lg mx-auto text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest leading-relaxed">
                    Sua solicitação de agendamento foi recebida com sucesso. Nossa Concierge entrará em contato em instantes via WhatsApp para as confirmações finais e recepção.
                  </p>
                </div>
                
                <motion.button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setStep(1);
                    setSelectedProcedure(null);
                    setSelectedDate('');
                    setSelectedTime('');
                    setName('');
                    setPhone('');
                    setIsSigned(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full border border-[#D4AF37] text-[#D4AF37] font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-semibold hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-lg"
                >
                  Novo Agendamento
                </motion.button>
              </motion.div>
            ) : (
              <div className="relative z-10">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 sm:space-y-10"
                  >
                    <div>
                      <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] mb-1.5 sm:mb-2 block font-semibold">Passo 01 de 04</span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">Qual procedimento deseja realizar?</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-h-[460px] overflow-y-auto pr-1 sm:pr-2">
                      {procedures.map(proc => {
                        const isSelected = selectedProcedure?.id === proc.id;
                        return (
                          <motion.button
                            key={proc.id}
                            onClick={() => setSelectedProcedure(proc)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className={`text-left p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                              isSelected 
                                ? 'border-[#D4AF37] bg-[#D4AF37]/15 shadow-[0_0_25px_rgba(212,175,55,0.2)]' 
                                : 'border-stone-800 bg-stone-950/60 hover:border-stone-600 hover:bg-stone-900/50'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2 relative z-10">
                              <h4 className={`font-serif text-lg sm:text-xl tracking-wide transition-colors pr-2 ${isSelected ? 'text-[#D4AF37]' : 'text-white'}`}>
                                {proc.name}
                              </h4>
                              {isSelected && (
                                <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shrink-0">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-wider sm:tracking-widest leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                              {proc.description}
                            </p>
                            <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                              <span className="text-stone-500">{proc.durationMinutes} min</span>
                              <span className="text-[#D4AF37] font-serif text-base">R$ {proc.price.toLocaleString('pt-BR')}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    <div className="pt-4 sm:pt-6 flex justify-end">
                      <motion.button 
                        disabled={!selectedProcedure}
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
                      >
                        Continuar <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 sm:space-y-10"
                  >
                    <div>
                      <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] mb-1.5 sm:mb-2 block font-semibold">Passo 02 de 04</span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">Defina a Data e Horário</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                      <div>
                        <label className="block font-mono text-[10px] sm:text-[11px] uppercase text-stone-400 mb-3 sm:mb-4 tracking-wider sm:tracking-[0.2em]">
                          Selecione a Data Preferida
                        </label>
                        <div className="relative rounded-xl sm:rounded-2xl border border-stone-800 bg-stone-900/50 p-3.5 sm:p-4 focus-within:border-[#D4AF37] transition-all">
                          <div className="flex items-center gap-3">
                            <CalendarIcon className="w-5 h-5 text-[#D4AF37] shrink-0" />
                            <input 
                              type="date" 
                              onChange={(e) => setSelectedDate(e.target.value)}
                              value={selectedDate}
                              className="w-full bg-transparent text-white focus:outline-none font-mono text-sm cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className={selectedDate ? 'opacity-100 transition-opacity duration-500' : 'opacity-25 pointer-events-none'}>
                        <label className="block font-mono text-[10px] sm:text-[11px] uppercase text-stone-400 mb-3 sm:mb-4 tracking-wider sm:tracking-[0.2em]">
                          Horários com Especialista
                        </label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {availableTimes.map(time => {
                            const isSelected = selectedTime === time;
                            return (
                              <motion.button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`py-2.5 sm:py-3.5 rounded-xl font-mono text-[11px] sm:text-xs transition-all duration-300 border cursor-pointer ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                    : 'border-stone-800 bg-stone-950/80 text-stone-400 hover:border-[#D4AF37]/50 hover:text-white'
                                }`}
                              >
                                {time}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-stone-800/80">
                      <button 
                        onClick={handleBack}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 transition-all font-mono text-xs uppercase tracking-widest cursor-pointer text-center"
                      >
                        Voltar
                      </button>
                      <motion.button 
                        disabled={!selectedDate || !selectedTime}
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
                      >
                        Continuar <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 sm:space-y-10"
                  >
                    <div>
                      <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] mb-1.5 sm:mb-2 block font-semibold">Passo 03 de 04</span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">Seus Dados & Termo de Consentimento</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-10">
                      <div className="md:col-span-3 space-y-4 sm:space-y-6">
                        <div>
                          <label className="block font-mono text-[10px] uppercase text-stone-400 mb-1.5 sm:mb-2 tracking-widest">Nome Completo</label>
                          <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex: Dra. Camila Sampaio" 
                            className="w-full rounded-xl sm:rounded-2xl border border-stone-800 bg-stone-900/50 px-4 sm:px-5 py-3.5 sm:py-4 text-white font-sans text-base focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-stone-600" 
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase text-stone-400 mb-1.5 sm:mb-2 tracking-widest">WhatsApp / Celular</label>
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(11) 99999-9999" 
                            className="w-full rounded-xl sm:rounded-2xl border border-stone-800 bg-stone-900/50 px-4 sm:px-5 py-3.5 sm:py-4 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-stone-600" 
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase text-stone-400 mb-1.5 sm:mb-2 tracking-widest">CPF (Para Prontuário Médico)</label>
                          <input 
                            type="text" 
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="000.000.000-00" 
                            className="w-full rounded-xl sm:rounded-2xl border border-stone-800 bg-stone-900/50 px-4 sm:px-5 py-3.5 sm:py-4 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all placeholder:text-stone-600" 
                          />
                        </div>

                        <div className="pt-1 sm:pt-2 flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="anamnese" 
                            checked={hasPreviousProcedure}
                            onChange={(e) => setHasPreviousProcedure(e.target.checked)}
                            className="w-5 h-5 accent-[#D4AF37] rounded cursor-pointer shrink-0" 
                          />
                          <label htmlFor="anamnese" className="font-mono text-xs text-stone-400 uppercase tracking-wider sm:tracking-widest cursor-pointer leading-snug">
                            Já realizei procedimento estético anteriormente
                          </label>
                        </div>
                      </div>

                      {/* Resumo Card */}
                      <div className="md:col-span-2">
                        <div className="p-5 sm:p-7 rounded-xl sm:rounded-2xl bg-stone-950/90 border border-[#D4AF37]/30 h-full flex flex-col justify-between shadow-lg">
                          <div className="space-y-4 sm:space-y-5">
                            <h4 className="font-mono text-[10px] uppercase text-[#D4AF37] tracking-[0.3em] pb-3 border-b border-[#D4AF37]/20 font-semibold">
                              Resumo da Reserva
                            </h4>
                            <div>
                              <p className="font-mono text-[9px] uppercase text-stone-500 tracking-widest mb-1">Procedimento</p>
                              <p className="text-white font-serif text-base sm:text-lg">{selectedProcedure?.name}</p>
                            </div>
                            <div>
                              <p className="font-mono text-[9px] uppercase text-stone-500 tracking-widest mb-1">Data e Hora</p>
                              <p className="text-white font-mono text-xs">
                                {selectedDate} • {selectedTime}
                              </p>
                            </div>
                            <div>
                              <p className="font-mono text-[9px] uppercase text-stone-500 tracking-widest mb-1">Valor Total</p>
                              <p className="text-stone-300 font-serif text-base sm:text-lg">R$ {selectedProcedure?.price.toLocaleString('pt-BR')}</p>
                            </div>
                          </div>

                          <div className="pt-4 sm:pt-6 border-t border-[#D4AF37]/20 mt-4 sm:mt-6">
                            <p className="font-mono text-[9px] uppercase text-stone-400 tracking-widest mb-1">Sinal de Garantia (20%)</p>
                            <p className="text-[#D4AF37] font-serif text-xl sm:text-2xl font-normal">
                              R$ {((selectedProcedure?.price || 0) * 0.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-stone-800/80">
                      <button 
                        onClick={handleBack}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 transition-all font-mono text-xs uppercase tracking-widest cursor-pointer text-center"
                      >
                        Voltar
                      </button>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        {!isSigned ? (
                          <motion.button 
                            disabled={!name || !phone}
                            onClick={() => setShowConsentModal(true)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-[#D4AF37] text-[#D4AF37] font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.2em] font-semibold hover:bg-[#D4AF37] hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-center"
                          >
                            Assinar Termo (TCLE) Digital
                          </motion.button>
                        ) : (
                          <span className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/40 font-mono text-xs text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Termo Assinado
                          </span>
                        )}

                        <motion.button 
                          disabled={!name || !phone || !isSigned}
                          onClick={handleNext}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
                        >
                          Ir para Pagamento <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Pagamento */}
                {step === 4 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 sm:space-y-10"
                  >
                    <div className="text-center space-y-2 px-2">
                      <span className="font-mono text-[#D4AF37] text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em] block font-semibold">Passo 04 de 04</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white tracking-wide">Garantia de Reserva</h3>
                      <p className="font-mono text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider sm:tracking-widest max-w-md mx-auto">
                        Para confirmar o bloqueio de horário na agenda da equipe médica, realize o sinal de 20%.
                      </p>
                    </div>

                    <div className="max-w-xl mx-auto grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-[0_0_25px_rgba(212,175,55,0.2)]">
                        <span className="font-serif text-xl sm:text-2xl text-[#D4AF37]">PIX</span>
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-[#D4AF37] font-semibold text-center">Aprovação Imediata</span>
                      </div>
                      <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-stone-800 bg-stone-950/60 text-stone-400">
                        <span className="font-serif text-xl sm:text-2xl text-stone-300">Cartão</span>
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-stone-500 text-center">Na Recepção</span>
                      </div>
                    </div>
                    
                    <div className="max-w-md mx-auto text-center space-y-4 sm:space-y-6 bg-stone-950/90 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#D4AF37]/30 shadow-xl">
                      <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto bg-white p-2.5 sm:p-3 rounded-2xl shadow-md">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913LumiereClinic6008BRASILIA62070503***63041234`} 
                          alt="QR Code PIX" 
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      
                      <div>
                        <span className="font-mono text-[9px] sm:text-[10px] text-stone-500 uppercase tracking-widest block mb-1">
                          Valor do Sinal (20%)
                        </span>
                        <span className="font-serif text-2xl sm:text-3xl text-[#D4AF37]">
                          R$ {((selectedProcedure?.price || 0) * 0.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <motion.button 
                        onClick={handleCopyPix}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-stone-900 border border-stone-700 text-stone-300 font-mono text-[10px] uppercase tracking-wider sm:tracking-widest hover:border-[#D4AF37] hover:text-white transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {copiedPix ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                        <span className="truncate">{copiedPix ? 'Código PIX Copiado!' : 'Copiar Código Copia e Cola'}</span>
                      </motion.button>
                    </div>

                    <div className="pt-6 sm:pt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 border-t border-stone-800/80">
                      <button 
                        onClick={handleBack}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 transition-all font-mono text-xs uppercase tracking-widest cursor-pointer text-center"
                      >
                        Voltar
                      </button>
                      <motion.button 
                        onClick={() => {
                          setIsSubmitted(true);
                          const msg = `✨ *CONFIRMAÇÃO DE AGENDAMENTO - LUMIÈRE CLINIC*\n👤 *Paciente:* ${name} | 📱 *Tel:* ${phone}\n🩺 *Procedimento:* ${selectedProcedure?.name}\n📅 *Data/Hora:* ${selectedDate} às ${selectedTime}\n💳 *Sinal (20%):* R$ ${((selectedProcedure?.price || 0) * 0.2).toFixed(2)} via PIX\n📝 *TCLE:* Termo Digital Assinado`;
                          const url = `https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`;
                          window.open(url, '_blank');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
                      >
                        Confirmar Pagamento <CheckCircle2 className="w-4 h-4 shrink-0" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D4AF37]/15 bg-[#050607] pt-16 sm:pt-24 pb-10 sm:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center space-y-8 sm:space-y-10">
          <div className="space-y-2">
            <h2 className="text-[#D4AF37] font-serif text-2xl sm:text-3xl md:text-4xl tracking-widest uppercase">Lumière</h2>
            <p className="font-mono text-stone-500 text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.3em]">Aesthetics & Advanced Longevity Clinic</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <a href="#" className="text-stone-400 hover:text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] transition-colors">Instagram</a>
            <a href="#" className="text-stone-400 hover:text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] transition-colors">WhatsApp Concierge</a>
            <a href="#" className="text-stone-400 hover:text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] transition-colors">Corpo Clínico</a>
            <a href="#" className="text-stone-400 hover:text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-[0.25em] transition-colors">Termos & Privacidade</a>
          </div>
          
          <div className="w-16 sm:w-24 h-[1px] bg-stone-800"></div>
          
          <p className="text-stone-600 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-[0.35em] leading-relaxed max-w-xl">
            © {new Date().getFullYear()} Lumière Clinic. Todos os direitos reservados. RT: Dra. Eliana Becker CRM/SP 148.920.
          </p>
        </div>
      </footer>

      {showLoyalty && (
        <ClientLoyaltyModal onClose={() => setShowLoyalty(false)} />
      )}

      {showConsentModal && (
        <DigitalConsentModal 
          procedureName={selectedProcedure?.name || 'Procedimento Estético'} 
          clientName={name}
          onClose={() => setShowConsentModal(false)} 
          onSigned={() => setIsSigned(true)} 
        />
      )}
    </div>
  );
}
