
"use client";

import { useEffect, useState } from "react";

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
              --background-color: ${data.backgroundColor || "#ffffff"};
              --primary-color: ${data.primaryColor || "#000000"};
              --secondary-color: ${data.secondaryColor || "#f0f0f0"};
              --border-radius: ${data.borderRadius || "4px"};
              --heading-font: ${data.headingFont || "Arial, sans-serif"};
              --text-font: ${data.textFont || "Arial, sans-serif"};
            }
            body {
              background-color: var(--background-color);
              font-family: var(--text-font);
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

  return <style>{customCSS}</style>;
}