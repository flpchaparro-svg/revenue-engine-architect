import { useEffect } from 'react';

/**
 * Custom hook to set the page title for SEO
 * @param title - The page title to display (will be appended with " | SYSBILT")
 */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | SYSBILT`;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
