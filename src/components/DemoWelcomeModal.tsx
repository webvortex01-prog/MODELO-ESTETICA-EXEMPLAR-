import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Shield, Calendar, Users, Package, 
  CheckCircle2, ArrowRight, X, Play, Zap, HelpCircle, 
  Sliders, Award, FileSignature, MessageSquare 
} from 'lucide-react';

interface DemoWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (view: 'client' | 'admin') => void;
}

export default function DemoWelcomeModal({ isOpen, onClose, onSelectView }: DemoWelcomeModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'client' | 'admin'>('overview');

  if (!isOpen) return null;

  const handleStart = (view: 'client' | 'admin') => {
    onSelectView(view);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-[#16181D] to-[#0A0B0E] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[95vh] my-auto"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-60 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative p-3.5 sm:p-6 md:p-7 border-b border-[#D4AF37]/20 flex items-start justify-between gap-2.5 sm:gap-3 bg-black/40">
            <div className="space-y-1.5 sm:space-y-2 pr-1 sm:pr-2">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                <Zap className="w-3 h-3 text-[#D4AF37] shrink-0" />
                Ambiente de Demonstração Interativo
              </div>
              <h2 className="font-serif text-lg sm:text-2xl md:text-3xl text-white tracking-wide leading-snug sm:leading-tight">
                Seja Bem-Vindo ao Sistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB]">Lumière Aesthetics</span>
              </h2>
              <p className="font-mono text-[10px] sm:text-xs text-stone-300 tracking-normal sm:tracking-wider leading-relaxed max-w-2xl">
                Preparamos este ambiente 100% funcional para você testar na prática: do agendamento do paciente com assinatura digital ao painel administrativo.
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar guia"
              className="p-1.5 sm:p-2 rounded-full border border-stone-800 bg-stone-900/80 text-stone-400 hover:text-white hover:border-[#D4AF37]/50 transition-colors cursor-pointer shrink-0 mt-0.5"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Navigation Tabs inside Modal */}
          <div className="px-2 sm:px-8 py-2 sm:py-3 border-b border-stone-800/80 bg-black/40 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center p-1 rounded-xl sm:rounded-full bg-stone-950/90 border border-[#D4AF37]/30 shadow-inner gap-1 sm:gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-full text-[9px] sm:text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 cursor-pointer leading-none ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                }`}
              >
                <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>Como Funciona<span className="hidden sm:inline"> o Teste</span></span>
              </button>
              <button
                onClick={() => setActiveTab('client')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-full text-[9px] sm:text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 cursor-pointer leading-none ${
                  activeTab === 'client'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>1. Cliente (B2C)</span>
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-full text-[9px] sm:text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1 sm:gap-2 cursor-pointer leading-none ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                }`}
              >
                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>2. Admin (B2B)</span>
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-7 md:p-8 overflow-y-auto flex-1 space-y-4 sm:space-y-6 text-stone-300">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-start gap-2.5 sm:gap-3">
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="text-[11px] sm:text-xs font-mono leading-relaxed text-stone-200">
                    <strong className="text-[#D4AF37] block font-sans text-xs sm:text-sm mb-0.5">
                      Fique à vontade para interagir com tudo!
                    </strong>
                    Crie agendamentos de teste, preencha dados fictícios, assine termos na tela e alterne entre a visão do <strong>Cliente</strong> e do <strong>Administrador</strong> no topo superior a qualquer momento.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* Card 1: Cliente */}
                  <div 
                    onClick={() => setActiveTab('client')}
                    className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer group space-y-2 sm:space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider group-hover:underline flex items-center gap-1">
                        Ver recursos <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                      Experiência do Cliente
                    </h3>
                    <p className="font-mono text-[11px] sm:text-xs text-stone-400 leading-relaxed">
                      Carrosséis de tratamentos em 5 etapas, simulador de protocolos, antes & depois e fluxo completo de reserva com termo de consentimento digital.
                    </p>
                  </div>

                  {/* Card 2: Admin */}
                  <div 
                    onClick={() => setActiveTab('admin')}
                    className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer group space-y-2 sm:space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                        <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider group-hover:underline flex items-center gap-1">
                        Ver recursos <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                      Painel de Gestão Admin
                    </h3>
                    <p className="font-mono text-[11px] sm:text-xs text-stone-400 leading-relaxed">
                      Agenda clínica em tempo real, prontuários de pacientes, controle de estoque de insumos (Toxina, Fios, Bioestimuladores) e campanhas de reativação.
                    </p>
                  </div>
                </div>

                {/* Quick 3-Step Guide */}
                <div className="border-t border-stone-800/80 pt-4 sm:pt-5 space-y-2.5 sm:space-y-3">
                  <h4 className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-stone-400">
                    Roteiro Sugerido de Demonstração:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/70 space-y-1">
                      <span className="text-[#D4AF37] font-bold block text-[11px] sm:text-xs">1. Simule uma Consulta</span>
                      <p className="text-stone-400 text-[10px] sm:text-[11px]">Escolha um procedimento no carrossel e complete o agendamento com assinatura.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/70 space-y-1">
                      <span className="text-[#D4AF37] font-bold block text-[11px] sm:text-xs">2. Alterne para Admin</span>
                      <p className="text-stone-400 text-[10px] sm:text-[11px]">Clique em "Admin" no topo para ver seu agendamento refletido no sistema.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800/70 space-y-1">
                      <span className="text-[#D4AF37] font-bold block text-[11px] sm:text-xs">3. Gerencie o Estoque</span>
                      <p className="text-stone-400 text-[10px] sm:text-[11px]">Adicione um produto ou procedimento e veja a gestão estética completa.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'client' && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-serif text-base sm:text-lg text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                  Recursos na Experiência do Cliente:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Carrossel em 5 Etapas
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Navegue pelos procedimentos com fotos em alta definição, duração e valores em ciclo contínuo.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <Sliders className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Simulador de Protocolos
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Responda às perguntas interativas e receba uma recomendação estética personalizada imediata.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <FileSignature className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Assinatura Digital & Termo
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Teste o canvas de assinatura digital interativo na tela antes de finalizar o agendamento de consulta.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Clube VIP Lumière Black
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Clique no botão do Clube VIP para ver como funciona o programa de fidelidade e cashback.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="space-y-3 sm:space-y-4">
                <h3 className="font-serif text-base sm:text-lg text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                  Recursos no Painel Administrativo:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 font-mono text-xs">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Agenda & Atendimentos
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Visualize as consultas do dia, confirme agendamentos, status de pagamento e histórico de pacientes.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <Package className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Estoque de Insumos Clínicos
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Monitore frascos de toxina, seringas de ácido hialurônico, fios de PDO com avisos de reposição.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Catálogo & Novos Procedimentos
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Cadastre novos tratamentos, altere preços, durações e descrições para a vitrine.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-stone-950/60 border border-stone-800/80 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium text-xs sm:text-sm">
                      <MessageSquare className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      Campanhas & Reativação WhatsApp
                    </div>
                    <p className="text-stone-400 text-[10px] sm:text-[11px]">
                      Envie mensagens automáticas de retorno para manutenção e retoques dos pacientes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-3.5 sm:p-6 border-t border-[#D4AF37]/20 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shrink-0">
            <div className="text-[10px] sm:text-[11px] font-mono text-stone-400 text-center sm:text-left">
              💡 Reabra este guia quando quiser pelo botão <strong className="text-[#D4AF37]">"Guia"</strong> no topo.
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <motion.button
                onClick={() => handleStart('admin')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#D4AF37]/40 bg-stone-900/80 text-stone-200 hover:text-white hover:border-[#D4AF37] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                Abrir Painel Admin
              </motion.button>

              <motion.button
                onClick={() => handleStart('client')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black shrink-0" />
                Explorar Vitrine (Cliente)
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
