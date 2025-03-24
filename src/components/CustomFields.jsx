import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

export const CustomFields = ({
  customData,
  setCustomData,
  viewCustomFields,
  setViewCustomFields,
}) => {
  const {
    field1,
    field2,
    field3,
    field4,
    field5,
    dield6,
    field7,
    field8,
    field9,
    field10,
  } = customData;
  const [tempValues, setTempValues] = useState(customData); // Estado temporal para todos los inputs

  const handleBlur = (e) => {
    let name = e.target.name;
    setCustomData((prev) => ({ ...prev, [name]: tempValues[name] })); // Actualiza el estado global solo al perder el foco
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTempValues((prev) => ({ ...prev, [name]: value })); // Solo actualiza el estado temporal
  };

  return (
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF] ">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">CustomFields:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF] 
               ${!viewCustomFields && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewCustomFields(!viewCustomFields);
          }}
        />
      </div>

      <div
        className={`w-full flex flex-wrap pt-3 pb-3  rounded-tr-md border-r-[1px] border-t-[1px]   border-[#1A90FF] justify-evenly ${
          viewCustomFields ? "block" : "hidden"
        }`}
      >
        {Object.keys(customData).map((field, index) => (
          <input
            key={index}
            type="text"
            value={tempValues[field] || ""}
            name={field}
            onChange={handleChange} // Solo guarda en el estado temporal
            onBlur={handleBlur} // Guarda en el estado global cuando pierde el foco
            placeholder={`Campo ${index + 1}`}
            className="w-[300px] bg-transparent placeholder:text-slate-400 text-slate-200 
          text-sm border border-slate-300 rounded-md px-2 py-1 mt-[1px]
          transition-all duration-300 ease-in-out focus:outline-none 
          focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
          hover:border-blue-400 hover:shadow-md"
          />
        ))}
      </div>
    </div>
  );
};
