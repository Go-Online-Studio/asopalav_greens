import React from 'react';

/**
 * WordReveal — Splits text into words, wrapping each in overflow-hidden spans.
 * Each inner span animates from y:"100%" to y:"0%" via GSAP.
 * Explicit {" "} after every word prevents the space-stripping bug.
 */
export const WordReveal: React.FC<{
  text: string;
  className?: string;
  as?: React.ElementType;
}> = ({ text, className = '', as: Tag = 'span' }) => {
  const words = text.split(' ');
  return (
    <Tag className={`word-reveal ${className}`}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <span className="word-reveal-inner inline-block will-change-transform" style={{ transform: 'translateY(100%)' }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/**
 * CSS class constants for GSAP-targeted elements.
 * Use these as className markers so useGSAP scoped queries can find them.
 */
export const ANIM = {
  /** Word-by-word reveal (apply to parent, inner .word-reveal-inner gets animated) */
  WORD_REVEAL: 'word-reveal',
  /** Fade-in-up for paragraphs, badges, buttons */
  FADE_UP: 'gsap-fade-up',
  /** Clip-path reveal for images */
  CLIP_REVEAL: 'gsap-clip-reveal',
  /** Parallax image (must be inside overflow-hidden container) */
  PARALLAX_IMG: 'gsap-parallax-img',
  /** Scale-in card animation */
  SCALE_IN: 'gsap-scale-in',
  /** Stagger children */
  STAGGER: 'gsap-stagger',
  /** Counter / number animation */
  COUNTER: 'gsap-counter',
} as const;
