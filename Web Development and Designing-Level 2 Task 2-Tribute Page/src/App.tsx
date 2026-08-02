import React, { useState, useEffect } from 'react';
import { TRIBUTE_FIGURES } from './data/tributeData';
import { TributeFigure, FontPairing, ColorMode } from './types';
import { Header } from './components/Header';
import { RequirementsDrawer } from './components/RequirementsDrawer';
import { HeroSection } from './components/HeroSection';
import { BiographySection } from './components/BiographySection';
import { TimelineSection } from './components/TimelineSection';
import { QuotesSection } from './components/QuotesSection';
import { QuizSection } from './components/QuizSection';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedFigure, setSelectedFigure] = useState<TributeFigure>(TRIBUTE_FIGURES[0]);
  const [fontPairing, setFontPairing] = useState<FontPairing>('serif-sans');
  const [colorMode, setColorMode] = useState<ColorMode>('historic-amber');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [requirementsOpen, setRequirementsOpen] = useState<boolean>(false);

  // Stop speech synthesis when figure changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedFigure]);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const overviewText = `${selectedFigure.name}. ${selectedFigure.tagline}. ${selectedFigure.featuredQuote.text}`;
      const utterance = new SpeechSynthesisUtterance(overviewText);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Font pairing utility classes
  const getFontPairingClass = () => {
    switch (fontPairing) {
      case 'classic-editorial':
        return '[&_h1]:font-classic [&_h2]:font-classic [&_h3]:font-classic [&_p]:font-editorial';
      case 'modern-tech':
        return '[&_h1]:font-tech-mono [&_h2]:font-tech-mono [&_h3]:font-tech-mono [&_p]:font-sans-body';
      default:
        return '[&_h1]:font-serif-display [&_h2]:font-serif-display [&_h3]:font-serif-display [&_p]:font-sans-body';
    }
  };

  return (
    <div className={`min-h-screen bg-[#0F1115] text-[#E0E0E0] font-sans-body antialiased ${getFontPairingClass()}`}>
      
      {/* Header Navigation */}
      <Header
        figures={TRIBUTE_FIGURES}
        selectedFigure={selectedFigure}
        onSelectFigure={setSelectedFigure}
        fontPairing={fontPairing}
        onChangeFontPairing={setFontPairing}
        colorMode={colorMode}
        onChangeColorMode={setColorMode}
        isSpeaking={isSpeaking}
        onToggleSpeech={handleToggleSpeech}
        onOpenChecklist={() => setRequirementsOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero Header with Tagline & Prominent Royalty-Free Image */}
        <HeroSection
          figure={selectedFigure}
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
        />

        {/* Customizer Bar */}
        <ThemeCustomizer
          fontPairing={fontPairing}
          onChangeFontPairing={setFontPairing}
          colorMode={colorMode}
          onChangeColorMode={setColorMode}
        />

        {/* Section 2: Biography & Tribute (Warm Light Background Color - Background #2) */}
        <BiographySection
          figure={selectedFigure}
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
        />

        {/* Section 3: Interactive Timeline & Achievements (Dark Navy Background - Background #3) */}
        <TimelineSection figure={selectedFigure} />

        {/* Section 4: Distinctly Styled Quote Block & Archive */}
        <QuotesSection
          figure={selectedFigure}
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
        />

        {/* Section 5: Knowledge Trivia Challenge & Honor Certificate */}
        <QuizSection figure={selectedFigure} />
      </main>

      {/* Footer */}
      <Footer figure={selectedFigure} />

      {/* Oasis Task 2 Evaluation Checklist Modal */}
      <RequirementsDrawer
        isOpen={requirementsOpen}
        onClose={() => setRequirementsOpen(false)}
      />

    </div>
  );
}
