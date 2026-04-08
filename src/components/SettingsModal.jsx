import React from "react";
import { RiCloseLine } from "react-icons/ri";

const SettingsModal = ({
  appSettings,
  setAppSettings,
  viewSettings,
  setViewSettings,
}) => {
  if (!viewSettings) return null;

  const handleChangeEnv = (e) => {
    setAppSettings((prev) => ({
      ...prev,
      environment: e.target.value,
    }));
  };

  const handleCredChange = (currency, field, value) => {
    setAppSettings((prev) => ({
      ...prev,
      credentials: {
        ...prev.credentials,
        [currency]: {
          ...prev.credentials[currency],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    localStorage.setItem("izipay_settings", JSON.stringify(appSettings));
    setViewSettings(false);
    // Reload the page to inject the correct SDK version
    // Small delay to allow localStorage save
    setTimeout(() => {
      window.location.reload();
    }, 150);
  };

  const currentEnv = appSettings.environment;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-[#1A90FF]/30 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-transparent rounded-t-2xl">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            ⚙️ Configuración Avanzada
          </h2>
          <button
            onClick={() => setViewSettings(false)}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors p-1"
          >
            <RiCloseLine className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          
          {/* Environment */}
          <div className="flex flex-col gap-3">
            <h3 className="text-blue-600 dark:text-[#60a5fa] font-medium text-sm">Entorno de Izipay</h3>
            <div className="flex bg-gray-100 dark:bg-[#1e293b] p-1 rounded-lg w-fit">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  currentEnv === "sandbox"
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                }`}
                value="sandbox"
                onClick={handleChangeEnv}
              >
                🛠️ Sandbox (Pruebas)
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  currentEnv === "production"
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                }`}
                value="production"
                onClick={handleChangeEnv}
              >
                🚀 Producción
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* PEN Credentials */}
            <div className="bg-gray-50 dark:bg-[#17213b] border border-gray-200 dark:border-white/5 p-4 rounded-xl flex flex-col gap-3">
              <h3 className="text-slate-800 dark:text-white font-medium flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-white/10">
                🇵🇪 Soles (PEN)
              </h3>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-blue-600 dark:text-[#60a5fa]">Merchant Code</label>
                <input
                  type="text"
                  value={appSettings.credentials.PEN.merchantCode}
                  onChange={(e) => handleCredChange("PEN", "merchantCode", e.target.value)}
                  className="bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border border-gray-300 dark:border-[#1A90FF]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#1A90FF]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-blue-600 dark:text-[#60a5fa]">Public Key</label>
                <input
                  type="text"
                  value={appSettings.credentials.PEN.publicKey}
                  onChange={(e) => handleCredChange("PEN", "publicKey", e.target.value)}
                  className="bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border border-gray-300 dark:border-[#1A90FF]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#1A90FF]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-blue-600 dark:text-[#60a5fa]">HMAC Hash Key (Signature)</label>
                <input
                  type="text"
                  value={appSettings.credentials.PEN.hashKey}
                  onChange={(e) => handleCredChange("PEN", "hashKey", e.target.value)}
                  className="bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border border-gray-300 dark:border-[#1A90FF]/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#1A90FF]"
                />
              </div>
            </div>

            {/* USD Credentials */}
            <div className="bg-gray-50 dark:bg-[#17213b] border border-gray-200 dark:border-white/5 p-4 rounded-xl flex flex-col gap-3">
              <h3 className="text-slate-800 dark:text-white font-medium flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-white/10">
                🇺🇸 Dólares (USD)
              </h3>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-emerald-600 dark:text-emerald-400">Merchant Code</label>
                <input
                  type="text"
                  value={appSettings.credentials.USD.merchantCode}
                  onChange={(e) => handleCredChange("USD", "merchantCode", e.target.value)}
                  className="bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border border-gray-300 dark:border-emerald-400/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-emerald-600 dark:text-emerald-400">Public Key</label>
                <input
                  type="text"
                  value={appSettings.credentials.USD.publicKey}
                  onChange={(e) => handleCredChange("USD", "publicKey", e.target.value)}
                  className="bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border border-gray-300 dark:border-emerald-400/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-emerald-600 dark:text-emerald-400">HMAC Hash Key (Signature)</label>
                <input
                  type="text"
                  value={appSettings.credentials.USD.hashKey}
                  onChange={(e) => handleCredChange("USD", "hashKey", e.target.value)}
                  className="bg-white dark:bg-[#0a0f1c] text-slate-800 dark:text-white border border-gray-300 dark:border-emerald-400/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
          
          <p className="text-xs text-amber-600 dark:text-amber-400/80 font-medium italic">
            ⚠️ Al guardar, la página se recargará automáticamente para aplicar la configuración del SDK.
          </p>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-200 dark:border-white/10 flex justify-end gap-3 bg-gray-50 dark:bg-black/20 rounded-b-2xl">
          <button
            onClick={() => setViewSettings(false)}
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 border border-gray-300 dark:border-transparent dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-sm font-medium bg-blue-600 dark:bg-[#1A90FF] text-white shadow-lg shadow-blue-600/30 dark:shadow-[#1A90FF]/30 hover:bg-blue-700 dark:hover:bg-blue-500 transition-all"
          >
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
