export const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(`Succesfully copied`, text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };
  