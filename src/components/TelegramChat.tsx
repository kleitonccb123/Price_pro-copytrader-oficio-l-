import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X } from 'lucide-react';
interface TelegramChatProps {
  telegramUrl: string;
}
export function TelegramChat({
  telegramUrl
}: TelegramChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setIsSubmitting(true);

    // Simular envio (você pode implementar sua lógica aqui)
    setTimeout(() => {
      // Redirecionar para o Telegram diretamente
      window.open(telegramUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
      setIsSubmitting(false);
      setIsOpen(false);
    }, 1000);
  };
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <>
      {/* Chat Button */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-[#0088cc] hover:bg-[#006ba8] text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-end p-4" onClick={() => setIsOpen(false)}>
            <motion.div initial={{
          x: 400,
          y: 100,
          opacity: 0
        }} animate={{
          x: 0,
          y: 0,
          opacity: 1
        }} exit={{
          x: 400,
          y: 100,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div className="bg-[#0088cc] text-white p-6 flex items-center justify-between relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0088cc] to-[#006ba8] opacity-90"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  {/* Animated Avatar Card */}
                  <div className="relative w-12 h-16 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#03a9f4] to-[#ff0058] rounded-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#03a9f4] to-[#ff0058] rounded-lg blur-[8px] opacity-60"></div>
                    <div className="absolute inset-[2px] bg-black/60 rounded-lg z-10"></div>
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white/80 transition-all duration-500 group-hover:scale-75 group-hover:translate-y-[-8px] group-hover:text-white" />
                    </div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                      <div className="text-white text-[8px] font-bold text-center uppercase tracking-wider">
                        Chat
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Chat Telegram</h3>
                    <p className="text-sm text-blue-100">Conecte-se conosco agora</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors relative z-10 p-2 hover:bg-white/10 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center mb-6">
                  <p className="text-gray-600 text-sm">Preencha seus dados e seja redirecionado para nosso grupo exclusivo no Telegram</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.1
              }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome completo *
                  </label>
                  <input type="text" value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200 bg-white shadow-sm" placeholder="Digite seu nome completo" required />
                </motion.div>

                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200 bg-white shadow-sm" placeholder="seu@email.com" required />
                </motion.div>

                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent transition-all duration-200 bg-white shadow-sm" placeholder="(11) 99999-9999" required />
                </motion.div>

                <motion.button type="submit" disabled={isSubmitting} className="w-full bg-[#0088cc] hover:bg-[#006ba8] disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none relative overflow-hidden group" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0088cc] to-[#006ba8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>
                        <Send className="w-5 h-5" />
                        Finalizar e Falar no Telegram
                      </>}
                  </div>
                </motion.button>

                <motion.div className="text-center" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.5
              }}>
                  <p className="text-xs text-gray-500">
                    🔒 Seus dados estão seguros • Redirecionamento automático para o Telegram
                  </p>
                </motion.div>
              </form>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
}