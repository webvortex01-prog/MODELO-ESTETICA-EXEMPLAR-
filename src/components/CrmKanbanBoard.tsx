import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MessageSquare, Phone, CheckCircle2, Clock, 
  Calendar as CalendarIcon, Search, Plus, Filter, 
  ChevronRight, ArrowRight, ShieldCheck, FileText, 
  Sparkles, AlertCircle, Edit3, X, Check, MoreVertical,
  UserCheck, Send, DollarSign, Stethoscope, RefreshCw
} from 'lucide-react';
import { Appointment, Procedure } from '../types';
import { procedures } from '../data';

interface CrmKanbanBoardProps {
  appointments: Appointment[];
  onUpdateAppointment: (id: string, updates: Partial<Appointment>) => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  onDeleteAppointment?: (id: string) => void;
}

type StageKey = 'pending' | 'confirmed' | 'in_waiting' | 'in_progress' | 'completed' | 'cancelled';

interface ColumnDef {
  key: StageKey;
  label: string;
  badgeColor: string;
  borderColor: string;
  headerBg: string;
  icon: any;
  description: string;
}

const COLUMNS: ColumnDef[] = [
  {
    key: 'pending',
    label: 'Novos / Agendados',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderColor: 'border-amber-500/30',
    headerBg: 'bg-amber-950/30',
    icon: Clock,
    description: 'Aguardando confirmação de horário ou sinal'
  },
  {
    key: 'confirmed',
    label: 'Confirmados',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-emerald-500/30',
    headerBg: 'bg-emerald-950/30',
    icon: CheckCircle2,
    description: 'Sinal pago e horário garantido na agenda'
  },
  {
    key: 'in_waiting',
    label: 'Na Recepção / Espera',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    borderColor: 'border-blue-500/30',
    headerBg: 'bg-blue-950/30',
    icon: Users,
    description: 'Paciente no lounge aguardando a especialista'
  },
  {
    key: 'in_progress',
    label: 'Em Atendimento',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    borderColor: 'border-purple-500/30',
    headerBg: 'bg-purple-950/30',
    icon: Stethoscope,
    description: 'Procedimento em andamento na sala clínica'
  },
  {
    key: 'completed',
    label: 'Realizados / Pós-Venda',
    badgeColor: 'bg-yellow-500/20 text-[#D4AF37] border-[#D4AF37]/40',
    borderColor: 'border-[#D4AF37]/30',
    headerBg: 'bg-[#D4AF37]/10',
    icon: Sparkles,
    description: 'Procedimento concluído com sucesso'
  }
];

export default function CrmKanbanBoard({
  appointments,
  onUpdateAppointment,
  onAddAppointment
}: CrmKanbanBoardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState<'all' | 'today' | 'upcoming'>('all');
  
  // Modals
  const [selectedRecord, setSelectedRecord] = useState<Appointment | null>(null);
  const [isEditingClinicalNotes, setIsEditingClinicalNotes] = useState(false);
  const [clinicalNotesInput, setClinicalNotesInput] = useState('');
  
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newProcId, setNewProcId] = useState(procedures[0]?.id || 'p1');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('14:00');
  const [newStage, setNewStage] = useState<StageKey>('confirmed');
  const [newDepositPaid, setNewDepositPaid] = useState(true);

  // WhatsApp Toast / Feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const matchesSearch = 
        app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.clientPhone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.procedureName.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      if (filterDate === 'today') {
        return app.date === todayStr;
      }
      if (filterDate === 'upcoming') {
        return app.date >= todayStr;
      }
      return true;
    });
  }, [appointments, searchTerm, filterDate, todayStr]);

  // Next Stage helper
  const getNextStage = (currentStage: StageKey): StageKey | null => {
    switch (currentStage) {
      case 'pending': return 'confirmed';
      case 'confirmed': return 'in_waiting';
      case 'in_waiting': return 'in_progress';
      case 'in_progress': return 'completed';
      default: return null;
    }
  };

  const getNextStageLabel = (currentStage: StageKey): string => {
    switch (currentStage) {
      case 'pending': return 'Confirmar';
      case 'confirmed': return 'Check-in Recepção';
      case 'in_waiting': return 'Iniciar Atendimento';
      case 'in_progress': return 'Finalizar';
      default: return 'Avançar';
    }
  };

  // WhatsApp Message Generator
  const sendWhatsAppMessage = (app: Appointment, type: 'reminder' | 'confirmation' | 'postcare') => {
    const rawPhone = (app.clientPhone || '').replace(/\D/g, '');
    const cleanPhone = rawPhone.length === 11 ? `55${rawPhone}` : rawPhone.length === 13 ? rawPhone : `5511999999999`;
    
    let msg = '';
    if (type === 'reminder' || app.status === 'confirmed') {
      msg = `✨ *LUMIÈRE CLINIC - LEMBRETE DE PROCEDIMENTO*\n\nOlá, *${app.clientName}*! Tudo bem?\n\nPassando para confirmar seu horário reservado com a nossa especialista:\n\n🩺 *Procedimento:* ${app.procedureName}\n📅 *Data:* ${app.date.split('-').reverse().join('/')}\n⏰ *Horário:* ${app.time}\n📍 *Local:* Alameda Santos, 1800 - Jardins (Estacionamento com Manobrista)\n\n⚠️ *Orientações:* Por favor, chegue com 10 minutos de antecedência. Evite consumo de álcool nas 24h anteriores.\n\nPor favor, *responda 1* para confirmar sua presença! ✨`;
    } else if (app.status === 'pending') {
      msg = `✨ *LUMIÈRE CLINIC - SOLICITAÇÃO DE AGENDAMENTO*\n\nOlá, *${app.clientName}*! Recebemos sua solicitação para *${app.procedureName}* no dia *${app.date.split('-').reverse().join('/')}* às *${app.time}*.\n\nGostaria de confirmar sua reserva e dados para envio da chave PIX de garantia de vaga? Ficamos à sua disposição!`;
    } else if (app.status === 'in_waiting') {
      msg = `✨ *LUMIÈRE CLINIC*\n\nOlá, *${app.clientName}*! A Dra. já foi notificada da sua chegada e a sala VIP está pronta. Sinta-se à vontade no nosso lounge com espumante e café gourmet! ☕🥂`;
    } else {
      msg = `💖 *LUMIÈRE CLINIC - CUIDADOS PÓS-PROCEDIMENTO*\n\nOlá, *${app.clientName}*! Esperamos que você tenha tido uma experiência extraordinária com seu *${app.procedureName}*.\n\n🧴 *Recomendações das primeiras 48h:*\n- Não massageie ou pressione a área tratada.\n- Use protetor solar FPS 50+.\n- Evite atividade física intensa nas próximas 24h.\n\nNossa equipe médica está 100% à disposição se precisar de qualquer orientação!`;
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    showToast(`Mensagem enviada para ${app.clientName}!`);
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const matchedProc = procedures.find(p => p.id === newProcId) || procedures[0];

    onAddAppointment({
      clientId: `cli-${Date.now()}`,
      clientName: newClientName.trim(),
      clientPhone: newClientPhone.trim() || '(11) 99999-0000',
      procedureId: matchedProc.id,
      procedureName: matchedProc.name,
      date: newDate,
      time: newTime,
      price: matchedProc.price,
      status: newStage,
      depositPaid: newDepositPaid,
      depositAmount: matchedProc.price * 0.2,
      room: 'Sala 01 - Injetáveis VIP',
      professional: 'Dra. Eliana Becker',
      tcleSigned: true,
      clinicalNotes: 'Cadastrado diretamente pela Recepção / CRM Kanban.',
      anamneseSummary: 'Paciente cadastrado no sistema.'
    });

    setNewClientName('');
    setNewClientPhone('');
    setShowNewAppModal(false);
    showToast('Paciente adicionado ao Kanban com sucesso!');
  };

  const handleSaveNotes = () => {
    if (!selectedRecord) return;
    onUpdateAppointment(selectedRecord.id, {
      clinicalNotes: clinicalNotesInput
    });
    setSelectedRecord({
      ...selectedRecord,
      clinicalNotes: clinicalNotesInput
    });
    setIsEditingClinicalNotes(false);
    showToast('Prontuário e evolução atualizados!');
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Toast notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-[#D4AF37] text-black px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-black" />
          {toastMsg}
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0A0A0A] p-4 sm:p-6 rounded-2xl border border-[#D4AF37]/20 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
            <h2 className="text-xl sm:text-2xl font-serif text-white tracking-wide">
              Pipeline de Atendimento & CRM Kanban
            </h2>
          </div>
          <p className="text-stone-400 text-xs font-mono uppercase tracking-widest mt-1">
            Gestão visual do fluxo de pacientes: do agendamento à conclusão e pós-venda.
          </p>
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Buscar paciente ou procedimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-stone-900/80 border border-stone-800 rounded-xl text-xs font-mono text-white placeholder:text-stone-600 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Date Filter Buttons */}
          <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl p-1">
            <button
              onClick={() => setFilterDate('all')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filterDate === 'all' ? 'bg-[#D4AF37] text-black font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Todos ({appointments.length})
            </button>
            <button
              onClick={() => setFilterDate('today')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filterDate === 'today' ? 'bg-[#D4AF37] text-black font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Hoje
            </button>
          </div>

          {/* New Patient Button */}
          <motion.button
            onClick={() => setShowNewAppModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo </span>Paciente
          </motion.button>
        </div>
      </div>

      {/* Kanban Board Container (Horizontal Scrollable on Mobile/Tablet) */}
      <div className="flex-1 overflow-x-auto pb-6">
        <div className="flex items-start gap-4 min-w-[1280px] lg:min-w-full">
          {COLUMNS.map(column => {
            const ColumnIcon = column.icon;
            const columnItems = filteredAppointments.filter(app => {
              const status = app.status || 'pending';
              return status === column.key;
            });
            const columnTotal = columnItems.reduce((acc, curr) => acc + (curr.price || 0), 0);

            return (
              <div 
                key={column.key}
                className="flex-1 flex flex-col min-w-[280px] max-w-[340px] bg-[#0A0A0A] rounded-2xl border border-stone-800/80 shadow-2xl overflow-hidden shrink-0"
              >
                {/* Column Header */}
                <div className={`p-4 border-b border-stone-800 ${column.headerBg}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${column.badgeColor} border`}>
                        <ColumnIcon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-serif text-sm font-semibold text-white tracking-wide">
                        {column.label}
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-stone-900 border border-stone-700 text-stone-300 font-mono text-[11px] font-bold">
                      {columnItems.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                    <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest truncate">
                      {column.description}
                    </span>
                    <span className="text-[10px] font-mono text-[#D4AF37] font-semibold shrink-0">
                      R$ {columnTotal.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="p-3 space-y-3 min-h-[450px] max-h-[calc(100vh-280px)] overflow-y-auto">
                  {columnItems.length === 0 ? (
                    <div className="h-36 flex flex-col items-center justify-center text-center p-4 border border-dashed border-stone-800 rounded-xl text-stone-600">
                      <Clock className="w-6 h-6 mb-2 opacity-40" />
                      <p className="text-[10px] font-mono uppercase tracking-wider">Nenhum atendimento nesta etapa</p>
                    </div>
                  ) : (
                    columnItems.map(app => {
                      const nextStage = getNextStage(app.status as StageKey);
                      const nextLabel = getNextStageLabel(app.status as StageKey);
                      const isToday = app.date === todayStr;

                      return (
                        <motion.div
                          key={app.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="p-3.5 bg-[#121316] hover:bg-[#16181C] border border-stone-800 hover:border-[#D4AF37]/50 rounded-xl space-y-3 transition-all shadow-md group relative"
                        >
                          {/* Top row: Name, Avatar & Badges */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-black font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                                {app.clientName.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-white font-serif truncate leading-tight">
                                  {app.clientName}
                                </h4>
                                <span className="text-[9px] font-mono text-stone-400 block truncate">
                                  {app.clientPhone}
                                </span>
                              </div>
                            </div>

                            {isToday && (
                              <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-mono text-[8px] uppercase tracking-wider font-bold shrink-0">
                                Hoje
                              </span>
                            )}
                          </div>

                          {/* Procedure & Price */}
                          <div className="bg-[#0A0A0C] p-2.5 rounded-lg border border-white/5 space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-stone-200 font-medium truncate font-sans">
                                {app.procedureName}
                              </span>
                            </div>
                            <div className="flex items-center justify-between font-mono text-[10px]">
                              <span className="text-stone-500">
                                {app.date.split('-').reverse().join('/')} às {app.time}
                              </span>
                              <span className="text-[#D4AF37] font-bold">
                                R$ {(app.price || 0).toLocaleString('pt-BR')}
                              </span>
                            </div>
                          </div>

                          {/* Room / Specialist Indicator */}
                          <div className="flex items-center justify-between text-[9px] font-mono text-stone-400 px-1">
                            <span className="truncate">📍 {app.room || 'Sala 01'}</span>
                            <span className="text-emerald-400 font-medium">
                              {app.depositPaid ? '✓ Sinal 20% Pago' : 'Sinal Pendente'}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-1.5 pt-1 border-t border-white/5">
                            {/* WhatsApp Reminder Button */}
                            <button
                              type="button"
                              onClick={() => sendWhatsAppMessage(app, 'reminder')}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 text-emerald-300 font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer font-semibold shadow-sm"
                              title="Enviar mensagem personalizada de WhatsApp"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-400" />
                              <span>Enviar Lembrete WhatsApp</span>
                            </button>

                            {/* Quick Next Stage Button */}
                            <div className="flex items-center gap-1.5">
                              {nextStage && (
                                <button
                                  type="button"
                                  onClick={() => onUpdateAppointment(app.id, { status: nextStage })}
                                  className="flex-1 py-1.5 px-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] border border-[#D4AF37]/40 hover:text-black text-[#D4AF37] font-mono text-[9px] uppercase tracking-wider font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                                >
                                  <span>{nextLabel}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              )}

                              {/* Open Medical Record Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedRecord(app);
                                  setClinicalNotesInput(app.clinicalNotes || '');
                                  setIsEditingClinicalNotes(false);
                                }}
                                className="px-2 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer"
                                title="Ver Prontuário & Evolução"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                              </button>

                              {/* Stage Selector Dropdown */}
                              <select
                                value={app.status || 'pending'}
                                onChange={(e) => onUpdateAppointment(app.id, { status: e.target.value as StageKey })}
                                className="bg-stone-900 border border-stone-800 text-stone-300 text-[9px] font-mono rounded-lg px-1.5 py-1.5 focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                                title="Alterar estágio manualmente"
                              >
                                <option value="pending">Agendado</option>
                                <option value="confirmed">Confirmado</option>
                                <option value="in_waiting">Recepção</option>
                                <option value="in_progress">Em Sala</option>
                                <option value="completed">Concluído</option>
                                <option value="cancelled">Cancelado</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL 1: Prontuário & Evolução Clínica Completo */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-[#D4AF37] max-w-2xl w-full p-5 sm:p-8 rounded-2xl relative shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto"
            >
              <button 
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full border border-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <div className="border-b border-[#D4AF37]/20 pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                    Prontuário Médico & Gestão Clínica
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                  {selectedRecord.clientName}
                </h3>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                  Contato: {selectedRecord.clientPhone} | Procedimento: {selectedRecord.procedureName}
                </p>
              </div>

              {/* Clinical Overview Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#121316] p-3 rounded-xl border border-white/5">
                  <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Status TCLE</p>
                  <span className="text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Assinado Digitalmente
                  </span>
                </div>
                <div className="bg-[#121316] p-3 rounded-xl border border-white/5">
                  <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Sala & Especialista</p>
                  <p className="text-white text-xs font-mono">{selectedRecord.room || 'Sala 01 Injetáveis'}</p>
                </div>
                <div className="bg-[#121316] p-3 rounded-xl border border-white/5">
                  <p className="font-mono text-[9px] text-stone-500 uppercase tracking-widest mb-1">Sinal / Financeiro</p>
                  <p className="text-[#D4AF37] text-xs font-mono font-bold">
                    R$ {(selectedRecord.price || 0).toLocaleString('pt-BR')} (Sinal Pago)
                  </p>
                </div>
              </div>

              {/* Anamnese */}
              <div className="space-y-1.5">
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">Resumo de Anamnese & Alergias</p>
                <div className="bg-[#121316] p-3.5 rounded-xl border border-white/5 text-xs text-stone-300 font-mono leading-relaxed">
                  {selectedRecord.anamneseSummary || 'Paciente sem contraindicações relatadas. Pele avaliada e liberada para procedimento.'}
                </div>
              </div>

              {/* Evolução Médica / Observações Clínicas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Evolução Clínica & Unidades Injetadas
                  </p>
                  {!isEditingClinicalNotes && (
                    <button
                      type="button"
                      onClick={() => setIsEditingClinicalNotes(true)}
                      className="text-[10px] font-mono text-[#D4AF37] hover:underline cursor-pointer uppercase tracking-wider"
                    >
                      Editar Anotações
                    </button>
                  )}
                </div>

                {isEditingClinicalNotes ? (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      value={clinicalNotesInput}
                      onChange={(e) => setClinicalNotesInput(e.target.value)}
                      placeholder="Ex: Aplicação de 50U Botox em terço superior (glabela e frontal). Lote #89421. Sem intercorrências..."
                      className="w-full bg-stone-900 border border-[#D4AF37] rounded-xl p-3 text-xs font-mono text-white placeholder:text-stone-600 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingClinicalNotes(false)}
                        className="px-3 py-1.5 rounded-lg border border-stone-700 text-stone-400 text-[10px] font-mono uppercase"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveNotes}
                        className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-black text-[10px] font-mono font-bold uppercase"
                      >
                        Salvar Evolução
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#121316] p-3.5 rounded-xl border border-white/5 text-xs text-stone-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {selectedRecord.clinicalNotes || 'Nenhuma evolução registrada ainda. Clique em "Editar Anotações" para adicionar doses e lotes.'}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-stone-800 text-stone-400 hover:text-white font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  Fechar Prontuário
                </button>
                <button 
                  type="button"
                  onClick={() => sendWhatsAppMessage(selectedRecord, selectedRecord.status === 'completed' ? 'postcare' : 'reminder')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-mono text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> 
                  {selectedRecord.status === 'completed' ? 'Enviar Cuidados Pós' : 'Enviar Lembrete WhatsApp'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Novo Agendamento Direto no CRM */}
      <AnimatePresence>
        {showNewAppModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0A0A0A] border border-[#D4AF37] max-w-lg w-full p-5 sm:p-8 rounded-2xl relative shadow-2xl space-y-4 my-auto max-h-[92vh] overflow-y-auto"
            >
              <button 
                type="button"
                onClick={() => setShowNewAppModal(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full border border-stone-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-[#D4AF37]/20 pb-3">
                <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest font-semibold block">
                  Recepção & CRM
                </span>
                <h3 className="font-serif text-2xl text-white mt-1">
                  Novo Agendamento
                </h3>
              </div>

              <form onSubmit={handleCreateAppointment} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Nome Completo do Paciente *
                  </label>
                  <input 
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Ex: Dra. Larissa Monteiro"
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      WhatsApp / Telefone *
                    </label>
                    <input 
                      type="text"
                      required
                      value={newClientPhone}
                      onChange={(e) => setNewClientPhone(e.target.value)}
                      placeholder="(11) 99999-8888"
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Procedimento
                    </label>
                    <select
                      value={newProcId}
                      onChange={(e) => setNewProcId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      {procedures.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} - R$ {p.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Data
                    </label>
                    <input 
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                      Horário
                    </label>
                    <input 
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-wider mb-1">
                    Coluna Inicial no Kanban
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as StageKey)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="pending">📋 Novos / Agendados</option>
                    <option value="confirmed">💬 Confirmados</option>
                    <option value="in_waiting">⏳ Na Recepção / Espera</option>
                    <option value="in_progress">💉 Em Atendimento</option>
                    <option value="completed">✨ Realizado / Concluído</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="newDeposit"
                    checked={newDepositPaid}
                    onChange={(e) => setNewDepositPaid(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37] rounded"
                  />
                  <label htmlFor="newDeposit" className="text-xs font-mono text-stone-300">
                    Sinal de 20% já recebido
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setShowNewAppModal(false)}
                    className="px-5 py-2.5 rounded-full border border-stone-800 text-stone-400 text-xs font-mono uppercase"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-xs font-mono uppercase hover:bg-white transition-all shadow-md"
                  >
                    Cadastrar no Kanban
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
