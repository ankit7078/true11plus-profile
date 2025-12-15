/* ---------------- FORMAT DATE ---------------- */

export const formatDate = (iso?: string): string => {
  if (!iso) return "";

  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
};

/* ---------------- NOW RELATIVE ---------------- */

export const nowRelative = (): string => {
  const d = new Date();
  return d.toLocaleString();
};

/* ---------------- COPY TO CLIPBOARD ---------------- */

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard");
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      document.execCommand("copy");
      document.body.removeChild(textarea);

      alert("Link copied to clipboard");
    }
  } catch (error) {
    console.error("Copy failed", error);
    alert("Unable to copy link");
  }
};
