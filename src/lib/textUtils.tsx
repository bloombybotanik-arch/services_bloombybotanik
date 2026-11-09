import React from 'react';

export const wrapTitle = (title: string) => {
  if (!title) return title;
  
  // Split by sentence enders or commas followed by a space
  const parts = title.split(/([.,]\s+)/);
  
  return parts.map((part, index) => {
    // If it's a separator, render it with a break
    if (/[.,]\s+/.test(part)) {
      return (
        <React.Fragment key={index}>
          {part.trim()}
          <br />
        </React.Fragment>
      );
    }
    return part;
  });
};
