import React, { createContext, useContext, useRef, useState, useCallback, useMemo } from 'react';

interface GlossaryContextType {
  registerTerm: (termId: string) => boolean; // returns true if it is the FIRST occurrence
  resetGlossary: () => void;
}

const GlossaryContext = createContext<GlossaryContextType | null>(null);

export const GlossaryProvider: React.FC<{ children: React.ReactNode; pageKey?: string }> = ({
  children,
  pageKey
}) => {
  // We keep a Set of seen terms for the current page view
  const seenTermsRef = useRef<Set<string>>(new Set());
  const prevKeyRef = useRef<string | undefined>(pageKey);

  // If pageKey changes, clear the seen terms
  if (prevKeyRef.current !== pageKey) {
    seenTermsRef.current.clear();
    prevKeyRef.current = pageKey;
  }

  const registerTerm = useCallback((termId: string) => {
    const normalized = termId.toLowerCase().trim();
    if (seenTermsRef.current.has(normalized)) {
      return false; // already seen on this page
    }
    seenTermsRef.current.add(normalized);
    return true; // first occurrence!
  }, []);

  const resetGlossary = useCallback(() => {
    seenTermsRef.current.clear();
  }, []);

  const value = useMemo(
    () => ({
      registerTerm,
      resetGlossary
    }),
    [registerTerm, resetGlossary]
  );

  return <GlossaryContext.Provider value={value}>{children}</GlossaryContext.Provider>;
};

export function useGlossary() {
  return useContext(GlossaryContext);
}
