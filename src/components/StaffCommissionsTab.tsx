import { useState } from 'react';
import { Award, CheckCircle2, DollarSign } from 'lucide-react';
import { Appointment } from '../types';

interface StaffCommissionsTabProps {
  appointments?: Appointment[];
}

export default function StaffCommissionsTab({ appointments = [] }: StaffCommissionsTabProps) {
  const [staffList, setStaffList] = useState([
    { id: 'st1', name: 'Dra. Eliana Becker', role: 'Dermatologista & Esteta', commissionRate: 35, proceduresCount: 42, totalGenerated: 84000 },
    { id: 'st2', name: 'Dr. Lucas Mendes', role: 'Biomédico Esteta', commissionRate: 30, proceduresCount: 28, totalGenerated: 56000 },
    { id: 'st3', name: 'Mariana Souza', role: 'Fisioterapeuta Dermatofuncional', commissionRate: 25, proceduresCount: 35, totalGenerated: 35000 }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleApprove = (staffName: string, value: number) => {
    setNotification(`Repasse de R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} liberado com sucesso para ${staffName}!`);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h3 className="font-serif text-2xl text-white">Comissões & Repasses de Equipe</h3>
          <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-1">
            Cálculo automático de repasses e produtividade dos especialistas
          </p>
        </div>
        <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-4 py-2 font-mono text-[10px] uppercase text-[#D4AF37] self-start sm:self-auto">
          Fechamento Mensal: Setembro/2026
        </div>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staffList.map(staff => {
          const commissionVal = (staff.totalGenerated * staff.commissionRate) / 100;
          return (
            <div key={staff.id} className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 space-y-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif text-xl text-white">{staff.name}</h4>
                    <p className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest mt-1">{staff.role}</p>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <Award className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-stone-500 uppercase tracking-widest">Procedimentos Realizados:</span>
                    <span className="text-white font-bold">{staff.proceduresCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 uppercase tracking-widest">Faturamento Gerado:</span>
                    <span className="text-white font-bold">R$ {Number(staff.totalGenerated).toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500 uppercase tracking-widest">Taxa de Comissão:</span>
                    <span className="text-[#D4AF37] font-bold">{staff.commissionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[8px] text-stone-500 uppercase tracking-widest block">Comissão a Pagar</span>
                  <span className="font-serif text-xl text-[#D4AF37]">R$ {Number(commissionVal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => handleApprove(staff.name, commissionVal)}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-[#D4AF37] text-black font-mono text-[9px] uppercase tracking-widest hover:bg-white transition-all cursor-pointer font-bold text-center"
                >
                  Liberar Repasse
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
