"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fontTypes = ["INTER", "ROBOTO", "MONTSERRAT", "POPPINS", "OPEN_SANS", "RALEWAY"];
const fontSizes = ["XS", "SM", "BASE", "LG", "XL", "XXL"];
const fontWeights = ["THIN", "EXTRA_LIGHT", "LIGHT", "NORMAL", "MEDIUM", "SEMI_BOLD", "BOLD", "EXTRA_BOLD", "BLACK"];
const themes = ["light", "dark"];

export default function UiSettingsPage() {
  const [settings, setSettings] = useState({
    theme: "light",
    backgroundColor: "#ffffff",
    primaryColor: "#1E88E5",
    secondaryColor: "#42A5F5",
    borderRadius: "4px",
    fontSize: "BASE",
    fontWeight: "NORMAL",
    headingFont: "INTER",
    textFont: "OPEN_SANS",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/admin/uisetting");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin/uisetting", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert("Settings updated successfully!");
      } else {
        alert("Failed to update settings.");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="p-6 bg-primary text-secondary font-custom rounded-custom text-black">
      <h1 className="text-2xl font-bold mb-4">UI Settings</h1>
      <div className="space-y-4">
        <div>
          <label>Theme</label>
          <select
            className="w-full p-2 border rounded"
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Background Color</label>
          <Input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
          />
        </div>
        <div>
          <label>Primary Color</label>
          <Input
            type="color"
            value={settings.primaryColor}
            onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
          />
        </div>
        <div>
          <label>Secondary Color</label>
          <Input
            type="color"
            value={settings.secondaryColor}
            onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
          />
        </div>
        <div>
          <label>Border Radius</label>
          <Input
            type="text"
            value={settings.borderRadius}
            onChange={(e) => setSettings({ ...settings, borderRadius: e.target.value })}
          />
        </div>
        <div>
          <label>Font Size</label>
          <select
            className="w-full p-2 border rounded"
            value={settings.fontSize}
            onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Font Weight</label>
          <select
            className="w-full p-2 border rounded"
            value={settings.fontWeight}
            onChange={(e) => setSettings({ ...settings, fontWeight: e.target.value })}
          >
            {fontWeights.map((weight) => (
              <option key={weight} value={weight}>
                {weight}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Heading Font</label>
          <select
            className="w-full p-2 border rounded"
            value={settings.headingFont}
            onChange={(e) => setSettings({ ...settings, headingFont: e.target.value })}
          >
            {fontTypes.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Text Font</label>
          <select
            className="w-full p-2 border rounded"
            value={settings.textFont}
            onChange={(e) => setSettings({ ...settings, textFont: e.target.value })}
          >
            {fontTypes.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button className="mt-4" onClick={handleSave}>
        Save Settings
      </Button>

      {/* Testing dynamic styles */}
      <div className="mt-6 text-secondary rounded-custom text-custom font-custom ">
        This is a dynamically styled component.
      </div>
    </div>
  );
}