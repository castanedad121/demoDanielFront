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
      "^(https?:\\/\\/)" + // http o https obligatorio
        "((([a-zA-Z0-9$_.+!*'(),;-]+\\.)+[a-zA-Z]{2,})|" + // Dominio
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // IP
        "(:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*" + // Puerto y ruta
        "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" + // Parámetros query
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
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">Ruta del Logo del comercio:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
               ${!viewLogoInput && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewLogoInput(!viewLogoInput);
          }}
        />
      </div>
      <div
        className={`w-full flex flex-col p-3 items-center rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] justify-evenly ${
          viewLogoInput ? "block" : "hidden"
        }`}
      >
        <input
          type="text"
          value={logo}
          onChange={handleChangeLogo}
          onBlur={handleBlur}
          placeholder="https://www.miweb.com/logo..."
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 
      text-sm border border-slate-300 rounded-md px-2 py-1
      transition-all duration-300 ease-in-out focus:outline-none 
      focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
      hover:border-blue-400 hover:shadow-md"
        />
        {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
      </div>
    </div>
  );
};
