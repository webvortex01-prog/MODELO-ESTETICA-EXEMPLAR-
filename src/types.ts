// Firebase / Supabase Schema Definition

export interface User {
  id: string; // Firebase UID
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'admin';
  createdAt: string; // ISO String
}

export interface Procedure {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  imageUrl?: string;
  category: 'toxin' | 'filler' | 'biostimulator' | 'other';
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  procedureId: string;
  procedureName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: 'pending' | 'confirmed' | 'in_waiting' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  depositPaid?: boolean;
  depositAmount?: number;
  room?: string;
  professional?: string;
  notes?: string;
  clinicalNotes?: string;
  tcleSigned?: boolean;
  anamneseSummary?: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  imageUrlBefore: string;
  imageUrlAfter: string;
  procedureId: string;
  description: string;
  isVisible: boolean;
  createdAt: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  active: boolean;
}
