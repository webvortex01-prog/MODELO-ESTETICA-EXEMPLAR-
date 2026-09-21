import { useState } from 'react';
import { MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ReactivationCampaignsTab() {
  const [campaigns, setCampaigns] = useState([
    { id: 'c1', title: 'Reativação Toxina Botulínica (120 dias)', targetCount: 34, template: 'Olá {nome}, notamos que já se passaram 4 meses desde sua última aplicação de Botox. Que tal agendar sua revisão para manter o efeito impecável?', sent: false },
    { id: 'c2', title: 'Retorno Skinbooster & Hidratação', targetCount: 18, template: 'Olá {nome}, sua pele merece o protocolo de hidratação profunda Lumière. Agende esta semana com condição especial de membro Black Circle.', sent: false },
    { id: 'c3', title: 'Aniversariantes do Mês', targetCount: 12, template: 'Parabéns {nome}! A Lumière Clinic preparou um voucher exclusivo de R$ 150 para seu presente de aniversário.', sent: false }
  ]);

  const handleTrigger = (id: string) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, sent: true } : c));
    alert('Campanha de WhatsApp disparada com sucesso para a base de pacientes!');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-serif text-2xl text-white">Automação de Campanhas & Reativação (CRM)</h3>
          <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-1">Disparos inteligentes baseados no ciclo de vida do procedimento</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(camp => (
          <div key={camp.id} className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest">{camp.targetCount} Pacientes na Base</span>
                {camp.sent && <span className="font-mono text-[8px] text-green-400 uppercase flex items-center gap-1">✓ Disparada</span>}
              </div>
              <h4 className="font-serif text-xl text-white">{camp.title}</h4>
              <p className="font-mono text-[10px] text-stone-400 uppercase tracking-wider bg-[#141619] p-4 border border-stone-800 leading-relaxed">
                "{camp.template}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono text-[8px] text-stone-500 uppercase tracking-widest">Canal: WhatsApp API</span>
              <button 
                onClick={() => handleTrigger(camp.id)}
                className={`px-4 py-2 font-mono text-[9px] uppercase tracking-widest transition-all inline-flex items-center gap-2 ${
                  camp.sent 
                    ? 'bg-stone-800 text-stone-400 cursor-default' 
                    : 'bg-[#D4AF37] text-black hover:bg-white'
                }`}
              >
                <Send className="w-3 h-3" /> {camp.sent ? 'Reenviar' : 'Disparar Campanha'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
