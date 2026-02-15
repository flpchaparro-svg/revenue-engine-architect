import JSZip from 'jszip';

/**
 * List of all copy files in the /copy directory.
 * Note: This list must be kept synchronized with the copy directory.
 * When adding or removing files, update this list accordingly.
 */
export const COPY_FILES = [
  'architect.md',
  'contact.md',
  'evidence-vault.md',
  'faq-pillar1.md',
  'faq-pillar2.md',
  'faq-pillar3.md',
  'faq-pillar4.md',
  'faq-pillar5.md',
  'faq-pillar6.md',
  'faq-pillar7.md',
  'faq-system.md',
  'footer.md',
  'home.md',
  'not-found.md',
  'pillar1.md',
  'pillar2.md',
  'pillar3.md',
  'pillar4.md',
  'pillar5.md',
  'pillar6.md',
  'pillar7.md',
  'privacy.md',
  'process.md',
  'proof.md',
  'system.md',
];

/**
 * Downloads all copy files (markdown files) as a ZIP archive
 */
export async function downloadCopyFilesAsZip(): Promise<void> {
  try {
    const zip = new JSZip();
    const copyFolder = zip.folder('copy');
    
    if (!copyFolder) {
      throw new Error('Failed to create copy folder in ZIP');
    }

    // Fetch all copy files
    const fetchPromises = COPY_FILES.map(async (fileName) => {
      try {
        const response = await fetch(`/copy/${fileName}`);
        if (!response.ok) {
          console.warn(`Failed to fetch ${fileName}: ${response.statusText}`);
          return null;
        }
        const content = await response.text();
        return { fileName, content };
      } catch (error) {
        console.warn(`Error fetching ${fileName}:`, error);
        return null;
      }
    });

    const results = await Promise.all(fetchPromises);

    // Add files to ZIP
    results.forEach((result) => {
      if (result) {
        copyFolder.file(result.fileName, result.content);
      }
    });

    // Generate ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Create download link
    const url = URL.createObjectURL(zipBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'revenue-engine-architect-copy-files.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading copy files:', error);
    throw error;
  }
}
