// import type { Config } from "tailwindcss";
// import tailwindcssanimate from "tailwindcss-animate";

// export default {
//   darkMode: ["class"],
//   content: [
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           // DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         main: "#B026FF",
//         light: "#F5F5F5",
//         dark: "#171717",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           "1": "hsl(var(--chart-1))",
//           "2": "hsl(var(--chart-2))",
//           "3": "hsl(var(--chart-3))",
//           "4": "hsl(var(--chart-4))",
//           "5": "hsl(var(--chart-5))",
//         },
//       },
//       borderRadius: {
//         custom: "var(--border-radius)", 
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       fontSize: {
//         custom: "var(--font-size)", 
//         xs: "0.75rem",
//         sm: "0.875rem",
//         base: "1rem",
//         lg: "1.125rem",
//         xl: "1.25rem",
//         "2xl": "1.5rem",
//         "3xl": "1.875rem",
//         "4xl": "2.25rem",
//         "5xl": "3rem",
//       },
//       fontWeight: {
//         custom: "var(--font-weight)", 
//         thin: "100",
//         extralight: "200",
//         light: "300",
//         normal: "400",
//         medium: "500",
//         semibold: "600",
//         bold: "700",
//         extrabold: "800",
//         black: "900",
//       },
//       fontFamily: {
//         heading: "var(--heading-font)", 
//         text: "var(--text-font)", 
//         sans: ["ui-sans-serif", "system-ui"],
//         serif: ["ui-serif", "Georgia"],
//         mono: ["ui-monospace", "SFMono-Regular"],
//       },
//     },
//   },
//   plugins: [tailwindcssanimate],
// } satisfies Config;

import type { Config } from "tailwindcss";
import tailwindcssanimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary-color))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary-color))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        background: "hsl(var(--background-color))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        custom: "var(--border-radius)", 
      },
      fontSize: {
        custom: "var(--font-size)", 
      },
      fontWeight: {
        custom: "var(--font-weight)", 
      },
      fontFamily: {
        heading: "var(--heading-font)", 
        text: "var(--text-font)", 
      },
    },
  },
  plugins: [tailwindcssanimate],
} satisfies Config;