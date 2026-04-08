import React, { useEffect, useState } from "react";
import Checkout from "./components/Checkout";
import SettingsModal from "./components/SettingsModal";
import { RiSettings3Line, RiSunLine, RiMoonLine } from "react-icons/ri";
import "./index.css";

const defaultSettings = {
  environment: "sandbox", 
  credentials: {
    PEN: { 
      merchantCode: "4004353", 
      publicKey: "VErethUtraQuxas57wuMuquprADrAHAb", 
      hashKey: "Xom5Hlt9eSWoylYuBrenIbOsTljEdefR" 
    },
    USD: { 
      merchantCode: "6001834", 
      publicKey: "VErethUtraQuxas57wuMuquprADrAHAb", 
      hashKey: "Xom5Hlt9eSWoylYuBrenIbOsTljEdefR" 
    }
  }
};

const App = () => {
  const [appSettings, setAppSettings] = useState(defaultSettings);
  const [viewSettings, setViewSettings] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("izipay_settings");
    let settingsToUse = defaultSettings;
    if (saved) {
      try {
        settingsToUse = JSON.parse(saved);
        setAppSettings(settingsToUse);
      } catch (e) {
        console.error("Error reading settings", e);
      }
    }

    // Apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Inject SDK script dynamically
    const scriptUrl = settingsToUse.environment === "production" 
      ? "https://checkout.izipay.pe/payments/v1/js/index.js"
      : "https://sandbox-checkout.izipay.pe/payments/v1/js/index.js";

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log(`Izipay SDK loaded from ${settingsToUse.environment} environment.`);
      setSdkLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [theme]); // Dependencia del theme agregada para reaccionar al cambio

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex flex-col items-center justify-start w-screen min-h-screen gap-6 transition-colors duration-300">
      <header className="app-header flex w-full py-4 px-6 justify-between items-center sticky top-0 z-50 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-3">
          <a href="/">
            <img
              src={`https://developers.izipay.pe/logo/${theme === "light" ? "dark" : "light"}.svg`}
              alt="Izipay Logo"
              className="h-8"
            />
          </a>
        </div>
        <h1 className="font-bold text-base md:text-xl tracking-tight">
          Demo — Formulario de Pago — Punto Web 2.0
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
            title="Cambiar Tema"
          >
            {theme === "light" ? <RiMoonLine className="size-5 text-slate-600" /> : <RiSunLine className="size-5 text-amber-400" />}
          </button>
          
          <a
            href="https://developers.izipay.pe/web-core/"
            className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hidden md:inline border-r border-current pr-2 mr-1">SDK</span>
            <img
              src="https://developers.izipay.pe/img/landing-page/sdk-icons/js.png"
              alt="JavaScript"
              className="h-6"
            />
            <span className="hidden md:inline">JavaScript</span>
          </a>
          <div className="w-[1px] h-6 bg-current opacity-20 mx-2"></div>
          <button 
            onClick={() => setViewSettings(true)}
            className="flex items-center gap-2 text-sm text-white bg-[#1A90FF] px-4 py-2 rounded-full hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all font-bold"
          >
            <RiSettings3Line className="size-5" />
            <span className="hidden sm:inline">Configuración</span>
          </button>
        </div>
      </header>

      <SettingsModal 
        appSettings={appSettings} 
        setAppSettings={setAppSettings}
        viewSettings={viewSettings} 
        setViewSettings={setViewSettings} 
      />

      {/* Render Checkout only after SDK loads to avoid undefined errors */}
      {sdkLoaded ? (
        <Checkout appSettings={appSettings} />
      ) : (
        <div className="flex flex-col items-center justify-center pt-20">
          <div className="w-8 h-8 border-4 border-[#1A90FF]/30 border-t-[#1A90FF] rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Cargando SDK de Izipay...</p>
        </div>
      )}
    </div>
  );
};

export default App;
