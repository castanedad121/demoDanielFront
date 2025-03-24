import { RiArrowDownSLine } from "react-icons/ri";
export const AmountInput = ({
  amount,
  setAmount,
  configCurrency,
  setConfigCurrency,
  viewAmountInput,
  setViewAmountInput,
}) => {
  const { currency, merchantCode } = configCurrency;
  const handleChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };
  const handleBlur = () => {
    if (amount !== "") {
      setAmount(parseFloat(amount).toFixed(2));
    }
  };

  const handleCurrency = (event) => {
    setConfigCurrency({
      currency: event.currentTarget?.id,
      merchantCode: event.currentTarget?.dataset.merchantcode, // ✅ Accede al dataset
    });
    console.log(configCurrency);
  };
  return (
    <div className="w-full flex flex-col border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">Monto y moneda de pago:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
 ${!viewAmountInput && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewAmountInput(!viewAmountInput);
          }}
        />
      </div>
      <div
        className={`w-full flex  rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] ${
          viewAmountInput ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-evenly items-center min-w-80 py-3 ">
          <h2 className=" text-[#1A90FF]  ">Monto:</h2>
          <input
            type="text"
            value={amount}
            onChange={handleChange}
            onBlur={handleBlur}
            inputMode="decimal"
            className="w-min bg-transparent placeholder:text-slate-400 text-slate-200 
      text-sm border border-slate-300 rounded-md px-2 py-1 
      transition-all duration-300 ease-in-out focus:outline-none 
      focus:border-blue-500 focus:ring focus:ring-[#1A90FF]
      hover:border-blue-400 hover:shadow-md "
          />
        </div>
        <div className="w-full flex gap-2 justify-evenly py-3">
          <h2
            id={window.Izipay.enums.currency.PER}
            data-merchantcode="4001834"
            className={
              currency === window.Izipay.enums.currency.PER
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1"
            }
            onClick={(e) => handleCurrency(e)}
          >
            Soles
          </h2>
          <h2
            id={window.Izipay.enums.currency.USA}
            data-merchantcode="6001834"
            className={
              currency === window.Izipay.enums.currency.USA
                ? "w-32 text-[#1A90FF] bg-[#17213B] text-center rounded-sm py-1"
                : "w-32 text-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] py-1"
            }
            onClick={(e) => handleCurrency(e)}
          >
            Dólares
          </h2>
        </div>
      </div>
    </div>
  );
};
