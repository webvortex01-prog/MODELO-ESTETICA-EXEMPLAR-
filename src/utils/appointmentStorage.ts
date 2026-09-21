import { Appointment } from '../types';
import { todayAppointments as initialAppointments } from '../data';

const STORAGE_KEY = 'lumiere_appointments_v1';
const SYNC_EVENT = 'lumiere_appointments_updated';

// Default enriched appointments if none in storage
const defaultMockData: Appointment[] = [
  {
    id: 'a1',
    clientId: 'c1',
    clientName: 'Isabella Costa',
    clientPhone: '(11) 99999-1111',
    procedureId: 'p1',
    procedureName: 'Toxina Botulínica (Botox Full Face)',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    status: 'in_progress',
    price: 1800,
    depositPaid: true,
    depositAmount: 360,
    room: 'Sala 01 - Injetáveis VIP',
    professional: 'Dra. Eliana Becker',
    tcleSigned: true,
    clinicalNotes: 'Aplicação de 50U Botox em terço superior (glabela, frontal e periorbicular). Paciente orientada sobre não deitar por 4h.',
    anamneseSummary: 'Pele sem contraindicações. Sem alergias.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'a2',
    clientId: 'c2',
    clientName: 'Amanda Silva',
    clientPhone: '(11) 98888-2222',
    procedureId: 'p2',
    procedureName: 'Preenchimento Labial Russo',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    status: 'in_waiting',
    price: 1950,
    depositPaid: true,
    depositAmount: 390,
    room: 'Sala 02 - Harmonização',
    professional: 'Dra. Camila Ramos',
    tcleSigned: true,
    clinicalNotes: 'Deseja projeção de tubérculos centrais e arco do cupido. Usar Juvederm Ultra Plus 1.0ml.',
    anamneseSummary: 'Histórico de herpes labial profilaxia prévia realizada.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'a3',
    clientId: 'c3',
    clientName: 'Mariana Medeiros',
    clientPhone: '(11) 97777-3333',
    procedureId: 'p7',
    procedureName: 'Harmonização Facial Completa',
    date: new Date().toISOString().split('T')[0],
    time: '16:30',
    status: 'confirmed',
    price: 7500,
    depositPaid: true,
    depositAmount: 1500,
    room: 'Sala 01 - Injetáveis VIP',
    professional: 'Dra. Eliana Becker',
    tcleSigned: true,
    clinicalNotes: 'Avaliação 3D concluída. Protocolo com 4 seringas de ácido hialurônico e 1 ampola de bioestimulador.',
    anamneseSummary: 'Pele mista, fototipo III.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'a4',
    clientId: 'c4',
    clientName: 'Carolina Braga',
    clientPhone: '(11) 96666-4444',
    procedureId: 'p3',
    procedureName: 'Bioestimulador de Colágeno (Radiesse)',
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    status: 'pending',
    price: 3200,
    depositPaid: true,
    depositAmount: 640,
    room: 'Sala 03 - Laser & Corporal',
    professional: 'Dra. Beatriz Fontana',
    tcleSigned: true,
    clinicalNotes: 'Agendamento recém-recebido via aplicativo. Aguardando conferência de sinal.',
    anamneseSummary: 'Primeira vez na clínica.',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  {
    id: 'a5',
    clientId: 'c5',
    clientName: 'Fernanda Albuquerque',
    clientPhone: '(11) 95555-5555',
    procedureId: 'p5',
    procedureName: 'Rinomodelação Avançada',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: '11:00',
    status: 'completed',
    price: 2500,
    depositPaid: true,
    depositAmount: 500,
    room: 'Sala 01 - Injetáveis VIP',
    professional: 'Dra. Eliana Becker',
    tcleSigned: true,
    clinicalNotes: 'Procedimento finalizado com sucesso. Dorso retificado com 0.7ml Restylane Lyft. Revisão em 15 dias.',
    anamneseSummary: 'Sem intercorrências.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

export function getStoredAppointments(): Appointment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMockData));
      return defaultMockData;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultMockData;
  } catch (e) {
    console.error('Error loading appointments from storage:', e);
    return defaultMockData;
  }
}

export function saveStoredAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: appointments }));
    }
  } catch (e) {
    console.error('Error saving appointments to storage:', e);
  }
}

export function addStoredAppointment(
  appointmentData: Omit<Appointment, 'id' | 'createdAt'> & { id?: string; createdAt?: string }
): Appointment {
  const current = getStoredAppointments();
  const newAppointment: Appointment = {
    ...appointmentData,
    id: appointmentData.id || `ag-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: appointmentData.createdAt || new Date().toISOString(),
    status: appointmentData.status || 'pending',
    depositPaid: appointmentData.depositPaid ?? true,
    depositAmount: appointmentData.depositAmount || (appointmentData.price ? appointmentData.price * 0.2 : 0),
    room: appointmentData.room || 'Sala 01 - Injetáveis VIP',
    professional: appointmentData.professional || 'Dra. Eliana Becker',
    tcleSigned: appointmentData.tcleSigned ?? true
  };

  const updated = [newAppointment, ...current];
  saveStoredAppointments(updated);
  return newAppointment;
}

export function updateStoredAppointment(id: string, updates: Partial<Appointment>): Appointment[] {
  const current = getStoredAppointments();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveStoredAppointments(updated);
  return updated;
}

export function deleteStoredAppointment(id: string): Appointment[] {
  const current = getStoredAppointments();
  const updated = current.filter((item) => item.id !== id);
  saveStoredAppointments(updated);
  return updated;
}

export function subscribeAppointments(callback: (appointments: Appointment[]) => void): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<Appointment[]>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getStoredAppointments());
    }
  };

  window.addEventListener(SYNC_EVENT, handler);
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      callback(getStoredAppointments());
    }
  });

  return () => {
    window.removeEventListener(SYNC_EVENT, handler);
  };
}
