import { useState } from 'react';
import { procedures as initialProcedures, todayAppointments } from '../data';
import { 
  Users, Calendar as CalendarIcon, TrendingUp, 
  List, Edit2, Trash2, Package, DollarSign, MessageSquare, ShieldCheck, FileText, CheckCircle2, AlertCircle, Award, Send
} from 'lucide-react';
import { Procedure, Appointment } from '../types';
import StaffCommissionsTab from './StaffCommissionsTab';
import ReactivationCampaignsTab from './ReactivationCampaignsTab';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  cost: number;
}

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [procs, setProcs] = useState<Procedure[]>(initialProcedures);
  const [appointments, setAppointments] = useState<Appointment[]>(todayAppointments);

  const [isAddingProc, setIsAddingProc] = useState(false);
  const [procForm, setProcForm] = useState<Partial<Procedure>>({});

  // Inventory state
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'inv1', name: 'Toxina Botulínica Botox 100U', category: 'Toxina', quantity: 12, minQuantity: 5, unit: 'Frascos', cost: 850 },
    { id: 'inv2', name: 'Ácido Hialurônico Juvederm Voluma', category: 'Preenchimento', quantity: 18, minQuantity: 6, unit: 'Seringas', cost: 620 },
    { id: 'inv3', name: 'Ácido Hialurônico Restylane Lyft', category: 'Preenchimento', quantity: 14, minQuantity: 4, unit: 'Seringas', cost: 580 },
    { id: 'inv4', name: 'Sculptra (Bioestimulador)', category: 'Bioestimulador', quantity: 8, minQuantity: 3, unit: 'Frascos', cost: 980 },
    { id: 'inv5', name: 'Fios de PDO Espiculados', category: 'Fios', quantity: 25, minQuantity: 10, unit: 'Unidades', cost: 150 },
    { id: 'inv6', name: 'Agulhas e Cânulas 22G/25G', category: 'Descartáveis', quantity: 120, minQuantity: 30, unit: 'Unidades', cost: 12 }
  ]);

  // Selected Patient for Medical Record Modal
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);

  const handleSaveProc = () => {
    if (procForm.id) {
      setProcs(procs.map(p => p.id === procForm.id ? { ...p, ...procForm } as Procedure : p));
    } else {
      setProcs([...procs, { ...procForm, id: `p${Date.now()}` } as Procedure]);
    }
    setIsAddingProc(false);
    setProcForm({});
  };

  const handleDeleteProc = (id: string) => {
    setProcs(procs.filter(p => p.id !== id));
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#D4AF37]/20 bg-[#0A0A0A] flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-[#D4AF37]/15">
          <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.4em] block mb-1">Painel Executivo</span>
          <h2 className="font-serif text-xl tracking-wide text-white">Lumière Admin</h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          {[
            { id: 'dashboard', label: 'Visão Geral & KPIs', icon: TrendingUp },
            { id: 'agenda', label: 'Agenda Master', icon: CalendarIcon },
            { id: 'clients', label: 'CRM & Prontuários', icon: Users },
            { id: 'procedures', label: 'Catálogo de Serviços', icon: List },
            { id: 'inventory', label: 'Estoque & Insumos', icon: Package },
            { id: 'finance', label: 'Fluxo de Caixa', icon: DollarSign },
            { id: 'commissions', label: 'Comissões & Equipe', icon: Award },
            { id: 'reactivation', label: 'Campanhas de Reativação', icon: Send }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 transition-all duration-300 text-left ${
                activeTab === item.id 
                  ? 'bg-[#D4AF37]/15 border-r-2 border-[#D4AF37] text-[#D4AF37]' 
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-[10px] font-medium uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-6 mt-auto border-t border-[#D4AF37]/10">
          <div className="bg-[#D4AF37]/5 p-4 border border-[#D4AF37]/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase text-[#D4AF37] tracking-widest">Especialista Ativa</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-sm font-serif font-medium text-white">Dra. Eliana Becker</p>
            <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">CRM-SP 184920</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto space-y-8 flex flex-col relative bg-[#050505]">
        
        {/* TOPBAR MOBILE/HEADER */}
        <div className="flex justify-between items-center pb-6 border-b border-[#D4AF37]/10">
          <div>
            <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.3em] block">Central de Operações B2B</span>
            <h1 className="font-serif text-3xl text-white tracking-tight">
              {activeTab === 'dashboard' && 'Visão Geral Executiva'}
              {activeTab === 'agenda' && 'Agenda Master & Sala de Procedimentos'}
              {activeTab === 'clients' && 'CRM de Pacientes & Anamnese'}
              {activeTab === 'procedures' && 'Gestão de Procedimentos'}
              {activeTab === 'inventory' && 'Controle de Estoque & Insumos'}
              {activeTab === 'finance' && 'Fluxo de Caixa & Sinais de Garantia'}
              {activeTab === 'commissions' && 'Comissões & Repasses de Equipe'}
              {activeTab === 'reactivation' && 'Campanhas de Reativação'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#141619] border border-[#D4AF37]/30 px-4 py-2 font-mono text-[10px] uppercase text-[#D4AF37] tracking-widest">
              Unidade Jardins • SP
            </div>
          </div>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
                <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Faturamento Estimado Mês</p>
                <p className="text-3xl font-serif text-white mb-2">R$ 148.500</p>
                <p className="text-[10px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-1">
                  <span>▲ +18.4%</span> vs mês anterior
                </p>
              </div>
              
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
                <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Consultas Agendadas Hoje</p>
                <p className="text-3xl font-serif text-white mb-2">08 Pacientes</p>
                <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">2 horários livres na tarde</p>
              </div>

              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none"></div>
                <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Taxa de Retorno (LTV)</p>
                <p className="text-3xl font-serif text-white mb-2">74.2%</p>
                <p className="text-[10px] font-mono text-green-500 uppercase tracking-widest">Meta de retenção atingida</p>
              </div>

              <div className="bg-gradient-to-br from-[#D4AF37] to-[#997A15] p-6 text-black shadow-2xl flex flex-col justify-center">
                <p className="text-[10px] font-mono uppercase font-bold mb-1 tracking-widest text-black/80">Procedimento Top Ticket</p>
                <p className="text-xl font-bold italic font-serif">Harmonização Full Face</p>
                <p className="text-[10px] font-mono mt-2 font-medium tracking-wide">Média: R$ 7.500 por sessão</p>
              </div>
            </div>

            {/* Upcoming Appointments & Revenue breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#D4AF37]/15 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-[#D4AF37]/15 flex justify-between items-center">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white">Agenda Prioritária de Hoje</h3>
                  <button onClick={() => setActiveTab('agenda')} className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] cursor-pointer hover:text-white transition-colors">VER CALENDÁRIO MASTER</button>
                </div>
                
                <div className="p-6 space-y-4">
                  {appointments.map(app => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-[#141619] border border-white/5 hover:border-[#D4AF37]/40 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]"></div>
                        <div>
                          <p className="text-sm font-medium text-white">{app.clientName}</p>
                          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{app.procedureName}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div>
                          <p className="text-sm font-mono text-white">{app.time}</p>
                          <span className="text-[9px] font-mono text-green-400 uppercase tracking-widest bg-green-950/40 px-2 py-0.5 border border-green-500/20">Confirmado</span>
                        </div>
                        <button 
                          onClick={() => {
                            const msg = `Olá ${app.clientName}, confirmamos seu atendimento hoje às ${app.time} na Lumière Clinic. Estamos aguardando você! ✨`;
                            window.open(`https://wa.me/55${app.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                          className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
                          title="Enviar WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions / Inventory Alert */}
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 flex flex-col shadow-2xl p-6 justify-between">
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white mb-6">Alertas Operacionais</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-amber-200">Estoque de Botox Baixo</p>
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-1">Apenas 2 frascos restantes. Reposição sugerida.</p>
                      </div>
                    </div>

                    <div className="p-4 bg-[#141619] border border-white/5 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-white">Anamneses Pendentes</p>
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider mt-1">Todos os pacientes de hoje assinaram o termo digital.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#D4AF37]/10">
                  <button 
                    onClick={() => setActiveTab('inventory')}
                    className="w-full py-3 bg-[#D4AF37] text-black font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all text-center block"
                  >
                    Gerenciar Estoque Completo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENDA MASTER TAB */}
        {activeTab === 'agenda' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white mb-2">Grade de Horários & Salas</h1>
                <p className="text-stone-400 text-sm">Gerenciamento em tempo real da agenda da Dra. Eliana Becker.</p>
              </div>
              <button className="px-6 py-3 bg-[#D4AF37] text-black font-mono text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                + Bloquear Horário / Pausa
              </button>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl">
               <div className="grid grid-cols-1 divide-y divide-white/5">
                 {['09:00', '10:00', '11:00', '12:00 (Almoço)', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => {
                    const isLunch = time.includes('Almoço');
                    const apt = appointments.find(a => a.time === time.split(' ')[0]);
                    return (
                       <div key={time} className="flex gap-6 py-5 items-center">
                          <div className="font-mono text-[#D4AF37] w-32 text-sm">{time}</div>
                          <div className="flex-1">
                             {isLunch ? (
                                <div className="bg-[#141619] border border-stone-800 p-4 text-stone-500 font-mono text-[10px] uppercase tracking-widest">
                                   Intervalo de Almoço & Descanso (Bloqueado)
                                </div>
                             ) : apt ? (
                                <div className="bg-[#141619] border border-[#D4AF37]/40 p-4 flex justify-between items-center shadow-lg">
                                   <div>
                                      <div className="flex items-center gap-3">
                                        <p className="text-white font-medium">{apt.clientName}</p>
                                        <span className="text-[8px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 uppercase tracking-widest">Sinal Pago (20%)</span>
                                      </div>
                                      <p className="text-stone-400 text-[10px] font-mono uppercase tracking-widest mt-1">{apt.procedureName} • 📱 {apt.clientPhone}</p>
                                   </div>
                                   <div className="flex items-center gap-3">
                                      <button 
                                        onClick={() => {
                                          const msg = `Olá ${apt.clientName}, confirmamos seu agendamento para hoje às ${apt.time} na Lumière Clinic.`;
                                          window.open(`https://wa.me/55${apt.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                                        }}
                                        className="px-3 py-1.5 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[9px] uppercase tracking-widest transition-all"
                                      >
                                        WhatsApp
                                      </button>
                                      <button className="px-3 py-1.5 border border-stone-700 text-stone-400 hover:text-white font-mono text-[9px] uppercase tracking-widest">Reagendar</button>
                                   </div>
                                </div>
                             ) : (
                                <div className="bg-transparent border border-dashed border-stone-800 p-4 flex justify-between items-center hover:border-[#D4AF37]/30 transition-colors">
                                   <p className="text-stone-600 font-mono text-[10px] uppercase tracking-widest">Horário Disponível para Encaixe</p>
                                   <button className="text-[10px] font-mono text-red-400 border border-red-500/20 px-3 py-1 hover:bg-red-500/10 uppercase tracking-widest">Bloquear Agenda</button>
                                </div>
                             )}
                          </div>
                       </div>
                    );
                 })}
               </div>
            </div>
          </div>
        )}

        {/* CRM TAB */}
        {activeTab === 'clients' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white mb-2">Prontuários & Anamnese Elite</h1>
                <p className="text-stone-400 text-sm">Histórico médico, fichas de avaliação e histórico fotográfico dos pacientes.</p>
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl overflow-x-auto">
               <table className="w-full text-left text-sm text-stone-300 font-mono uppercase tracking-widest">
                  <thead className="text-[9px] text-[#D4AF37] border-b border-[#D4AF37]/15">
                     <tr>
                        <th className="py-4">Nome do Paciente</th>
                        <th className="py-4">WhatsApp / Contato</th>
                        <th className="py-4">Procedimento Recorrente</th>
                        <th className="py-4">Anamnese</th>
                        <th className="py-4 text-right">Prontuário</th>
                     </tr>
                  </thead>
                  <tbody>
                     {appointments.map((app, idx) => (
                        <tr key={`crm-row-${idx}`} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                           <td className="py-4 text-white font-medium">{app.clientName}</td>
                           <td className="py-4 text-stone-400">{app.clientPhone}</td>
                           <td className="py-4 text-white">{app.procedureName}</td>
                           <td className="py-4">
                             <span className="text-green-400 bg-green-950/40 border border-green-500/20 px-2.5 py-1 text-[9px]">Aprovado & Assinado</span>
                           </td>
                           <td className="py-4 text-right">
                              <button 
                                onClick={() => setSelectedPatient(app)}
                                className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[9px] uppercase tracking-widest transition-all"
                              >
                                Ver Prontuário
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Patient Medical Record Modal */}
            {selectedPatient && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
                <div className="bg-[#0A0A0A] border border-[#D4AF37] max-w-2xl w-full p-8 relative shadow-2xl space-y-6">
                  <button 
                    onClick={() => setSelectedPatient(null)}
                    className="absolute top-4 right-4 text-stone-400 hover:text-[#D4AF37] font-mono text-sm"
                  >
                    ✕
                  </button>

                  <div className="border-b border-[#D4AF37]/20 pb-4">
                    <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest">Prontuário Médico Digital</span>
                    <h3 className="font-serif text-3xl text-white mt-1">{selectedPatient.clientName}</h3>
                    <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-1">Contato: {selectedPatient.clientPhone} | CPF: 482.931.***-**</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#141619] p-4 border border-white/5">
                      <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Último Procedimento</p>
                      <p className="text-white text-sm font-medium">{selectedPatient.procedureName}</p>
                    </div>
                    <div className="bg-[#141619] p-4 border border-white/5">
                      <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Status de Alergia</p>
                      <p className="text-green-400 text-sm font-medium">Nenhuma restrição relatada</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">Histórico de Anamnese & Observações da Dra.</p>
                    <div className="bg-[#141619] p-4 border border-white/5 text-xs text-stone-300 font-mono leading-relaxed">
                      Paciente relata desejo de naturalidade e sustentação no terço médio da face. Pele íntegra, sem contraindicações para ácido hialurônico de alta reticulação. Retorno agendado para 14 dias para revisão clínica.
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                    <button 
                      onClick={() => {
                        const msg = `Olá ${selectedPatient.clientName}, aqui é da Lumière Clinic. Como está sendo a recuperação do seu procedimento? Estamos à disposição! ✨`;
                        window.open(`https://wa.me/55${selectedPatient.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className="px-6 py-3 bg-[#D4AF37] text-black font-mono text-[9px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Enviar Mensagem Pós-Procedimento
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROCEDURES TAB */}
        {activeTab === 'procedures' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white mb-2">Catálogo de Procedimentos</h1>
                <p className="text-stone-400 text-sm">Gerencie preços, tempos de sessão e descrições exibidas no portal B2C.</p>
              </div>
              <button onClick={() => { setProcForm({}); setIsAddingProc(true); }} className="px-6 py-3 bg-[#D4AF37] text-black font-mono text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2">
                + Novo Procedimento
              </button>
            </div>
            
            {isAddingProc && (
               <div className="bg-[#0A0A0A] border border-[#D4AF37] p-8 shadow-2xl mb-8 animate-in fade-in">
                  <h3 className="font-serif text-2xl text-white mb-6">{procForm.id ? 'Editar Procedimento' : 'Novo Procedimento Elite'}</h3>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                     <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-2 tracking-widest">Nome do Procedimento</label>
                        <input type="text" value={procForm.name || ''} onChange={(e) => setProcForm({...procForm, name: e.target.value})} className="w-full bg-[#141619] border border-stone-800 p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" placeholder="Ex: Preenchimento Labial" />
                     </div>
                     <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-2 tracking-widest">Categoria</label>
                        <select value={procForm.category || 'other'} onChange={(e) => setProcForm({...procForm, category: e.target.value as any})} className="w-full bg-[#141619] border border-stone-800 p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm">
                           <option value="toxin">Toxina</option>
                           <option value="filler">Preenchimento</option>
                           <option value="biostimulator">Bioestimulador</option>
                           <option value="other">Outros</option>
                        </select>
                     </div>
                     <div className="col-span-2">
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-2 tracking-widest">Descrição Refinada</label>
                        <textarea value={procForm.description || ''} onChange={(e) => setProcForm({...procForm, description: e.target.value})} className="w-full bg-[#141619] border border-stone-800 p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm h-24" placeholder="Detalhes técnicos para o paciente..."></textarea>
                     </div>
                     <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-2 tracking-widest">Duração (minutos)</label>
                        <input type="number" value={procForm.durationMinutes || ''} onChange={(e) => setProcForm({...procForm, durationMinutes: parseInt(e.target.value)})} className="w-full bg-[#141619] border border-stone-800 p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" />
                     </div>
                     <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-2 tracking-widest">Valor (R$)</label>
                        <input type="number" value={procForm.price || ''} onChange={(e) => setProcForm({...procForm, price: parseFloat(e.target.value)})} className="w-full bg-[#141619] border border-stone-800 p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" />
                     </div>
                  </div>
                  <div className="flex justify-end gap-4">
                     <button onClick={() => setIsAddingProc(false)} className="px-6 py-3 border border-stone-700 text-stone-400 font-mono uppercase tracking-widest text-[10px] hover:text-white">Cancelar</button>
                     <button onClick={handleSaveProc} className="px-6 py-3 bg-[#D4AF37] text-black font-mono uppercase tracking-widest text-[10px] hover:bg-white">Salvar Procedimento</button>
                  </div>
               </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {procs.map(proc => (
                 <div key={proc.id} className="bg-[#0A0A0A] border border-[#D4AF37]/15 flex flex-col shadow-2xl p-6 group hover:border-[#D4AF37]/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                       <h3 className="font-serif text-xl text-white">{proc.name}</h3>
                       <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1">{proc.category}</span>
                    </div>
                    <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-loose mb-6 flex-1">{proc.description}</p>
                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                       <div>
                          <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest">Valor Base</p>
                          <p className="text-white font-serif text-xl text-[#D4AF37]">R$ {proc.price}</p>
                       </div>
                       <div className="flex gap-2">
                          <button onClick={() => { setProcForm(proc); setIsAddingProc(true); }} className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-[#D4AF37] text-stone-400 hover:text-[#D4AF37] transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteProc(proc.id)} className="w-9 h-9 flex items-center justify-center border border-white/10 hover:border-red-500 text-stone-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                       </div>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white mb-2">Controle de Estoque & Insumos</h1>
                <p className="text-stone-400 text-sm">Gerencie toxinas, preenchedores, bioestimuladores e descartáveis da clínica.</p>
              </div>
              <button 
                onClick={() => {
                  const name = prompt('Nome do Insumo:');
                  const qty = parseInt(prompt('Quantidade inicial:', '10') || '10');
                  const cost = parseFloat(prompt('Custo unitário (R$):', '500') || '500');
                  if (name) {
                    setInventory([...inventory, { id: `inv-${Date.now()}`, name, category: 'Geral', quantity: qty, minQuantity: 3, unit: 'Unidades', cost }]);
                  }
                }}
                className="px-6 py-3 bg-[#D4AF37] text-black font-mono text-[10px] uppercase tracking-widest hover:bg-white transition-all"
              >
                + Adicionar Insumo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6">
                <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Valor Total em Estoque</p>
                <p className="text-3xl font-serif text-white">R$ {(inventory.reduce((acc, item) => acc + (item.quantity * item.cost), 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6">
                <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Itens Críticos (Baixo Estoque)</p>
                <p className="text-3xl font-serif text-amber-400">1 Item</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6">
                <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Categorias Ativas</p>
                <p className="text-3xl font-serif text-[#D4AF37]">5 Categorias</p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-300 font-mono uppercase tracking-widest">
                <thead className="text-[9px] text-[#D4AF37] border-b border-[#D4AF37]/15">
                  <tr>
                    <th className="py-4">Insumo / Produto</th>
                    <th className="py-4">Categoria</th>
                    <th className="py-4">Quantidade Atual</th>
                    <th className="py-4">Custo Unitário</th>
                    <th className="py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => {
                    const isLow = item.quantity <= item.minQuantity;
                    return (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 text-white font-medium">{item.name}</td>
                        <td className="py-4 text-stone-400">{item.category}</td>
                        <td className="py-4">
                          <span className="text-white font-bold">{item.quantity}</span> {item.unit}
                        </td>
                        <td className="py-4 text-[#D4AF37]">R$ {item.cost.toFixed(2)}</td>
                        <td className="py-4 text-right">
                          {isLow ? (
                            <span className="bg-amber-950/40 border border-amber-500/30 text-amber-400 px-3 py-1 text-[9px]">Reposição Urgente</span>
                          ) : (
                            <span className="bg-green-950/40 border border-green-500/20 text-green-400 px-3 py-1 text-[9px]">Estoque Normal</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FINANCE TAB */}
        {activeTab === 'finance' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-[10px] font-mono uppercase tracking-[0.3em] font-medium text-white mb-2">Fluxo de Caixa & Sinais de Garantia</h1>
                <p className="text-stone-400 text-sm">Controle financeiro de depósitos via PIX, cartões de crédito e saldos a receber.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6">
                <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Sinais Recebidos (PIX)</p>
                <p className="text-3xl font-serif text-white">R$ 5.480,00</p>
                <p className="text-[9px] font-mono text-green-400 uppercase tracking-widest mt-2">100% conciliado hoje</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6">
                <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Saldo a Receber na Clínica</p>
                <p className="text-3xl font-serif text-[#D4AF37]">R$ 21.920,00</p>
                <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mt-2">Referente aos atendimentos agendados</p>
              </div>
              <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6">
                <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Ticket Médio Geral</p>
                <p className="text-3xl font-serif text-white">R$ 2.450,00</p>
                <p className="text-[9px] font-mono text-green-400 uppercase tracking-widest mt-2">▲ +12% vs mês passado</p>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#D4AF37]/15 p-6 shadow-2xl">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white mb-6">Últimas Transações & Sinais de Reserva</h3>
              <div className="space-y-4">
                {appointments.map((app, index) => (
                  <div key={`fin-${index}`} className="flex justify-between items-center p-4 bg-[#141619] border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-serif font-bold">
                        PIX
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{app.clientName}</p>
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{app.procedureName} • Sinal de Garantia (20%)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-serif text-lg">R$ 380,00</p>
                      <span className="text-[9px] font-mono text-green-400 uppercase tracking-widest">Aprovado Imediato</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commissions' && (
          <StaffCommissionsTab appointments={appointments} />
        )}

        {activeTab === 'reactivation' && (
          <ReactivationCampaignsTab />
        )}
      </main>
    </div>
  );
}

