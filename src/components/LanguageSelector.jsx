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
        ESP: !prev.ESP,
        ENG: !prev.ENG,
      }));
    }

    if (lenguage === "ENG") {
      setLenguageSelect((prev) => ({
        ...prev,
        init: window.Izipay.enums.langInit.ENG,
        ESP: !prev.ESP,
        ENG: !prev.ENG,
      }));
    }
  };
  return (
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">Opciones de idioma:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
               ${!viewLanguageSelector && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewLanguageSelector(!viewLanguageSelector);
          }}
        />
      </div>
      <div
        className={`w-full flex  rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] justify-evenly ${
          viewLanguageSelector ? "block" : "hidden"
        }`}
      >
        <div className="w-full flex gap-1 justify-evenly my-3">
          <div className="flex items-center">
            <input
              id="control"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
              checked={lenguageSelect.control}
              onChange={(e) => handleLenguage(e.target.id)}
            />
            <label className="ms-2 text-sm font-light text-gray-300 text-nowrap">
              Control para elegir
            </label>
          </div>
          <h2
            id="ESP"
            className={
              lenguageSelect.ESP
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1 h-8 hover:bg-transparent hover:text-white "
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1 h-8"
            }
            onClick={(e) => handleLenguage(e.target.id)}
          >
            Español
          </h2>
          <h2
            id="ENG"
            className={
              lenguageSelect.ENG
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1 h-8 hover:bg-transparent hover:text-white"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1 h-8"
            }
            onClick={(e) => handleLenguage(e.target.id)}
          >
            Inglés
          </h2>
        </div>
      </div>
    </div>
  );
};
