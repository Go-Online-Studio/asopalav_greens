/**
 * WhatsApp Helper Utility
 * Dynamically generates mobile vs desktop WhatsApp URLs with debounced resize & orientation tracking.
 */

export const DEFAULT_WHATSAPP_NUMBER = '918155089958';

/**
 * Checks whether current device is mobile or tablet
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isNarrowScreen = window.innerWidth <= 1024;
  return isMobileUA || (isTouchScreen && isNarrowScreen);
};

/**
 * Generates dynamic WhatsApp URL for mobile vs desktop:
 * - Mobile / Tablet: https://api.whatsapp.com/send?phone=...&text=...
 * - Desktop Web: https://web.whatsapp.com/send?phone=...&text=...
 */
export const getWhatsAppUrl = (
  text?: string,
  phone: string = DEFAULT_WHATSAPP_NUMBER
): string => {
  const isMobile = isMobileDevice();
  const baseUrl = isMobile
    ? 'https://api.whatsapp.com/send'
    : 'https://web.whatsapp.com/send';

  const cleanPhone = phone.replace(/\D/g, '');
  const params = new URLSearchParams();
  if (cleanPhone) params.append('phone', cleanPhone);
  if (text) params.append('text', text);

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * Opens WhatsApp dynamically in new tab/window
 */
export const openWhatsApp = (
  text?: string,
  phone: string = DEFAULT_WHATSAPP_NUMBER
): void => {
  if (typeof window === 'undefined') return;
  const url = getWhatsAppUrl(text, phone);
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Debounce utility
 */
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number = 150
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Custom React hook to keep WhatsApp URLs reactive to window resize and orientation
 */
import { useState, useEffect } from 'react';

export const useWhatsAppUrl = (
  text?: string,
  phone: string = DEFAULT_WHATSAPP_NUMBER
): string => {
  const [url, setUrl] = useState(() => getWhatsAppUrl(text, phone));

  useEffect(() => {
    const updateUrl = () => {
      setUrl(getWhatsAppUrl(text, phone));
    };

    const debouncedUpdate = debounce(updateUrl, 150);

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', debouncedUpdate);
    };
  }, [text, phone]);

  return url;
};

