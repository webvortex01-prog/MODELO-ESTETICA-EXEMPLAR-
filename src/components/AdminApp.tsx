import { useState, type FormEvent } from 'react';
import { procedures as initialProcedures, todayAppointments } from '../data';
import { 
  Users, Calendar as CalendarIcon, TrendingUp, 
  List, Edit2, Trash2, Package, DollarSign, MessageSquare, 
  ShieldCheck, FileText, CheckCircle2, AlertCircle, Award, Send,
  ArrowLeft, Plus, X, Phone, Check, RefreshCw
} from 'lucide-react';
import { Procedure, Appointment } from '../types';
import StaffCommissionsTab from './StaffCommissionsTab';
import ReactivationCampaignsTab from './ReactivationCampaignsTab';
import ErrorBoundary from './ErrorBoundary';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  cost: number;
}

interface AdminAppProps {
  onBackToClient?: () => void;
}

export default function AdminApp({ onBackToClient }: AdminAppProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agenda' | 'clients' | 'procedures' | 'inventory' | 'finance' | 'commissions' | 'reactivation'>('dashboard');
  
  const [procs, setProcs] = useState<Procedure[]>(() => initialProcedures || []);
  const [appointments, setAppointments] = useState<Appointment[]>(() => todayAppointments || []);

  const [isAddingProc, setIsAddingProc] = useState(false);
  const [procForm, setProcForm] = useState<Partial<Procedure>>({});

  // Inventory state & modal
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'inv1', name: 'Toxina Botulínica Botox 100U', category: 'Toxina', quantity: 12, minQuantity: 5, unit: 'Frascos', cost: 850 },
    { id: 'inv2', name: 'Ácido Hialurônico Juvederm Voluma', category: 'Preenchimento', quantity: 18, minQuantity: 6, unit: 'Seringas', cost: 620 },
    { id: 'inv3', name: 'Ácido Hialurônico Restylane Lyft', category: 'Preenchimento', quantity: 14, minQuantity: 4, unit: 'Seringas', cost: 580 },
    { id: 'inv4', name: 'Sculptra (Bioestimulador)', category: 'Bioestimulador', quantity: 8, minQuantity: 3, unit: 'Frascos', cost: 980 },
    { id: 'inv5', name: 'Fios de PDO Espiculados', category: 'Fios', quantity: 25, minQuantity: 10, unit: 'Unidades', cost: 150 },
    { id: 'inv6', name: 'Agulhas e Cânulas 22G/25G', category: 'Descartáveis', quantity: 120, minQuantity: 30, unit: 'Unidades', cost: 12 }
  ]);
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [newInvName, setNewInvName] = useState('');
  const [newInvCat, setNewInvCat] = useState('Geral');
  const [newInvQty, setNewInvQty] = useState(10);
  const [newInvCost, setNewInvCost] = useState(500);
  const [newInvUnit, setNewInvUnit] = useState('Unidades');

  // Selected Patient for Medical Record Modal
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);

  const handleSaveProc = () => {
    if (!procForm.name) return;
    if (procForm.id) {
      setProcs(procs.map(p => p.id === procForm.id ? { ...p, ...procForm } as Procedure : p));
    } else {
      setProcs([...procs, { 
        ...procForm, 
        id: `p${Date.now()}`,
        name: procForm.name || 'Novo Procedimento',
        description: procForm.description || '',
        durationMinutes: Number(procForm.durationMinutes) || 60,
        price: Number(procForm.price) || 1000,
        category: procForm.category || 'other'
      } as Procedure]);
    }
    setIsAddingProc(false);
    setProcForm({});
  };

  const handleDeleteProc = (id: string) => {
    setProcs(procs.filter(p => p.id !== id));
  };

  const handleAddInventory = (e: FormEvent) => {
    e.preventDefault();
    if (!newInvName.trim()) return;
    setInventory([
      ...inventory,
      {
        id: `inv-${Date.now()}`,
        name: newInvName.trim(),
        category: newInvCat,
        quantity: Number(newInvQty) || 1,
        minQuantity: 3,
        unit: newInvUnit,
        cost: Number(newInvCost) || 0
      }
    ]);
    setNewInvName('');
    setNewInvQty(10);
    setNewInvCost(500);
    setShowAddInventoryModal(false);
  };

  const menuItems = [
    { id: 'dashboard' as const, label: 'Visão Geral & KPIs', icon: TrendingUp },
    { id: 'agenda' as const, label: 'Agenda Master', icon: CalendarIcon },
    { id: 'clients' as const, label: 'CRM & Prontuários', icon: Users },
    { id: 'procedures' as const, label: 'Catálogo de Serviços', icon: List },
    { id: 'inventory' as const, label: 'Estoque & Insumos', icon: Package },
    { id: 'finance' as const, label: 'Fluxo de Caixa', icon: DollarSign },
    { id: 'commissions' as const, label: 'Comissões & Equipe', icon: Award },
    { id: 'reactivation' as const, label: 'Campanhas de Reativação', icon: Send }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full w-full overflow-hidden bg-[#050505] text-white">
      {/* Sidebar (Desktop) */}
      <aside className="w-64 border-r border-[#D4AF37]/20 bg-[#0A0A0A] flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-[#D4AF37]/15 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.35em] block">Painel Executivo</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h2 className="font-serif text-xl tracking-wide text-white">Lumière Admin</h2>

          {onBackToClient && (
            <button
              type="button"
              onClick={onBackToClient}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#D4AF37]/60 text-stone-300 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3 text-[#D4AF37]" />
              Voltar à Vitrine (Cliente)
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1.5 mt-4 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-3 transition-all duration-200 text-left rounded-xl cursor-pointer ${
                  isActive 
                    ? 'bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.15)]' 
                    : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-stone-400'}`} />
                <span className="text-[11px] font-mono uppercase tracking-wider truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 mt-auto border-t border-[#D4AF37]/10">
          <div className="bg-[#D4AF37]/5 p-3.5 rounded-xl border border-[#D4AF37]/20 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase text-[#D4AF37] tracking-widest font-mono">Especialista Ativa</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <p className="text-xs font-serif font-medium text-white">Dra. Eliana Becker</p>
            <p className="text-[8px] font-mono text-stone-400 uppercase tracking-widest">CRM-SP 184920</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#050505]">
        
        {/* Topbar */}
        <div className="p-4 sm:p-6 border-b border-[#D4AF37]/15 bg-[#08090C]/90 backdrop-blur-md shrink-0 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-[0.25em] block">
                Central de Operações B2B
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-white tracking-tight">
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

            <div className="flex items-center gap-2">
              {onBackToClient && (
                <button
                  type="button"
                  onClick={onBackToClient}
                  className="px-3 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 hover:bg-[#D4AF37] hover:text-black text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span className="hidden sm:inline">Vitrine</span> Cliente
                </button>
              )}
              <div className="hidden lg:block bg-[#141619] border border-[#D4AF37]/30 px-3.5 py-1.5 font-mono text-[10px] uppercase text-[#D4AF37] tracking-widest rounded-lg">
                Unidade Jardins • SP
              </div>
            </div>
          </div>

          {/* Horizontal Tab Bar for Mobile & Quick Switch */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:-mx-6 sm:px-6">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={`mob-tab-${item.id}`}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-bold shadow-[0_0_10px_rgba(212,175,55,0.3)]'
                      : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span>{item.label.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Viewport with ErrorBoundary */}
        <div className="flex-1 p-3.5 sm:p-6 md:p-8 overflow-y-auto space-y-6 sm:space-y-8">
          <ErrorBoundary
            fallbackTitle="Erro no módulo administrativo"
            fallbackMessage="Houve um problema temporário ao carregar esta seção. Clique abaixo para reiniciar o módulo."
            onReset={() => setActiveTab('dashboard')}
            onGoHome={onBackToClient}
          >
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 shadow-2xl relative overflow-hidden rounded-2xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                    <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Faturamento Estimado Mês</p>
                    <p className="text-3xl font-serif text-white mb-2">R$ 148.500</p>
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                      <span>▲ +18.4%</span> vs mês anterior
                    </p>
                  </div>
                  
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 shadow-2xl relative overflow-hidden rounded-2xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                    <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Consultas Agendadas Hoje</p>
                    <p className="text-3xl font-serif text-white mb-2">{(appointments?.length || 0) + 6} Pacientes</p>
                    <p className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">2 horários livres na tarde</p>
                  </div>

                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 shadow-2xl relative overflow-hidden rounded-2xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                    <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Ticket Médio por Procedimento</p>
                    <p className="text-3xl font-serif text-white mb-2">R$ 2.450</p>
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Preenchedores lideram</p>
                  </div>

                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 shadow-2xl relative overflow-hidden rounded-2xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                    <p className="text-[10px] font-mono uppercase text-stone-500 mb-2 tracking-widest">Taxa de Comparecimento</p>
                    <p className="text-3xl font-serif text-white mb-2">98.2%</p>
                    <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">Redução de no-show com sinal 20%</p>
                  </div>
                </div>

                {/* Agenda Preview & Projections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 shadow-2xl rounded-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <div>
                        <h3 className="font-serif text-xl text-white">Próximos Procedimentos do Dia</h3>
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-0.5">Sinais pagos e termos médicos assinados digitalmente</p>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setActiveTab('agenda')} 
                        className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] cursor-pointer hover:text-white transition-colors"
                      >
                        VER AGENDA COMPLETA →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(appointments || []).slice(0, 4).map((app, index) => (
                        <div key={`dash-apt-${index}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#141619] border border-white/5 rounded-xl gap-3">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-mono text-xs font-bold shrink-0">
                              {app.time || '10:00'}
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{app.clientName || 'Paciente'}</p>
                              <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{app.procedureName || 'Procedimento Estético'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button 
                              type="button"
                              onClick={() => {
                                const phone = (app.clientPhone || '').replace(/\D/g, '');
                                const msg = `Olá ${app.clientName || ''}, confirmamos seu atendimento de ${app.procedureName || ''} às ${app.time || ''} na Lumière Clinic.`;
                                window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[9px] uppercase tracking-widest transition-all cursor-pointer"
                            >
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 shadow-2xl rounded-2xl flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="font-serif text-xl text-white mb-2">Protocolos Mais Solicitados</h3>
                      <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-6">Participação na receita da clínica</p>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-stone-300">Toxina Botulínica</span>
                            <span className="text-[#D4AF37]">42%</span>
                          </div>
                          <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '42%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-stone-300">Preenchimentos Faciais</span>
                            <span className="text-[#D4AF37]">31%</span>
                          </div>
                          <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '31%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-stone-300">Bioestimuladores de Colágeno</span>
                            <span className="text-[#D4AF37]">19%</span>
                          </div>
                          <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '19%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-stone-300">Fios de Sustentação PDO</span>
                            <span className="text-[#D4AF37]">8%</span>
                          </div>
                          <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-[#D4AF37] h-full rounded-full" style={{ width: '8%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
                      💡 <strong>Estoque:</strong> 1 frasco de Toxina Botox atingiu nível mínimo de segurança.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. AGENDA TAB */}
            {activeTab === 'agenda' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-serif text-white">Agenda Master & Grade Diária</h2>
                    <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
                      Gerencie horários, salas de atendimento e encaixes em tempo real.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => alert('Dia bloqueado para procedimentos cirúrgicos')}
                      className="px-4 py-2 border border-stone-800 text-stone-300 font-mono text-[10px] uppercase tracking-widest rounded-lg hover:border-[#D4AF37] cursor-pointer"
                    >
                      Bloquear Grade
                    </button>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-2xl divide-y divide-white/5">
                  {['09:00', '10:00', '11:00', '12:00 (Almoço)', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => {
                    const isLunch = time.includes('Almoço');
                    const cleanTime = time.split(' ')[0];
                    const apt = (appointments || []).find(a => a.time === cleanTime);

                    return (
                      <div key={time} className="flex flex-col sm:flex-row gap-4 py-4 items-start sm:items-center">
                        <div className="font-mono text-[#D4AF37] w-28 text-sm font-semibold shrink-0">{time}</div>
                        <div className="flex-1 w-full">
                          {isLunch ? (
                            <div className="bg-[#141619] border border-stone-800/80 p-3 rounded-xl text-stone-500 font-mono text-[10px] uppercase tracking-widest">
                              Intervalo de Almoço & Descanso (Bloqueado)
                            </div>
                          ) : apt ? (
                            <div className="bg-[#141619] border border-[#D4AF37]/40 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3 shadow-lg">
                              <div>
                                <div className="flex items-center gap-3">
                                  <p className="text-white font-medium text-sm">{apt.clientName || 'Paciente'}</p>
                                  <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
                                    Sinal Pago (20%)
                                  </span>
                                </div>
                                <p className="text-stone-400 text-[10px] font-mono uppercase tracking-widest mt-1">
                                  {apt.procedureName || 'Procedimento'} • 📱 {apt.clientPhone || 'Contato'}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const phone = (apt.clientPhone || '').replace(/\D/g, '');
                                    const msg = `Olá ${apt.clientName || ''}, confirmamos seu agendamento para hoje às ${apt.time || ''} na Lumière Clinic.`;
                                    window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                                  }}
                                  className="px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[9px] uppercase tracking-widest transition-all cursor-pointer"
                                >
                                  WhatsApp
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => alert('Função de reagendamento: selecione novo horário.')}
                                  className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-400 hover:text-white font-mono text-[9px] uppercase tracking-widest cursor-pointer"
                                >
                                  Reagendar
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-transparent border border-dashed border-stone-800 p-3 rounded-xl flex justify-between items-center hover:border-[#D4AF37]/40 transition-colors">
                              <p className="text-stone-500 font-mono text-[10px] uppercase tracking-widest">
                                Horário Livre para Encaixe
                              </p>
                              <button 
                                type="button"
                                onClick={() => alert('Horário bloqueado com sucesso.')}
                                className="text-[9px] font-mono text-red-400 border border-red-500/20 px-3 py-1 rounded hover:bg-red-500/10 uppercase tracking-widest cursor-pointer"
                              >
                                Bloquear
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. CRM & PRONTUÁRIOS TAB */}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-serif text-white">Prontuários & Anamnese Digital</h2>
                    <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
                      Histórico médico, fichas de avaliação e termos de consentimento assinados.
                    </p>
                  </div>
                </div>
                
                <div className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block sm:hidden">
                  ← Deslize para visualizar o prontuário →
                </div>
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-3.5 sm:p-6 rounded-2xl shadow-2xl overflow-x-auto">
                  <table className="w-full text-left text-sm text-stone-300 font-mono uppercase tracking-widest min-w-[560px]">
                    <thead className="text-[9px] text-[#D4AF37] border-b border-[#D4AF37]/20">
                      <tr>
                        <th className="py-3 px-2">Nome do Paciente</th>
                        <th className="py-3 px-2">WhatsApp / Contato</th>
                        <th className="py-3 px-2">Procedimento</th>
                        <th className="py-3 px-2">Anamnese / TCLE</th>
                        <th className="py-3 px-2 text-right">Prontuário</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(appointments || []).map((app, idx) => (
                        <tr key={`crm-row-${idx}`} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-2 text-white font-medium">{app.clientName || 'Paciente'}</td>
                          <td className="py-4 px-2 text-stone-400">{app.clientPhone || 'Não informado'}</td>
                          <td className="py-4 px-2 text-white">{app.procedureName || 'Estética'}</td>
                          <td className="py-4 px-2">
                            <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded text-[9px] inline-flex items-center gap-1 font-semibold">
                              <Check className="w-3 h-3" /> Assinado & Válido
                            </span>
                          </td>
                          <td className="py-4 px-2 text-right">
                            <button 
                              type="button"
                              onClick={() => setSelectedPatient(app)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[9px] uppercase tracking-widest transition-all cursor-pointer font-bold"
                            >
                              Ver Prontuário
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Patient Record Modal */}
                {selectedPatient && (
                  <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
                    <div className="bg-[#0A0A0A] border border-[#D4AF37] max-w-2xl w-full p-4 sm:p-8 rounded-2xl relative shadow-2xl space-y-4 sm:space-y-6 my-auto max-h-[92vh] overflow-y-auto">
                      <button 
                        type="button"
                        onClick={() => setSelectedPatient(null)}
                        className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full border border-stone-800 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="border-b border-[#D4AF37]/20 pb-4">
                        <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest block font-semibold">
                          Prontuário Médico Digital
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                          {selectedPatient.clientName || 'Paciente'}
                        </h3>
                        <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                          Contato: {selectedPatient.clientPhone || ''} | CPF: 482.931.***-**
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#141619] p-4 rounded-xl border border-white/5">
                          <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Último Procedimento</p>
                          <p className="text-white text-sm font-medium">{selectedPatient.procedureName || ''}</p>
                        </div>
                        <div className="bg-[#141619] p-4 rounded-xl border border-white/5">
                          <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Status de Alergia</p>
                          <p className="text-emerald-400 text-sm font-medium">Nenhuma restrição relatada</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">Histórico de Anamnese & Observações da Dra.</p>
                        <div className="bg-[#141619] p-4 rounded-xl border border-white/5 text-xs text-stone-300 font-mono leading-relaxed">
                          Paciente relata desejo de naturalidade e sustentação no terço médio da face. Pele íntegra, sem contraindicações para ácido hialurônico de alta reticulação. Retorno agendado para 14 dias para revisão clínica.
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setSelectedPatient(null)}
                          className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-stone-800 text-stone-400 hover:text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Fechar
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            const phone = (selectedPatient.clientPhone || '').replace(/\D/g, '');
                            const msg = `Olá ${selectedPatient.clientName || ''}, aqui é da Lumière Clinic. Como está sendo a recuperação do seu procedimento? Estamos à disposição! ✨`;
                            window.open(`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`, '_blank');
                          }}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow-md"
                        >
                          <MessageSquare className="w-4 h-4" /> Enviar Mensagem Pós-Procedimento
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. PROCEDURES TAB */}
            {activeTab === 'procedures' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-serif text-white">Catálogo de Procedimentos</h2>
                    <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
                      Gerencie preços, tempos de sessão e descrições exibidas na vitrine.
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => { setProcForm({}); setIsAddingProc(true); }} 
                    className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> Novo Procedimento
                  </button>
                </div>
                
                {isAddingProc && (
                  <div className="bg-[#0A0A0A] border border-[#D4AF37] p-6 sm:p-8 rounded-2xl shadow-2xl animate-in fade-in space-y-6">
                    <h3 className="font-serif text-2xl text-white">
                      {procForm.id ? 'Editar Procedimento' : 'Novo Procedimento'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1 tracking-widest">Nome do Procedimento</label>
                        <input 
                          type="text" 
                          value={procForm.name || ''} 
                          onChange={(e) => setProcForm({...procForm, name: e.target.value})} 
                          className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                          placeholder="Ex: Preenchimento Labial" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1 tracking-widest">Categoria</label>
                        <select 
                          value={procForm.category || 'other'} 
                          onChange={(e) => setProcForm({...procForm, category: e.target.value as any})} 
                          className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm"
                        >
                          <option value="toxin">Toxina</option>
                          <option value="filler">Preenchimento</option>
                          <option value="biostimulator">Bioestimulador</option>
                          <option value="other">Outros</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1 tracking-widest">Descrição</label>
                        <textarea 
                          value={procForm.description || ''} 
                          onChange={(e) => setProcForm({...procForm, description: e.target.value})} 
                          className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm h-20" 
                          placeholder="Detalhes para o paciente..." 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1 tracking-widest">Duração (minutos)</label>
                        <input 
                          type="number" 
                          value={procForm.durationMinutes || ''} 
                          onChange={(e) => setProcForm({...procForm, durationMinutes: parseInt(e.target.value) || 60})} 
                          className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1 tracking-widest">Valor (R$)</label>
                        <input 
                          type="number" 
                          value={procForm.price || ''} 
                          onChange={(e) => setProcForm({...procForm, price: parseFloat(e.target.value) || 0})} 
                          className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <button 
                        type="button"
                        onClick={() => setIsAddingProc(false)} 
                        className="px-5 py-2.5 rounded-full border border-stone-800 text-stone-400 font-mono uppercase tracking-widest text-[10px] hover:text-white cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="button"
                        onClick={handleSaveProc} 
                        className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-mono uppercase tracking-widest text-[10px] font-bold hover:bg-white cursor-pointer shadow-md"
                      >
                        Salvar Procedimento
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {procs.map(proc => (
                    <div key={proc.id} className="bg-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl flex flex-col shadow-2xl p-6 hover:border-[#D4AF37]/50 transition-colors justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-serif text-lg text-white font-medium">{proc.name}</h3>
                          <span className="text-[8px] font-mono uppercase tracking-widest text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                            {proc.category}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-relaxed mb-4">
                          {proc.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-end border-t border-white/5 pt-4">
                        <div>
                          <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest">Valor Base</p>
                          <p className="text-white font-serif text-xl text-[#D4AF37]">
                            R$ {Number(proc.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            type="button"
                            onClick={() => { setProcForm(proc); setIsAddingProc(true); }} 
                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-[#D4AF37] text-stone-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteProc(proc.id)} 
                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 hover:border-red-500 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-serif text-white">Controle de Estoque & Insumos</h2>
                    <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
                      Gerencie frascos de toxina, ampolas de ácido hialurônico e bioestimuladores.
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowAddInventoryModal(true)}
                    className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-wider font-bold hover:bg-white transition-all flex items-center gap-2 cursor-pointer shadow-md self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4" /> Adicionar Insumo
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-xl">
                    <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Valor Total em Estoque</p>
                    <p className="text-2xl sm:text-3xl font-serif text-white">
                      R$ {(inventory.reduce((acc, item) => acc + ((item.quantity || 0) * (item.cost || 0)), 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-xl">
                    <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Itens Críticos (Baixo Estoque)</p>
                    <p className="text-2xl sm:text-3xl font-serif text-amber-400">
                      {inventory.filter(i => (i.quantity || 0) <= (i.minQuantity || 0)).length} Itens
                    </p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-xl">
                    <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Total de Insumos Cadastrados</p>
                    <p className="text-2xl sm:text-3xl font-serif text-[#D4AF37]">{inventory.length} Insumos</p>
                  </div>
                </div>

                <div className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block sm:hidden">
                  ← Deslize para ver custos e status do estoque →
                </div>
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-3.5 sm:p-6 rounded-2xl shadow-2xl overflow-x-auto">
                  <table className="w-full text-left text-sm text-stone-300 font-mono uppercase tracking-widest min-w-[580px]">
                    <thead className="text-[9px] text-[#D4AF37] border-b border-[#D4AF37]/20">
                      <tr>
                        <th className="py-3 px-2">Insumo / Produto</th>
                        <th className="py-3 px-2">Categoria</th>
                        <th className="py-3 px-2">Quantidade Atual</th>
                        <th className="py-3 px-2">Custo Unitário</th>
                        <th className="py-3 px-2 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {inventory.map(item => {
                        const isLow = (item.quantity || 0) <= (item.minQuantity || 0);
                        return (
                          <tr key={item.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-2 text-white font-medium">{item.name}</td>
                            <td className="py-4 px-2 text-stone-400">{item.category}</td>
                            <td className="py-4 px-2">
                              <span className="text-white font-bold">{item.quantity}</span> {item.unit}
                            </td>
                            <td className="py-4 px-2 text-[#D4AF37]">
                              R$ {Number(item.cost || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </td>
                            <td className="py-4 px-2 text-right">
                              {isLow ? (
                                <span className="bg-amber-950/40 border border-amber-500/30 text-amber-400 px-3 py-1 rounded text-[9px] font-semibold">
                                  Reposição Urgente
                                </span>
                              ) : (
                                <span className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded text-[9px] font-semibold">
                                  Estoque Normal
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Add Inventory Modal (Clean, no prompt) */}
                {showAddInventoryModal && (
                  <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
                    <form 
                      onSubmit={handleAddInventory}
                      className="bg-[#0A0A0A] border border-[#D4AF37] max-w-md w-full p-4 sm:p-8 rounded-2xl relative shadow-2xl space-y-4 my-auto max-h-[92vh] overflow-y-auto"
                    >
                      <button 
                        type="button"
                        onClick={() => setShowAddInventoryModal(false)}
                        className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full border border-stone-800 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="border-b border-[#D4AF37]/20 pb-3">
                        <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                          Cadastro de Insumo
                        </span>
                        <h3 className="font-serif text-2xl text-white mt-1">Novo Item de Estoque</h3>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Nome do Insumo</label>
                          <input 
                            type="text" 
                            required
                            value={newInvName} 
                            onChange={(e) => setNewInvName(e.target.value)} 
                            placeholder="Ex: Toxina Botulínica 100U"
                            className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Categoria</label>
                            <input 
                              type="text" 
                              value={newInvCat} 
                              onChange={(e) => setNewInvCat(e.target.value)} 
                              className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Unidade</label>
                            <input 
                              type="text" 
                              value={newInvUnit} 
                              onChange={(e) => setNewInvUnit(e.target.value)} 
                              className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Quantidade</label>
                            <input 
                              type="number" 
                              min="1"
                              value={newInvQty} 
                              onChange={(e) => setNewInvQty(parseInt(e.target.value) || 1)} 
                              className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-stone-400 mb-1">Custo Unitário (R$)</label>
                            <input 
                              type="number" 
                              min="0"
                              step="0.01"
                              value={newInvCost} 
                              onChange={(e) => setNewInvCost(parseFloat(e.target.value) || 0)} 
                              className="w-full bg-[#141619] border border-stone-800 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none font-mono text-sm" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                        <button 
                          type="button"
                          onClick={() => setShowAddInventoryModal(false)}
                          className="px-5 py-2 rounded-full border border-stone-800 text-stone-400 font-mono text-xs uppercase cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button 
                          type="submit"
                          className="px-6 py-2 rounded-full bg-[#D4AF37] text-black font-mono text-xs uppercase font-bold hover:bg-white transition-all cursor-pointer shadow-md"
                        >
                          Salvar Item
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* 6. FINANCE TAB */}
            {activeTab === 'finance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-serif text-white">Fluxo de Caixa & Sinais de Reserva</h2>
                  <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
                    Auditoria de recebíveis PIX e cartões na recepção da clínica.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-xl">
                    <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Receita Confirmada Hoje (PIX)</p>
                    <p className="text-3xl font-serif text-white">R$ 3.750,00</p>
                    <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest mt-2">100% compensado</p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-xl">
                    <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Previsão de Saldo em Recepção</p>
                    <p className="text-3xl font-serif text-[#D4AF37]">R$ 15.000,00</p>
                    <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mt-2">Restante a cobrar no dia</p>
                  </div>
                  <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-xl">
                    <p className="text-[9px] font-mono uppercase text-stone-500 tracking-widest mb-1">Taxa de Inadimplência</p>
                    <p className="text-3xl font-serif text-emerald-400">0.0%</p>
                    <p className="text-[9px] font-mono text-stone-400 uppercase tracking-widest mt-2">Sinal prévio elimina desistências</p>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] border border-[#D4AF37]/20 p-6 rounded-2xl shadow-2xl space-y-4">
                  <h3 className="font-serif text-xl text-white">Últimos Lançamentos de Sinais (20%)</h3>
                  <div className="space-y-3">
                    {(appointments || []).map((app, index) => (
                      <div key={`fin-${index}`} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#141619] border border-white/5 rounded-xl gap-3">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-serif font-bold shrink-0">
                            PIX
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{app.clientName || 'Paciente'}</p>
                            <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                              {app.procedureName || 'Procedimento'} • Sinal de Garantia (20%)
                            </p>
                          </div>
                        </div>
                        <div className="text-left sm:text-right self-end sm:self-auto">
                          <p className="text-white font-serif text-lg">
                            R$ {Number((app.price || 1900) * 0.2).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">
                            Aprovado Imediato
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. COMMISSIONS TAB */}
            {activeTab === 'commissions' && (
              <StaffCommissionsTab appointments={appointments} />
            )}

            {/* 8. REACTIVATION TAB */}
            {activeTab === 'reactivation' && (
              <ReactivationCampaignsTab />
            )}
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
