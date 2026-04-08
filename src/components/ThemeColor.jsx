import { RiArrowDownSLine } from "react-icons/ri";
export const ThemeColor = ({
  appearance,
  setAppearance,
  viewThemeColor,
  setViewThemeColor,
}) => {
  const { theme } = appearance;

  const themes = [
    { id: window.Izipay.enums.theme.RED, color: "#FF4240", hColor: "bg-[#FF4240]", label: "Red" },
    { id: window.Izipay.enums.theme.LIGHT_RED, color: "#FF8A00", hColor: "bg-[#FF8A00]", label: "Orange" },
    { id: window.Izipay.enums.theme.GREEN, color: "#00A09D", hColor: "bg-[#00A09D]", label: "Green" },
    { id: window.Izipay.enums.theme.PURPLE, color: "#8A65DA", hColor: "bg-[#8A65DA]", label: "Purple" },
    { id: window.Izipay.enums.theme.BLACK, color: "#333333", hColor: "bg-[#333333]", label: "Black" },
    { id: window.Izipay.enums.theme.BLUE, color: "#0570DE", hColor: "bg-[#0570DE]", label: "Blue" },
    { id: window.Izipay.enums.theme.LIGHTGREEN, color: "#3DD2CE", hColor: "bg-[#3DD2CE]", label: "Teal" },
  ];

  const handleTheme = (t) => {
    setAppearance((prev) => ({
      ...prev,
      theme: t.id,
      hColor: `${t.hColor} text-white border border-white`,
    }));
  };

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewThemeColor(!viewThemeColor)}
      >
        <h2>🎨 Tema de color</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewThemeColor ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${!viewThemeColor ? "hidden-section" : ""}`}
      >
        <div className="flex flex-wrap gap-4 px-1 items-center justify-center">
          {themes.map((t) => (
            <div key={t.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`color-swatch ${t.id === theme ? "active" : ""}`}
                style={{ backgroundColor: t.color }}
                onClick={() => handleTheme(t)}
                title={t.label}
              />
              <span className="text-[0.65rem] text-gray-400">{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
