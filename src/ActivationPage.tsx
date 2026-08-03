import React, { useState } from 'react';
import { Upload, FileCheck, ShieldCheck, AlertCircle, Loader2, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { wrapTitle } from './lib/textUtils';

interface ActivationPageProps {
  userId: string | null;
  onSuccess: () => void;
}

export default function ActivationPage({ userId, onSuccess }: ActivationPageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userId) return;

    setLoading(true);
    setStatus('idle');

    const formData = new FormData();
    formData.append('invoice', file);
    formData.append('userId', userId);

    try {
      const response = await fetch('/api/activate-bloomlab', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Votre BloomLab a été identifiée avec succès ! Votre accès Premium est activé pour 1 mois.');
        setTimeout(() => onSuccess(), 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Une erreur est survenue lors de la vérification.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1B3022]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#1B3022]/5 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-botanik-orange/10 rounded-full text-[10px] font-black uppercase tracking-widest text-botanik-orange mb-8"
          >
            <ShieldCheck className="w-3 h-3" /> Souveraineté Activée
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            {wrapTitle("Activez votre Accès Premium Bloom")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#1B3022]/70 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Téléversez votre facture d'achat de la BloomLab. Notre système vérifie votre achat instantanément et active votre accès aux protocoles experts.
          </motion.p>
        </div>
      </section>

      {/* Upload Form Section */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-botanik-green/5 border border-botanik-green/10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={loading}
                />
                <div className={`
                  border-2 border-dashed rounded-2xl p-12 text-center transition-all
                  ${file ? 'border-botanik-green bg-botanik-green/5' : 'border-botanik-green/20 hover:border-botanik-green/40'}
                `}>
                  {preview ? (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-botanik-green/10 rounded-xl flex items-center justify-center mx-auto">
                        <FileCheck className="w-10 h-10 text-botanik-green" />
                      </div>
                      <p className="font-bold text-sm">{file?.name}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                          setPreview(null);
                        }}
                        className="text-xs text-red-500 font-bold hover:underline"
                      >
                        Changer de fichier
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-[#1B3022]/5 rounded-xl flex items-center justify-center mx-auto">
                        <Upload className="w-10 h-10 text-[#1B3022]/40" />
                      </div>
                      <div>
                        <p className="font-bold text-lg mb-1">Déposez votre facture ici</p>
                        <p className="text-sm text-[#1B3022]/60">ou cliquez pour parcourir vos fichiers</p>
                      </div>
                      <p className="text-[10px] text-[#1B3022]/40 uppercase tracking-widest font-bold">PDF, JPG, PNG · Max 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {status === 'success' ? (
                      <Check className="w-5 h-5 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mt-0.5" />
                    )}
                    <p className="text-sm font-medium">{message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={!file || loading || status === 'success'}
                className={`
                  w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all
                  ${!file || loading || status === 'success'
                    ? 'bg-[#1B3022]/10 text-[#1B3022]/30 cursor-not-allowed'
                    : 'bg-botanik-orange text-white shadow-xl shadow-botanik-orange/20 hover:-translate-y-1'}
                `}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Vérification par IA en cours...
                  </>
                ) : (
                  <>
                    Activer mon accès Premium
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 bg-[#1B3022]/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center italic">Questions fréquentes</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl">
              <h3 className="font-bold mb-2">Que se passe-t-il après le mois gratuit ?</h3>
              <p className="text-sm text-[#1B3022]/70 leading-relaxed">
                Votre compte basculera automatiquement en mode Freemium. Vous conserverez vos favoris mais n'aurez plus accès aux protocoles experts, sauf si vous choisissez de vous abonner.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl">
              <h3 className="font-bold mb-2">Combien de temps prend la vérification ?</h3>
              <p className="text-sm text-[#1B3022]/70 leading-relaxed">
                Grâce à notre intelligence artificielle Bloom, la vérification est instantanée. Dès que la facture est validée, vos droits sont mis à jour en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
