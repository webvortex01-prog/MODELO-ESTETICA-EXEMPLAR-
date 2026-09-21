import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, FileText, X } from 'lucide-react';

interface DigitalConsentModalProps {
  procedureName: string;
  clientName: string;
  onClose: () => void;
  onSigned: () => void;
}

export default function DigitalConsentModal({ procedureName, clientName, onClose, onSigned }: DigitalConsentModalProps) {
  const [hasDrawn, setHasDrawn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

  const startDrawing = (_e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0D0F12] border border-[#D4AF37]/40 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 md:p-10 relative shadow-[0_0_80px_rgba(212,175,55,0.15)] space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="border-b border-[#D4AF37]/20 pb-3 sm:pb-4 pr-8 sm:pr-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Segurança Jurídica & Saúde
          </div>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white">Termo de Consentimento (TCLE)</h3>
          <p className="font-mono text-[9px] sm:text-[10px] text-[#D4AF37] uppercase tracking-wider sm:tracking-widest mt-1">
            Procedimento: {procedureName} {clientName ? `• Paciente: ${clientName}` : ''}
          </p>
        </div>

        <div className="bg-[#141619] rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 space-y-2.5 font-mono text-[11px] sm:text-xs text-stone-300 leading-relaxed max-h-40 sm:max-h-48 overflow-y-auto">
          <p>Declaro para os devidos fins que fui devidamente esclarecido(a) pela equipe médica e estética da Lumière Clinic sobre o procedimento de <strong className="text-[#D4AF37]">{procedureName}</strong>.</p>
          <p>Compreendo os objetivos, os cuidados pré e pós-procedimento, possíveis reações transitórias (como leve edema ou equimose) e a necessidade de comparecer à revisão agendada.</p>
          <p>Autorizo a realização do protocolo e o registro fotográfico clínico estrito para acompanhamento de evolução, respeitando o sigilo médico profissional.</p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <label className="block font-mono text-[9px] sm:text-[10px] uppercase text-stone-400 tracking-wider sm:tracking-widest">
            Assinatura Digital do Paciente (Desenhe abaixo com o dedo ou mouse)
          </label>
          <div className="border border-stone-700 bg-stone-950/80 rounded-xl sm:rounded-2xl relative overflow-hidden shadow-inner">
            <canvas 
              ref={canvasRef}
              width={540}
              height={150}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-32 sm:h-36 cursor-crosshair touch-none"
            />
            <button 
              onClick={clearCanvas}
              className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-stone-800/90 text-stone-300 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest hover:bg-stone-700 border border-stone-700 transition-colors cursor-pointer"
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-stone-700 text-stone-400 font-mono text-[9px] uppercase tracking-widest hover:text-white hover:border-stone-500 transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button 
            onClick={() => {
              onSigned();
              onClose();
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-black font-mono text-[9px] uppercase tracking-wider sm:tracking-[0.2em] font-bold hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" /> Assinar & Confirmar Agendamento
          </button>
        </div>
      </motion.div>
    </div>
  );
}
