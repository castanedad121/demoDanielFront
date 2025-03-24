import { RiArrowDownSLine } from "react-icons/ri";
export const ProcessType = ({
  processType,
  setProcessType,
  viewProcessType,
  setViewProcessType,
}) => {
  const handleProcessType = (type) => {
    setProcessType(type);
  };
  return (
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">
          Tipo de Proceso para una transacción:
        </h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
               ${!viewProcessType && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewProcessType(!viewProcessType);
          }}
        />
      </div>

      <div
        className={`w-full flex  rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] justify-evenly ${
          viewProcessType ? "block" : "hidden"
        }`}
      >
        <h2
          id={window.Izipay.enums.processType.AUTHORIZATION}
          className={
            processType === window.Izipay.enums.processType.AUTHORIZATION
              ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm my-3 py-1"
              : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] my-3 py-1"
          }
          onClick={(e) => handleProcessType(e.target.id)}
        >
          Autorización
        </h2>
        <h2
          id={window.Izipay.enums.processType.PRE_AUTHORIZATION}
          className={
            processType === window.Izipay.enums.processType.PRE_AUTHORIZATION
              ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm my-3 py-1"
              : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] my-3 py-1"
          }
          onClick={(e) => handleProcessType(e.target.id)}
        >
          Pre-Autorizacion
        </h2>
      </div>
    </div>
  );
};
