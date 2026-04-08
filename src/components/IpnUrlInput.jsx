import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
export const IpnUrlInput = ({
  urlIpn,
  setUrlIpn,
  viewIpnUrlInput,
  setViewIpnUrlInput,
}) => {
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

  const handleChangeIpn = (e) => {
    let value = e.target.value;
    setUrlIpn(value);
  };

  const handleBlur = () => {
    setUrlIpn((prev) => {
      if (prev && !isValidURL(prev)) {
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
        onClick={() => setViewIpnUrlInput(!viewIpnUrlInput)}
      >
        <h2>🔔 URL de notificación (IPN)</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewIpnUrlInput ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${!viewIpnUrlInput ? "hidden-section" : ""}`}
      >
        <div className="px-1">
          <input
            type="text"
            value={urlIpn}
            onChange={handleChangeIpn}
            onBlur={handleBlur}
            placeholder="https://www.tu-web.com/notificaciones/"
            className="config-input"
          />
          {error && (
            <p className="text-red-400 text-xs mt-1.5">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};
