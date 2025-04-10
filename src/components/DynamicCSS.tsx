"use client";

import { useEffect, useState } from "react";

const fontMap: Record<string, string> = {
  INTER: '"Inter", sans-serif',
  ROBOTO: '"Roboto", sans-serif',
  MONTSERRAT: '"Montserrat", sans-serif',
  POPPINS: '"Poppins", sans-serif',
  OPEN_SANS: '"Open Sans", sans-serif',
  RALEWAY: '"Raleway", sans-serif',
};

const fontWeightMap: Record<string, string> = {
  THIN: "100",
  EXTRA_LIGHT: "200",
  LIGHT: "300",
  NORMAL: "400",
  MEDIUM: "500",
  SEMI_BOLD: "600",
  BOLD: "700",
  EXTRA_BOLD: "800",
  BLACK: "900",
};

const fontSizeMap: Record<string, string> = {
  XS: "0.75rem",
  SM: "0.875rem",
  BASE: "1rem",
  LG: "1.125rem",
  XL: "1.25rem",
  XXL: "1.5rem",
};

export default function DynamicCSS() {
  const [customCSS, setCustomCSS] = useState("");

  useEffect(() => {
    const fetchCSS = async () => {
      try {
        const response = await fetch("/api/admin/uisetting");
        if (response.ok) {
          const data = await response.json();

          const css = `
            :root {
              --background-color: ${data.theme === "dark" ? "#171717" : "#F5F5F5"};
              --primary-color: ${data.primaryColor || "#000000"};
              --secondary-color: ${data.secondaryColor || "#f0f0f0"};
              --border-radius: ${data.borderRadius || "4px"};
              --font-size: ${fontSizeMap[data.fontSize] || "1rem"};
              --font-weight: ${fontWeightMap[data.fontWeight] || "400"};
              --heading-font: ${fontMap[data.headingFont] || "Arial, sans-serif"};
              --text-font: ${fontMap[data.textFont] || "Arial, sans-serif"};
            }

            body {
              background-color: var(--background-color);
              font-family: var(--text-font);
              font-size: var(--font-size);
              font-weight: var(--font-weight);
            }

            h1, h2, h3, h4, h5, h6 {
              font-family: var(--heading-font);
            }
          `;

          setCustomCSS(css);
        }
      } catch (error) {
        console.error("Error fetching dynamic CSS:", error);
      }
    };

    fetchCSS();
  }, []);

  if (typeof window === "undefined") return null;

  return <style>{customCSS}</style>;
}