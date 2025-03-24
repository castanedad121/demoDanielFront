import creditCardIcon from "../assets/creditcard.svg";
import qrIcon from "../assets/qrcode.svg";
import applePayIcon from "../assets/apple_pay.svg";
import yapeIcon from "../assets/icon-mini-yape.svg";
import milesIcon from "../assets/Miles.png";
import ibkAppIcon from "../assets/plin-interbank-dark.svg";
import { RiArrowDownSLine } from "react-icons/ri";
export const PaymentMethods = ({
  methodPay,
  setMethodPay,
  viewPaymentMethods,
  setViewPaymentMethods,
}) => {
  const areAllMethodsSelected = (methods) => {
    return Object.entries(methods)
      .filter(([key]) => key !== "all") // Ignorar "all"
      .every(([_, value]) => value[0]); // Verificar si todos están activos
  };

  // 🔹 Maneja la selección de métodos de pago
  const handleMethodPay = (methodPaySelect) => {
    setMethodPay((prev) => {
      let updatedMethods;

      if (methodPaySelect === "all") {
        const allSelected = !prev.all[0];
        updatedMethods = {
          all: [allSelected, window.Izipay.enums.showMethods.ALL],
          card: [allSelected, window.Izipay.enums.showMethods.CARD],
          qr: [allSelected, window.Izipay.enums.showMethods.QR],
          apple_pay: [allSelected, window.Izipay.enums.showMethods.APPLE_PAY],
          yape: [allSelected, window.Izipay.enums.showMethods.YAPE],
          ibk_app: [allSelected, window.Izipay.enums.showMethods.IBK_APP],
          miles: [allSelected, window.Izipay.enums.showMethods.MILES],
        };
      } else {
        const methodSelected = !prev[methodPaySelect][0];

        updatedMethods = {
          ...prev,
          [methodPaySelect]: [
            methodSelected,
            window.Izipay.enums.showMethods[methodPaySelect.toUpperCase()],
          ],
        };

        // Si todos los métodos están seleccionados, activa "Todos"
        updatedMethods.all = [
          areAllMethodsSelected(updatedMethods),
          window.Izipay.enums.showMethods.ALL,
        ];
      }

      return updatedMethods;
    });
  };

  return (
    <div className="w-full flex flex-col  border-b-[1px] border-[#1A90FF]">
      <div className="flex justify-between items-center">
        <h2 className=" text-[#1A90FF] pb-2">Métodos de Pago:</h2>
        <RiArrowDownSLine
          className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 text-[#1A90FF] hover:text-[#FFFF]
               ${!viewPaymentMethods && "rotate-180 pb-0 pt-1"}`}
          onClick={() => {
            setViewPaymentMethods(!viewPaymentMethods);
          }}
        />
      </div>
      <div
        className={`w-full flex  rounded-tr-md border-r-[1px] border-t-[1px]  border-[#1A90FF] justify-evenly ${
          viewPaymentMethods ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center">
          <input
            id="all"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            checked={methodPay.all[0]}
            onChange={(e) => handleMethodPay(e.currentTarget.id)}
          />
          <label className="ms-2 text-sm font-light text-gray-300">Todos</label>
        </div>

        <div className="w-full flex gap-1 justify-evenly my-3">
          <div
            id="card"
            className={
              methodPay.card[0]
                ? "flex flex-col justify-center items-center rounded-sm cursor-pointer bg-[#17213B] hover:bg-transparent text-[#1A90FF] hover:text-white pt-2 px-2"
                : "flex flex-col justify-center items-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] pt-2 px-2"
            }
            onClick={(e) => handleMethodPay(e.currentTarget.id)}
          >
            <div className="flex flex-col justify-center items-center h-8 overflow-hidden">
              <img src={creditCardIcon} className="h-8" alt="Credit Card" />
            </div>
            <p className="font-light">Tarjeta</p>
          </div>
          <div
            id="qr"
            className={
              methodPay.qr[0]
                ? "flex flex-col justify-center items-center rounded-sm cursor-pointer bg-[#17213B] hover:bg-transparent text-[#1A90FF] hover:text-white pt-2 px-2"
                : "flex flex-col justify-center items-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] pt-2 px-2"
            }
            onClick={(e) => handleMethodPay(e.currentTarget.id)}
          >
            <div className="flex flex-col justify-center items-center h-8 overflow-hidden">
              <img src={qrIcon} className="h-8" alt="Credit Card" />
            </div>
            <p className="font-light">QR</p>
          </div>
          <div
            id="miles"
            className={
              methodPay.miles[0]
                ? "flex flex-col justify-center items-center rounded-sm cursor-pointer bg-[#17213B] hover:bg-transparent text-[#1A90FF] hover:text-white pt-2 px-2"
                : "flex flex-col justify-center items-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] pt-2 px-2"
            }
            onClick={(e) => handleMethodPay(e.currentTarget.id)}
          >
            <div className="h-8 overflow-hidden flex justify-center items-center bg-transparent ">
              <img src={milesIcon} className="h-8" alt="Credit Card" />
            </div>
            <p className="font-light">Millas</p>
          </div>
          <div
            id="yape"
            className={
              methodPay.yape[0]
                ? "flex flex-col justify-center items-center rounded-sm cursor-pointer bg-[#17213B] hover:bg-transparent text-[#1A90FF] hover:text-white pt-2 px-2"
                : "flex flex-col justify-center items-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] pt-2 px-2"
            }
            onClick={(e) => handleMethodPay(e.currentTarget.id)}
          >
            <div className="h-8 overflow-hidden flex justify-center items-center">
              <img src={yapeIcon} className="h-[28px]" alt="Credit Card" />
            </div>
            <p className="font-light">Yape</p>
          </div>
          <div
            id="ibk_app"
            className={
              methodPay.ibk_app[0]
                ? "flex flex-col justify-center items-center rounded-sm cursor-pointer bg-[#17213B] hover:bg-transparent text-[#1A90FF] hover:text-white pt-2 px-2"
                : "flex flex-col justify-center items-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] pt-2 px-2"
            }
            onClick={(e) => handleMethodPay(e.currentTarget.id)}
          >
            <div className="h-8 overflow-hidden flex justify-center items-center">
              <img src={ibkAppIcon} className="h-8" alt="Credit Card" />
            </div>
            <p className="font-light">Plin - Interbank</p>
          </div>
          <div
            id="apple_pay"
            className={
              methodPay.apple_pay[0]
                ? "flex flex-col justify-center items-center rounded-sm cursor-pointer bg-[#17213B] hover:bg-transparent text-[#1A90FF] hover:text-white pt-2 px-2"
                : "flex flex-col justify-center items-center rounded-sm cursor-pointer hover:bg-[#17213B] hover:text-[#1A90FF] pt-2 px-2"
            }
            onClick={(e) => handleMethodPay(e.currentTarget.id)}
          >
            <div className="h-8 overflow-hidden flex justify-center items-center">
              <img src={applePayIcon} className="h-16" alt="Credit Card" />
            </div>
            <p className="font-light">Apple Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
};
