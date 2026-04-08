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
      .filter(([key]) => key !== "all")
      .every(([_, value]) => value[0]);
  };

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

        updatedMethods.all = [
          areAllMethodsSelected(updatedMethods),
          window.Izipay.enums.showMethods.ALL,
        ];
      }

      return updatedMethods;
    });
  };

  const methods = [
    { id: "card", label: "Tarjeta", icon: creditCardIcon, imgClass: "h-7" },
    { id: "qr", label: "QR", icon: qrIcon, imgClass: "h-7" },
    { id: "miles", label: "Millas", icon: milesIcon, imgClass: "h-7" },
    { id: "yape", label: "Yape", icon: yapeIcon, imgClass: "h-6" },
    { id: "ibk_app", label: "Plin", icon: ibkAppIcon, imgClass: "h-7" },
    { id: "apple_pay", label: "Apple Pay", icon: applePayIcon, imgClass: "h-12" },
  ];

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewPaymentMethods(!viewPaymentMethods)}
      >
        <h2>💳 Métodos de pago</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewPaymentMethods ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${
          !viewPaymentMethods ? "hidden-section" : ""
        }`}
      >
        <div className="flex items-center gap-2 px-1 mb-3">
          <input
            id="all"
            type="checkbox"
            className="config-checkbox"
            checked={methodPay.all[0]}
            onChange={(e) => handleMethodPay(e.currentTarget.id)}
          />
          <label className="text-sm text-slate-600 dark:text-gray-400 font-medium">
            Seleccionar todos
          </label>
        </div>
        <div className="flex flex-wrap gap-2 px-1 justify-center">
          {methods.map((m) => (
            <div
              key={m.id}
              id={m.id}
              className={`method-card ${
                methodPay[m.id][0] ? "active" : "inactive"
              }`}
              onClick={(e) => handleMethodPay(e.currentTarget.id)}
            >
              <div className="flex items-center justify-center h-8 overflow-hidden">
                <img src={m.icon} className={m.imgClass} alt={m.label} />
              </div>
              <p>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
