import { RiArrowDownSLine } from "react-icons/ri";
export const FormActions = ({
  actionForm,
  setActionForm,
  cardToken,
  setCardToken,
  merchantBuyerId,
  viewFormActions,
  setViewFormActions,
}) => {
  return (
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">Acción del formulario:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
               ${!viewFormActions && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewFormActions(!viewFormActions);
          }}
        />
      </div>
      <div
        className={`w-full flex-col  rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] justify-evenly ${
          viewFormActions ? "block" : "hidden"
        }`}
      >
        <div className="w-full flex gap-1 justify-evenly py-3">
          <h2
            id="Pay"
            className={
              actionForm.pay
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1"
            }
            onClick={() =>
              setActionForm({
                pay: true,
                register: false,
                payRegister: false,
                payToken: false,
              })
            }
          >
            Pay
          </h2>
          <h2
            id="Register"
            className={
              actionForm.register
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1"
            }
            onClick={() =>
              setActionForm({
                pay: false,
                register: true,
                payRegister: false,
                payToken: false,
              })
            }
          >
            Register
          </h2>
          <h2
            id="payRegister"
            className={
              actionForm.payRegister
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1"
            }
            onClick={() =>
              setActionForm({
                pay: false,
                register: false,
                payRegister: true,
                payToken: false,
              })
            }
          >
            Pay Register
          </h2>
          <h2
            id="payToken"
            className={
              actionForm.payToken
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1"
            }
            onClick={() =>
              setActionForm({
                pay: false,
                register: false,
                payRegister: false,
                payToken: true,
              })
            }
          >
            Pay Token
          </h2>
        </div>
        <div className="w-full flex justify-center pb-3">
          <div className="w-min flex gap-2 justify-center px-2">
            <h2 className="text-[#1A90FF] w-min">merchantBuyerId:</h2>
            <input
              type="text"
              value={merchantBuyerId}
              onChange={(e) => setMerchantBuyerId(e.currentTarget.value)}
              placeholder="Ingresa ID del cliente"
              className="w-min bg-transparent placeholder:text-slate-400 text-slate-200 
      text-sm border border-slate-300 rounded-md px-2 py-1 
      transition-all duration-300 ease-in-out focus:outline-none 
      focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
      hover:border-blue-400 hover:shadow-md"
            />
          </div>

          {actionForm.payToken && (
            <input
              type="text"
              value={cardToken}
              onChange={(e) => setCardToken(e.currentTarget.value)}
              placeholder="Card Token ..."
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-200 
      text-sm border border-slate-300 rounded-md px-2 py-1 
      transition-all duration-300 ease-in-out focus:outline-none 
      focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
      hover:border-blue-400 hover:shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};
