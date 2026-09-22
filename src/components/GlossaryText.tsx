import React from 'react';
import { TooltipLexique } from './TooltipLexique';

interface GlossaryTextProps {
  children: React.ReactNode;
}

/**
 * GlossaryText component to wrap rich content sections.
 */
export const GlossaryText: React.FC<GlossaryTextProps> = ({ children }) => {
  return <>{children}</>;
};

export default GlossaryText;
