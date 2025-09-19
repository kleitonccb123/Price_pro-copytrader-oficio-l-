import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoHomeOutline, IoVideocamOutline, IoChatbubblesOutline, IoStatsChartOutline, IoPersonCircleOutline } from 'react-icons/io5';
import { Play, CheckCircle, ChevronRight, Shield, BarChart3, Users, Video, Instagram } from "lucide-react";
import { HeroSection } from '@/components/TestimonialsCarousel';
import { DottedSurface } from '@/components/DottedSurface';
import { TelegramChat } from '@/components/TelegramChat';

// Importação das imagens de depoimentos
import depoimento1 from '@/assets/depoimento-1.png';
import depoimento2 from '@/assets/depoimento-2.png';
import depoimento3 from '@/assets/depoimento-3.png';
import depoimento4 from '@/assets/depoimento-4.png';
import depoimento5 from '@/assets/depoimento-5.png';
import depoimento6 from '@/assets/depoimento-6.png';
import { ImageZoom } from '@/components/ImageZoom';

/* =========================
   CONFIGURAÇÕES RÁPIDAS
   — personalize aqui e publique
========================= */
const CONFIG = {
  brand: {
    name: "PricePro Copy Trader — Marcos Barcelos",
    tagline: "Copie as minhas operações com gestão séria e transparência.",
    primary: "#0F172A",
    // slate-900
    accent: "#22C55E",
    // green-500
    gradientFrom: "#0EA5E9",
    // sky-500
    gradientTo: "#22C55E",
    // green-500
    textOnDark: "#F8FAFC"
  },
  links: {
    whatsapp: "https://wa.me/5551999999999?text=Quero%20entrar%20no%20Copy%20Trader%20PricePro",
    typebotWebhook: "https://your-webhook-or-typebot.com/submit",
    // Substitua pelo seu webhook/Typebot
    vslUrl: "https://www.youtube.com/embed/WysyD-8d63w?rel=0&modestbranding=1&controls=1",
    instagram: ["https://www.instagram.com/traderpriceforex/"]
  },
  compliance: {
    disclaimer: "Resultados passados não garantem performance futura. Operações envolvem riscos e podem resultar em perdas parciais ou totais do capital. Invista com responsabilidade."
  },
  tracking: {
    ga4: "G-XXXXXXX",
    pixelId: "1234567890"
  }
};

/* =========================
   MENU GRADIENTE (inspirado no snippet enviado)
========================= */
const menuItems = [{
  title: 'Início',
  icon: <IoHomeOutline />,
  gradientFrom: '#22C55E',
  gradientTo: '#60A5FA',
  target: '#hero'
}, {
  title: 'VSL',
  icon: <IoVideocamOutline />,
  gradientFrom: '#60A5FA',
  gradientTo: '#22C55E',
  target: '#vsl'
}, {
  title: 'Quem sou',
  icon: <IoPersonCircleOutline />,
  gradientFrom: '#22C55E',
  gradientTo: '#16A34A',
  target: '#about'
}, {
  title: 'Depoimentos',
  icon: <IoChatbubblesOutline />,
  gradientFrom: '#34D399',
  gradientTo: '#60A5FA',
  target: '#testimonials'
}];
function GradientMenu() {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <ul className="flex gap-4">
        {menuItems.map(({
        title,
        icon,
        gradientFrom,
        gradientTo,
        target
      }, idx) => <li key={idx} onClick={() => scrollTo(target)} style={{
        '--gradient-from': gradientFrom,
        '--gradient-to': gradientTo
      } as React.CSSProperties} className="relative w-[34px] h-[34px] bg-white/90 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[98px] hover:shadow-none group cursor-pointer overflow-hidden">
            {/* Fundo Gradiente no hover */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100" />
            {/* Glow */}
            <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[14px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50" />
            {/* Ícone */}
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0">
              <span className="text-2xl text-gray-600">{icon}</span>
            </span>
            {/* Título */}
            <span className="absolute text-white uppercase tracking-wide text-[11px] font-medium transition-all duration-500 scale-0 group-hover:scale-100">
              {title}
            </span>
          </li>)}
      </ul>
    </div>;
}

/* =========================
   MODAL QUIZ — multi‑passos
========================= */
interface QuizModalProps {
  open: boolean;
  onClose?: () => void;
}
function QuizModal({
  open,
  onClose
}: QuizModalProps) {
  const steps = [{
    id: 'nome',
    label: 'Seu nome completo',
    type: 'text',
    placeholder: 'Ex.: Marcos Barcelos'
  }, {
    id: 'email',
    label: 'Seu e-mail',
    type: 'email',
    placeholder: 'voce@exemplo.com'
  }, {
    id: 'telefone',
    label: 'Telefone com DDD',
    type: 'tel',
    placeholder: '(00) 90000-0000'
  }];
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(() => ({
    nome: '',
    email: '',
    telefone: ''
  }));
  const [submitting, setSubmitting] = useState(false);
  const current = steps[index];
  useEffect(() => {
    if (!open) {
      setIndex(0);
    }
  }, [open]);
  const canNext = useMemo(() => {
    const v = data[current?.id as keyof typeof data];
    return v !== undefined && String(v).length > 0;
  }, [current, data]);
  const handleChange = (id: string, value: any) => setData(d => ({
    ...d,
    [id]: value
  }));
  const submit = async () => {
    try {
      setSubmitting(true);
      localStorage.setItem('pricepro_lead', JSON.stringify(data));
      
      onClose?.();
      window.open('https://t.me/+hovOygBawbg5YWIx', '_blank');
    } catch (e) {
      console.error(e);
      onClose?.();
      window.open('https://t.me/+hovOygBawbg5YWIx', '_blank');
    } finally {
      setSubmitting(false);
    }
  };
  return <AnimatePresence>
      {open && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div initial={{
        y: 50,
        opacity: 0,
        scale: 0.95
      }} animate={{
        y: 0,
        opacity: 1,
        scale: 1
      }} exit={{
        y: 30,
        opacity: 0,
        scale: 0.95
      }} className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100">
            
            {/* Header com gradiente */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h3 className="text-xl font-bold">Entrar no Copy Trader</h3>
                  <p className="text-emerald-100 text-sm mt-1">Passo {index + 1} de {steps.length}</p>
                </div>
                <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                  ✕
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <motion.div 
                    key={s.id} 
                    className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                      i <= index ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i <= index ? 1 : 0 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={current.id}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">{current.label}</label>
                {current.type === 'text' || current.type === 'email' || current.type === 'tel' ? 
                  <input 
                    type={current.type} 
                    placeholder={current.placeholder} 
                    className="w-full rounded-xl border-2 border-gray-200 p-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm" 
                    value={data[current.id as keyof typeof data] as string} 
                    onChange={e => handleChange(current.id, e.target.value)} 
                  /> 
                : null}
              </motion.div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
              <motion.button 
                className="px-6 py-3 text-sm rounded-xl border-2 border-gray-200 hover:bg-gray-100 transition-colors font-medium" 
                onClick={() => index > 0 ? setIndex(index - 1) : onClose?.()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {index > 0 ? '← Voltar' : 'Cancelar'}
              </motion.button>
              
              {index < steps.length - 1 ? 
                <motion.button 
                  disabled={!canNext} 
                  onClick={() => setIndex(index + 1)} 
                  className={`px-8 py-3 text-sm rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    canNext 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                      : 'bg-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                  whileHover={canNext ? { scale: 1.05 } : {}}
                  whileTap={canNext ? { scale: 0.95 } : {}}
                >
                  Próximo <ChevronRight className="w-4 h-4" />
                </motion.button> 
              : 
                 <motion.button 
                  onClick={submit} 
                  disabled={submitting || !canNext} 
                  className={`px-8 py-3 text-sm rounded-xl font-bold transition-all flex items-center gap-2 ${
                    canNext 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
                      : 'bg-gray-200 cursor-not-allowed text-gray-500'
                  }`}
                  whileHover={canNext ? { scale: 1.05 } : {}}
                  whileTap={canNext ? { scale: 0.95 } : {}}
                >
                  {submitting ? 'Enviando...' : '🚀 Finalizar e Falar no Telegram'}
                </motion.button>
              }
            </div>
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
}

/* =========================
   SEÇÕES DA LP
========================= */
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}
function Section({
  id,
  children,
  className = ""
}: SectionProps) {
  return <section id={id} className={`scroll-mt-24 py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">{children}</div>
    </section>;
}
interface HeroProps {
  onOpenQuiz: () => void;
}
function Hero({
  onOpenQuiz
}: HeroProps) {
  return <Section id="hero" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
            <Shield className="w-4 h-4 text-secondary" /> Gestão responsável • Prova de resultados
          </div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Copie minhas operações com <span className="bg-gradient-title bg-clip-text text-gray-200">disciplina</span> e <span className="text-secondary">transparência</span>
          </h1>
          
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={onOpenQuiz} className="rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105 relative">
              {/* Glow effect no fundo */}
              <div className="absolute inset-0 rounded-xl bg-accent blur-lg opacity-50 -z-10"></div>
              <div className="absolute inset-0 rounded-xl bg-accent/30 blur-2xl opacity-40 -z-20 scale-110"></div>
              Entrar no Copy Trader
            </button>
            
          </div>
          
        </div>
        <div className="md:col-span-7">
          <div className="aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
            <iframe id="vsl" src={CONFIG.links.vslUrl} title="VSL Copy Trader" className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
        </div>
      </div>
    </Section>;
}
function About() {
  return <Section id="about" className="bg-slate-950 text-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-3">
          <div className="mb-6">
            <img src="/src/assets/dsg.png" alt="Marcos Barcelos - PricePro Copy Trader" className="w-full max-w-xs mx-auto rounded-2xl shadow-2xl" />
          </div>
        </div>
        <div className="md:col-span-9">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Quem sou</h2>
          <div className="mb-4">
            <h3 className="text-xl font-medium text-secondary mb-2">Trader Profissional - 30 anos</h3>
            <p className="text-gray-50">
              Do Rio de Janeiro. De estagiário ganhando R$800 ao sucesso no mercado financeiro. Desenvolveu um método lucrativo em apenas 1 ano de estudo no mercado de forex e hoje tem 9 anos de mercado financeiro!
            </p>
          </div>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Estratégia validada e documentada</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Comunidade e suporte</li>
            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" /> Relatórios e transparência</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="rounded-2xl border border-white/10 p-4">
          <h3 className="font-medium mb-2 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Indicadores PricePro</h3>
          <p className="text-sm text-gray-50">Alertas claros, filtros de risco, backtests e integração com rotinas de copy. Foco em execução simples e leitura objetiva de contexto.</p>
        </div>
        <div className="rounded-2xl border border-white/10 p-4">
          <h3 className="font-medium mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Comunidade</h3>
          <p className="text-sm text-gray-100">Grupo privado para alinhamento semanal, dúvidas e ajustes finos. Sem atalhos: método, disciplina e responsabilidade.</p>
        </div>
      </div>
      {/* Instagram links */}
      <div className="mt-10">
        <h4 className="text-sm uppercase tracking-wide mb-2 text-[#ff7070]">Siga no Instagram</h4>
        <div className="flex flex-wrap items-center gap-3">
          {CONFIG.links.instagram.map((href, i) => <a key={i} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5">
              <Instagram className="w-4 h-4" /> {href.replace('https://instagram.com/', '@')}
            </a>)}
        </div>
      </div>
    </Section>;
}
function Testimonials() {
  const testimonialImages = [{
    src: depoimento1,
    alt: 'Depoimento de cliente - Gabriel mostrando lucros'
  }, {
    src: depoimento2,
    alt: 'Depoimento de cliente - Aluno do Copy Trade com resultados'
  }, {
    src: depoimento3,
    alt: 'Depoimento de cliente - Ivan com 180 dólares de lucro'
  }, {
    src: depoimento4,
    alt: 'Depoimento de cliente - Copy Trade faturando em dólar'
  }, {
    src: depoimento5,
    alt: 'Depoimento de cliente - Feedback do Copy Price PRO FX'
  }, {
    src: depoimento6,
    alt: 'Depoimento de cliente - Diego com lucros diários'
  }];
  return <div id="testimonials" className="bg-slate-900">
      <HeroSection title={<span className="text-slate-100">Depoimentos</span>} subtitle="Veja os resultados reais dos nossos alunos do Copy Trade" images={testimonialImages} className="min-h-[600px] bg-slate-900" />
    </div>;
}

/* =========================
   RODAPÉ
========================= */
function Footer() {
  return <footer className="bg-slate-950 text-slate-400 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-slate-200 font-medium">{CONFIG.brand.name}</div>
            <div className="text-xs">{CONFIG.brand.tagline}</div>
          </div>
          <div className="text-xs">© {new Date().getFullYear()} • Todos os direitos reservados • Política & Termos</div>
        </div>
      </div>
    </footer>;
}

/* =========================
   PIXEL / GA4 (opcional)
========================= */
function useTracking() {
  useEffect(() => {
    if (CONFIG.tracking.ga4 && !(window as any).gtag) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.tracking.ga4}`;
      document.head.appendChild(s);
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      } // eslint-disable-line
      (window as any).gtag = gtag;
      gtag('js', new Date());
      gtag('config', CONFIG.tracking.ga4);
    }
    if (CONFIG.tracking.pixelId && !(window as any).fbq) {
      // Simplified Facebook Pixel implementation
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(s);
      (window as any).fbq = function () {
        (window as any).fbq.callMethod ? (window as any).fbq.callMethod.apply((window as any).fbq, arguments) : (window as any).fbq.queue.push(arguments);
      };
      (window as any).fbq.push = (window as any).fbq;
      (window as any).fbq.loaded = true;
      (window as any).fbq.version = '2.0';
      (window as any).fbq.queue = [];
      (window as any).fbq('init', CONFIG.tracking.pixelId);
      (window as any).fbq('track', 'PageView');
    }
  }, []);
}

/* =========================
   APP — LP COMPLETA
========================= */
export default function Index() {
  const [quizOpen, setQuizOpen] = useState(false);
  useTracking();
  return <div className="min-h-screen bg-slate-900 text-slate-100 relative">
      {/* Animated 3D Background */}
      <DottedSurface />
      
      <main className="relative z-10">
        <Hero onOpenQuiz={() => setQuizOpen(true)} />
        {/* VSL âncora dedicada (para o menu ir certinho) */}
        <div id="vsl" />
        <About />
        <Testimonials />
      </main>
      <Footer />

      {/* Modal do Quiz */}
      <QuizModal open={quizOpen} onClose={() => setQuizOpen(false)} />

      {/* Menu Gradiente flutuante */}
      <GradientMenu />
      
      {/* Chat Telegram */}
      <TelegramChat telegramUrl="https://t.me/+hovOygBawbg5YWIx" />

      {/* Botão CTA Final */}
      <Section id="cta-final" className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para começar a <span className="text-emerald-100">copiar minhas operações?</span>
            </h2>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Junte-se aos traders que já estão lucrando com gestão séria e transparência total.
            </p>
            
            <motion.button
              onClick={() => setQuizOpen(true)}
              className="inline-flex items-center gap-3 bg-white text-emerald-600 px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300 hover:bg-emerald-50 hover:scale-105 hover:shadow-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-6 h-6" />
              Entrar no Copy Trader Agora
              <ChevronRight className="w-6 h-6" />
            </motion.button>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-emerald-100 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Gestão responsável</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Transparência total</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Suporte completo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>;
}