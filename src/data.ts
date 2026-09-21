import { Procedure, Appointment } from './types';

export const procedures: Procedure[] = [
  {
    id: 'p1',
    name: 'Toxina Botulínica (Botox Full Face)',
    description: 'Suavização avançada de rugas e linhas de expressão em toda a face, mantendo a naturalidade.',
    durationMinutes: 40,
    price: 1800,
    category: 'toxin'
  },
  {
    id: 'p2',
    name: 'Preenchimento Labial Russo',
    description: 'Técnica exclusiva para volume vertical, contorno definido e hidratação profunda (Ácido Hialurônico).',
    durationMinutes: 60,
    price: 1950,
    category: 'filler'
  },
  {
    id: 'p3',
    name: 'Bioestimulador de Colágeno (Radiesse)',
    description: 'Firmeza estrutural e estimulação profunda para rejuvenescimento e efeito lifting sem cirurgia.',
    durationMinutes: 60,
    price: 3200,
    category: 'biostimulator'
  },
  {
    id: 'p4',
    name: 'Preenchimento de Olheiras',
    description: 'Restauração de volume na região periorbital, suavizando o aspecto de cansaço.',
    durationMinutes: 45,
    price: 1600,
    category: 'filler'
  },
  {
    id: 'p5',
    name: 'Rinomodelação Avançada',
    description: 'Alinhamento do dorso e empinamento da ponta nasal sem cirurgia, com ácido hialurônico de alta densidade.',
    durationMinutes: 60,
    price: 2500,
    category: 'filler'
  },
  {
    id: 'p6',
    name: 'Fios de Sustentação (Fios de PDO)',
    description: 'Lifting facial não cirúrgico e indução de colágeno através de fios de polidioxanona.',
    durationMinutes: 90,
    price: 3500,
    category: 'biostimulator'
  },
  {
    id: 'p7',
    name: 'Harmonização Facial Completa',
    description: 'Protocolo Elite: Reestruturação global da face, volumização, contorno mandibular e malar (até 5 seringas).',
    durationMinutes: 120,
    price: 7500,
    category: 'filler'
  },
  {
    id: 'p8',
    name: 'Bumbum Max (Glúteo de Alta Performance)',
    description: 'Volumização, contorno e tratamento de celulites nos glúteos com bioestimuladores e ácido hialurônico corporal.',
    durationMinutes: 90,
    price: 6000,
    category: 'other'
  },
  {
    id: 'p9',
    name: 'Skinbooster Profundo',
    description: 'Hidratação injetável de dentro para fora, devolvendo viço, elasticidade e luminosidade à pele.',
    durationMinutes: 45,
    price: 1200,
    category: 'other'
  },
  {
    id: 'p10',
    name: 'Lipo de Papada Enzimática',
    description: 'Redução da gordura submentoniana através da aplicação de enzimas lipolíticas de alta eficácia.',
    durationMinutes: 30,
    price: 900,
    category: 'other'
  },
  {
    id: 'p11',
    name: 'Preenchimento Mandibular e Malar',
    description: 'Definição do contorno do rosto e projeção das maçãs para um perfil elegante e simétrico.',
    durationMinutes: 60,
    price: 2800,
    category: 'filler'
  },
  {
    id: 'p12',
    name: 'Bioestimulador Sculptra',
    description: 'O ouro padrão na produção de colágeno, ideal para flacidez facial e corporal de grau moderado a severo.',
    durationMinutes: 60,
    price: 3500,
    category: 'biostimulator'
  },
  {
    id: 'p13',
    name: 'Protocolo Lavieen (Laser BB Laser)',
    description: 'Efeito pele de porcelana. Trata manchas, poros dilatados e textura, com downtime mínimo.',
    durationMinutes: 40,
    price: 1500,
    category: 'other'
  },
  {
    id: 'p14',
    name: 'Toxina Nefertiti (Pescoço)',
    description: 'Técnica focada no músculo platisma para melhorar o contorno da linha da mandíbula e suavizar o pescoço.',
    durationMinutes: 30,
    price: 1400,
    category: 'toxin'
  },
  {
    id: 'p15',
    name: 'Microagulhamento Robótico + Exossomos',
    description: 'Terapia regenerativa celular avançada para cicatrizes de acne, melasma e rejuvenescimento supremo.',
    durationMinutes: 90,
    price: 2200,
    category: 'other'
  }
];

export const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

export const todayAppointments: Appointment[] = [
  {
    id: 'a1',
    clientId: 'c1',
    clientName: 'Isabella Costa',
    clientPhone: '(11) 99999-1111',
    procedureId: 'p1',
    procedureName: 'Toxina Botulínica (Botox Full Face)',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    status: 'confirmed',
    price: 1800,
    createdAt: new Date().toISOString()
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
    status: 'confirmed',
    price: 1950,
    createdAt: new Date().toISOString()
  }
];
