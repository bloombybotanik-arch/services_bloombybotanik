import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';
import styles from './HeroVideo.module.css';

interface HeroVideoProps {
  onScrollToOffers: () => void;
  onDiscoverMore?: () => void;
  lang?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onScrollToOffers,
  onDiscoverMore,
  lang = 'fr',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);

  const isDE = lang === 'de';
  const isFR = lang === 'fr';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setIsPlaying(false);
        setHasVideoError(true);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const copy = {
    badge: isFR ? "Séquençage Actif A/B · Précision ±0,5°C" : isDE ? "Aktive A/B-Sequenzierung · ±0,5°C Präzision" : "Active A/B Sequencing · ±0.5°C Precision",
    h1: isFR 
      ? "L'extracteur botanique qui révèle le Totum de vos plantes" 
      : isDE 
      ? "Der botanische Extraktor, der das Totum Ihrer Pflanzen entfaltet" 
      : "The botanical extractor revealing the full Totum of your herbs",
    subtitle: isFR
      ? "Macérats, huiles précieuses, élixirs et nectars : capturez 100% des principes actifs et terpènes sans jamais les brûler. L'ingénierie de précision au service de votre autonomie."
      : isDE
      ? "Mazerate, kostbare Öle, Elixiere und Nektare: Fangen Sie 100% der Wirkstoffe und Terpene ein, ohne sie jemals zu verbrennen."
      : "Macerates, precious botanical oils, elixirs, and nectars: capture 100% of active molecules and terpenes without ever burning them.",
    f1: isFR ? "Cuve Inox 304 Alimentaire Inerte" : isDE ? "Inerte 304-Lebensmitteledelstahlwanne" : "Food-Grade 304 Inert Stainless Steel",
    f2: isFR ? "Thermorégulation au demi-degré" : isDE ? "Präzise Temperaturregelung" : "Degree-precise thermoregulation",
    f3: isFR ? "Garantie 30j satisfait ou remboursé" : isDE ? "30 Tage Geld-zurück-Garantie" : "30-day money-back guarantee",
    ctaPrimary: isFR ? "Je commande ma BloomLab" : isDE ? "Meine BloomLab bestellen" : "Order my BloomLab",
    ctaSecondary: isFR ? "Découvrir la machine" : isDE ? "Das Gerät entdecken" : "Discover the Machine",
    trust1: isFR ? "⭐️ 4.9/5 (340+ avis vérifiés)" : isDE ? "⭐️ 4.9/5 (340+ verifizierte Bewertungen)" : "⭐️ 4.9/5 (340+ verified reviews)",
    trust2: isFR ? "🚚 Expédition sous 24/48h" : isDE ? "🚚 Versand innerhalb 24/48h" : "🚚 24/48h express shipping",
    trust3: isFR ? "🔒 Paiement 3x sans frais sécurisé" : isDE ? "🔒 3x zinsfreie Ratenzahlung" : "🔒 3x fee-free installment payment",
  };

  return (
    <section className={styles.heroContainer} aria-label="Présentation BloomLab">
      <div className={styles.videoWrapper}>
        {!hasVideoError ? (
          <video
            ref={videoRef}
            className={styles.videoElement}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/bloomlab_main_1784887530345.png"
            onError={() => setHasVideoError(true)}
            aria-label="Démonstration vidéo de la BloomLab en action"
          >
            <source src="/bloomlab_demo.mp4" type="video/mp4" />
            <source src="/videos/demo_bloomlab.mp4" type="video/mp4" />
            {/* Fallback image inside video element */}
            <img
              src="/images/bloomlab_main_1784887530345.png"
              alt="Extracteur Botanique BloomLab"
              className={styles.videoElement}
            />
          </video>
        ) : (
          <img
            src="/images/bloomlab_main_1784887530345.png"
            alt="Extracteur Botanique BloomLab"
            className={styles.videoElement}
          />
        )}

        {/* Gradient Scrim for optimal readability */}
        <div className={styles.scrimOverlay} />

        {/* Hero Card overlay */}
        <div className={styles.contentWrapper}>
          <div className={styles.heroCard}>
            <div className={styles.badge}>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{copy.badge}</span>
            </div>

            <h1 className={styles.title}>{copy.h1}</h1>

            <p className={styles.subtitle}>{copy.subtitle}</p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{copy.f1}</span>
              </div>
              <div className={styles.featureItem}>
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{copy.f2}</span>
              </div>
              <div className={styles.featureItem}>
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{copy.f3}</span>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <button
                type="button"
                onClick={onScrollToOffers}
                className={styles.primaryCta}
                aria-label={copy.ctaPrimary}
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>{copy.ctaPrimary}</span>
              </button>

              {onDiscoverMore && (
                <button
                  type="button"
                  onClick={onDiscoverMore}
                  className={styles.secondaryCta}
                  aria-label={copy.ctaSecondary}
                >
                  <span>{copy.ctaSecondary}</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Video mute & play controls */}
        {!hasVideoError && (
          <div className={styles.videoControls}>
            <button
              type="button"
              onClick={togglePlay}
              className={styles.controlButton}
              title={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
              aria-label={isPlaying ? "Mettre en pause la vidéo" : "Lire la vidéo"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className={styles.controlButton}
              title={isMuted ? "Activer le son" : "Couper le son"}
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Trust bar immediately underneath hero video */}
      <div className={styles.trustBar}>
        <div className={styles.trustBarInner}>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">★★★★★</span>
            <span className="font-semibold">{copy.trust1}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span>{copy.trust2}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{copy.trust3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
