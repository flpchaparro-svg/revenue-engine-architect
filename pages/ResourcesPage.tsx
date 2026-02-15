import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import { downloadCopyFilesAsZip, COPY_FILES } from '../utils/downloadCopyFiles';

interface ResourcesPageProps {
  onBack: () => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ onBack }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    
    try {
      await downloadCopyFilesAsZip();
    } catch (err) {
      setError('Failed to download copy files. Please try again.');
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20">
        <BackButton onClick={onBack} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-dark mb-6">
            Resources
          </h1>
          
          <p className="text-lg text-dark/70 mb-8">
            Download all copy files and content documentation for this application.
          </p>

          <div className="bg-white border-2 border-dark p-8 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-dark text-cream rounded-full flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-dark mb-2">
                  Copy Files Archive
                </h2>
                <p className="text-dark/70 mb-4">
                  Download all markdown content files including pages, pillars, FAQs, and documentation.
                </p>
                
                <div className="space-y-2 text-sm text-dark/60 mb-6">
                  <p>📄 {COPY_FILES.length} markdown files</p>
                  <p>📦 Includes: Home, System, Pillars 1-7, FAQs, and more</p>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`
                    px-6 py-3 bg-dark text-cream font-semibold rounded-lg
                    transition-all duration-200
                    ${isDownloading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-dark/90 hover:shadow-lg'
                    }
                  `}
                >
                  {isDownloading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Preparing Download...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Download ZIP Archive
                    </span>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-dark/5 rounded-lg">
            <p className="text-sm text-dark/60">
              <strong>Note:</strong> These files are reference documentation for the application content. 
              They are not used directly by the app but serve as the source of truth for content updates.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourcesPage;
