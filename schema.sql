-- Schema de Banco de Dados Relacional (PostgreSQL / Supabase)
-- Clínica de Elite B2B SaaS

-- Tabela de Pacientes (CRM)
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Procedimentos (Catálogo)
CREATE TABLE procedures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Agendamentos (Consultas e Checkout)
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id),
    procedure_id UUID REFERENCES procedures(id),
    specialist_name VARCHAR(255) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled
    down_payment DECIMAL(10, 2) NOT NULL,
    anamnesis_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Grade de Horários (Calendário Master)
CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    specialist_name VARCHAR(255) NOT NULL,
    available_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_blocked BOOLEAN DEFAULT FALSE
);

-- Trigger: Impedir choque de horários na mesma data/hora para o mesmo especialista
CREATE OR REPLACE FUNCTION prevent_double_booking()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM appointments
        WHERE specialist_name = NEW.specialist_name
          AND appointment_date = NEW.appointment_date
          AND appointment_time = NEW.appointment_time
          AND status IN ('pending', 'confirmed')
    ) THEN
        RAISE EXCEPTION 'Horário já reservado para este especialista.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_double_booking
BEFORE INSERT OR UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION prevent_double_booking();

-- RLS (Row Level Security) - Supabase
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin pode gerenciar pacientes" ON patients FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public pode ler procedimentos" ON procedures FOR SELECT USING (true);
CREATE POLICY "Admin pode gerenciar procedimentos" ON procedures FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public pode criar agendamentos" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin pode ler agendamentos" ON appointments FOR SELECT USING (auth.role() = 'authenticated');
