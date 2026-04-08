import { RiArrowDownSLine } from "react-icons/ri";
export const LanguageSelector = ({
  lenguageSelect,
  setLenguageSelect,
  viewLanguageSelector,
  setViewLanguageSelector,
}) => {
  const handleLenguage = (lenguage) => {
    if (lenguage === "control") {
      setLenguageSelect((prev) => ({
        ...prev,
        control: !prev.control,
      }));
    }

    if (lenguage === "ESP") {
      setLenguageSelect((prev) => ({
        ...prev,
        init: window.Izipay.enums.langInit.ESP,
        ESP: true,
        ENG: false,
      }));
    }

    if (lenguage === "ENG") {
      setLenguageSelect((prev) => ({
        ...prev,
        init: window.Izipay.enums.langInit.ENG,
        ESP: false,
        ENG: true,
      }));
    }
  };

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewLanguageSelector(!viewLanguageSelector)}
      >
        <h2>🌐 Opciones de idioma</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewLanguageSelector ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${
          !viewLanguageSelector ? "hidden-section" : ""
        }`}
      >
        <div className="flex flex-wrap items-center gap-3 px-1">
          <div className="flex items-center gap-2">
            <input
              id="control"
              type="checkbox"
              className="config-checkbox"
              checked={lenguageSelect.control}
              onChange={(e) => handleLenguage(e.target.id)}
            />
            <label className="text-sm font-medium text-slate-600 dark:text-gray-400 whitespace-nowrap">
              Selector de idioma visible
            </label>
          </div>
          <div className="flex gap-2">
            <button
              className={`pill-btn ${lenguageSelect.ESP ? "active" : "inactive"}`}
              onClick={() => handleLenguage("ESP")}
            >
              🇪🇸 Español
            </button>
            <button
              className={`pill-btn ${lenguageSelect.ENG ? "active" : "inactive"}`}
              onClick={() => handleLenguage("ENG")}
            >
              🇬🇧 Inglés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
