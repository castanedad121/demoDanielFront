import { RiArrowDownSLine } from "react-icons/ri";
export const IntegrationMethods = ({
  integrationMethod,
  setIntegrationMethod,
  viewIntegrationMethods,
  setViewIntegrationMethods,
}) => {
  const handleSelectMethod = (method) => {
    const containerIframe = document.querySelector("#container-iframe");

    // Actualizar estado de integración
    if (method === "popUp") {
      setIntegrationMethod({ popUp: true, embebed: false, redirect: false });
      containerIframe.style.display = "none";
      // Ocultar iframe en modo PopUp
    } else if (method === "embebed") {
      setIntegrationMethod({ popUp: false, embebed: true, redirect: false });
      containerIframe.style.display = "block";
      // Mostrar iframe en modo Embebed
    } else if (method === "redirect") {
      setIntegrationMethod({ popUp: false, embebed: false, redirect: true });
      containerIframe.style.display = "none";
      // Ocultar iframe en modo Redirect
    }
  };
  return (
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">Metodos de integración:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
         ${!viewIntegrationMethods && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewIntegrationMethods(!viewIntegrationMethods);
          }}
        />
      </div>
      <div
        className={`w-full flex  rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] justify-evenly ${
          viewIntegrationMethods ? "block" : "hidden"
        }`}
      >
        <h2
          id="popUp"
          className={
            integrationMethod.popUp
              ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm my-3 py-1"
              : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] my-3 py-1"
          }
          onClick={(e) => handleSelectMethod(e.target.id)}
        >
          Pop-up
        </h2>
        <h2
          id="embebed"
          className={
            integrationMethod.embebed
              ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm my-3 py-1"
              : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] my-3 py-1"
          }
          onClick={(e) => handleSelectMethod(e.target.id)}
        >
          Embebido
        </h2>
        <h2
          id="redirect"
          className={
            integrationMethod.redirect
              ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm my-3 py-1"
              : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] my-3 py-1"
          }
          onClick={(e) => handleSelectMethod(e.target.id)}
        >
          Redirect
        </h2>
      </div>
    </div>
  );
};
