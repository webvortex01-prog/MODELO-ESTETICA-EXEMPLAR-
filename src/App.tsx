import { useState } from 'react';
import { motion } from 'motion/react';
import ClientApp from './components/ClientApp';
import AdminApp from './components/AdminApp';
import DemoWelcomeModal from './components/DemoWelcomeModal';
import ErrorBoundary from './components/ErrorBoundary';
import { Sparkles, Shield, HelpCircle, Zap } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'client' | 'admin'>('client');
  const [showDemoModal, setShowDemoModal] = useState<boolean>(true);

  return (
    <div className="flex flex-col h-screen bg-[#030303] text-[#E5E5E5] font-sans overflow-hidden selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      {/* Full-Screen Interactive Demo Guide Modal */}
      <DemoWelcomeModal 
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        onSelectView={(selectedView) => {
          setView(selectedView);
          setShowDemoModal(false);
        }}
      />

      {/* Top Navigation */}
      <header className="h-20 border-b border-[#D4AF37]/15 bg-[#08090C]/90 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 lg:px-12 shrink-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-black font-serif font-bold text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            L
          </div>
          <div>
            <h1 className="text-white font-serif text-xl md:text-2xl tracking-[0.2em] uppercase font-normal">
              Lumière
            </h1>
            <p className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF37] font-mono">
              Advanced Aesthetics
            </p>
          </div>
        </div>
        
        {/* Actions Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Re-open Demo Guide Button */}
          <motion.button
            onClick={() => setShowDemoModal(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-3.5 sm:px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer"
            title="Como testar o sistema de demonstração"
          >
            <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Guia Modo Demo</span>
            <span className="sm:hidden">Demo</span>
          </motion.button>

          {/* Rounded View Switcher Pill */}
          <div className="flex items-center p-1 rounded-full bg-stone-950/80 border border-[#D4AF37]/30 shadow-inner">
            <motion.button
              onClick={() => setView('client')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                view === 'client' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span className="hidden xs:inline">Experiência</span> Cliente
            </motion.button>
            <motion.button
              onClick={() => setView('admin')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                view === 'admin' 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span className="hidden xs:inline">Painel</span> Admin
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative w-full h-full">
        <div 
          className={`w-full h-full flex-1 flex flex-col ${view === 'client' ? 'flex' : 'hidden'}`}
          aria-hidden={view !== 'client'}
        >
          <ErrorBoundary 
            fallbackTitle="Vitrine do Cliente"
            fallbackMessage="Ocorreu uma pequena instabilidade na vitrine de agendamentos."
            onReset={() => setView('client')}
          >
            <ClientApp />
          </ErrorBoundary>
        </div>

        <div 
          className={`w-full h-full flex-1 flex flex-col ${view === 'admin' ? 'flex' : 'hidden'}`}
          aria-hidden={view !== 'admin'}
        >
          <ErrorBoundary 
            fallbackTitle="Painel Administrativo"
            fallbackMessage="Ocorreu uma pequena instabilidade no painel administrativo."
            onGoHome={() => setView('client')}
            onReset={() => setView('admin')}
          >
            <AdminApp onBackToClient={() => setView('client')} />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
