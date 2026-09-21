import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
  onGoHome?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[300px] w-full flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-stone-950/95 border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                {this.props.fallbackTitle || 'Aviso do Sistema'}
              </h3>
              <p className="font-mono text-xs text-stone-400 leading-relaxed">
                {this.props.fallbackMessage ||
                  'Ocorreu uma pequena instabilidade ao renderizar esta seção do painel.'}
              </p>
            </div>

            {this.state.error?.message && (
              <div className="p-3 rounded-lg bg-black/60 border border-stone-800 text-left overflow-x-auto">
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest block mb-1">
                  Detalhes do Log
                </span>
                <p className="font-mono text-[11px] text-amber-300 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  this.props.onReset?.();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-white text-black font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Tentar Novamente
              </button>

              {this.props.onGoHome && (
                <button
                  type="button"
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    this.props.onGoHome?.();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-stone-700 hover:border-[#D4AF37] text-stone-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  Voltar à Vitrine
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
