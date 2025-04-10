"use client";

// import type { Metadata } from "next";
// import "./globals.css";
// import { Toaster } from "react-hot-toast";
// import StoreProvider from "@/store/StoreProvider";
// import DebugStore from "@/store/DebugStore";


// export const metadata: Metadata = {
//   title: "Login | ERP",
//   description: "ERP for MAIT",
//   icons: {
//     icon: "/logo.jpg"
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) 

// {



//   return (
//     <StoreProvider>
//       <html lang="en">
    
//         <body>
//           <Toaster />
//           <DebugStore />
//           {children}
//         </body>
//       </html>
//     </StoreProvider>
//   );
// }

// import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/store/StoreProvider";
import DebugStore from "@/store/DebugStore";
// import { useEffect, useState } from "react";

import DynamicCSS from "@/components/DynamicCSS";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [customCSS, setCustomCSS] = useState("");

  // useEffect(() => {
  //   // Fetch the dynamic CSS from your backend or Redux store
  //   const fetchCSS = async () => {
  //     try {
  //       const response = await fetch("/api/admin/uisetting");
  //       if (response.ok) {
  //         const data = await response.json();
  //         const css = `
  //           :root {
  //             --background-color: ${data.backgroundColor || "#ffffff"};
  //             --primary-color: ${data.primaryColor || "#000000"};
  //             --secondary-color: ${data.secondaryColor || "#f0f0f0"};
  //             --border-radius: ${data.borderRadius || "4px"};
  //             --heading-font: ${data.headingFont || "Arial, sans-serif"};
  //             --text-font: ${data.textFont || "Arial, sans-serif"};
  //           }
  //           body {
  //             background-color: var(--background-color);
  //             font-family: var(--text-font);
  //           }
  //           h1, h2, h3, h4, h5, h6 {
  //             font-family: var(--heading-font);
  //           }
  //         `;
  //         setCustomCSS(css);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching dynamic CSS:", error);
  //     }
  //   };

  //   fetchCSS();
  // }, []);

  return (
    <StoreProvider>
      <html lang="en">
        {/* <head>
          <style>{customCSS}</style>
        </head> */}

        <head>
          <DynamicCSS />
        </head>
        <body>
          <Toaster />
          <DebugStore />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}