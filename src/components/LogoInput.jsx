import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
export const LogoInput = ({
  appearance,
  setAppearance,
  viewLogoInput,
  setViewLogoInput,
}) => {
  const { logo } = appearance;
  const [error, setError] = useState("");

  const isValidURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-zA-Z0-9$_.+!*'(),;-]+\\.)+[a-zA-Z]{2,})|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*" +
        "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" +
        "(\\#[-a-zA-Z0-9_]*)?$",
      "i"
    );
    return pattern.test(url);
  };

  const handleChangeLogo = (e) => {
    let value = e.target.value;
    setAppearance((prev) => ({ ...prev, logo: value }));
  };

  const handleBlur = () => {
    setAppearance((prev) => {
      const updatedLogo = prev.logo;
      if (updatedLogo && !isValidURL(updatedLogo)) {
        setError("URL no válida");
      } else {
        setError("");
      }
      return prev;
    });
  };

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewLogoInput(!viewLogoInput)}
      >
        <h2>🖼️ Logo del comercio</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewLogoInput ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${!viewLogoInput ? "hidden-section" : ""}`}
      >
        <div className="px-1">
          <input
            type="text"
            value={logo}
            onChange={handleChangeLogo}
            onBlur={handleBlur}
            placeholder="https://www.miweb.com/logo.png"
            className="config-input"
          />
          {error && (
            <p className="text-red-400 text-xs mt-1.5">{error}</p>
          )}
          {logo && !error && (
            <div className="mt-2 p-2 rounded-lg bg-white/5 inline-block">
              <img
                src={logo}
                alt="Preview"
                className="h-8 object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
