import React, { useEffect, useState } from "react";
import PaymentButton from "./PaymentButton";
import { PaymentMethods } from "./PaymentMethods";
import { IntegrationMethods } from "./IntegrationMethods";
import { FormActions } from "./FormActions";
import { LanguageSelector } from "./LanguageSelector";
import { AmountInput } from "./AmountInput";
import { LogoInput } from "./LogoInput";
import { ThemeColor } from "./ThemeColor";
import { CustomFields } from "./CustomFields";
import { ProcessType } from "./ProcessType";
// icons
import { MdCopyAll } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";

const Checkout = () => {
  const [viewResponse, setViewResponse] = useState(true);
  const [viewObjetConfig, setViewObjetConfig] = useState(true);
  const [viewAllCustom, setViewAllCustom] = useState(false);

  const [viewAmountInput, setViewAmountInput] = useState(false);
  const [viewIntegrationMethods, setViewIntegrationMethods] = useState(false);
  const [viewProcessType, setViewProcessType] = useState(false);
  const [viewFormActions, setViewFormActions] = useState(false);
  const [viewPaymentMethods, setViewPaymentMethods] = useState(false);
  const [viewLanguageSelector, setViewLanguageSelector] = useState(false);
  const [viewLogoInput, setViewLogoInput] = useState(false);
  const [viewThemeColor, setViewThemeColor] = useState(false);
  const [viewCustomFields, setViewCustomFields] = useState(false);

  const [merchantBuyerId, setMerchantBuyerId] = useState("MC2149");
  const [cardToken, setCardToken] = useState("");
  const [processType, setProcessType] = useState(
    window.Izipay.enums.processType.AUTHORIZATION
  );
  const [configCurrency, setConfigCurrency] = useState({
    currency: window.Izipay.enums.currency.PER,
    merchantCode: "4001834",
  });
  const [lenguageSelect, setLenguageSelect] = useState({
    init: window.Izipay.enums.langInit.ESP,
    control: true,
    ESP: true,
    ENG: false,
  });
  const [methodPay, setMethodPay] = useState({
    all: [true, window.Izipay.enums.showMethods.ALL],
    card: [true, window.Izipay.enums.showMethods.CARD],
    qr: [true, window.Izipay.enums.showMethods.QR],
    apple_pay: [true, window.Izipay.enums.showMethods.APPLE_PAY],
    yape: [true, window.Izipay.enums.showMethods.YAPE],
    ibk_app: [true, window.Izipay.enums.showMethods.IBK_APP],
    miles: [true, window.Izipay.enums.showMethods.MILES],
  });

  const [arrayMethodPay, setArrayMethodPay] = useState([
    window.Izipay.enums.showMethods.ALL,
  ]);
  const [amount, setAmount] = useState("1.99");
  const [integrationMethod, setIntegrationMethod] = useState({
    popUp: true,
    embebed: false,
    redirect: false,
  });
  const [actionForm, setActionForm] = useState({
    pay: true,
    register: false,
    payRegister: false,
    payToken: false,
  });
  const [appearance, setAppearance] = useState({
    logo: "",
    theme: window.Izipay.enums.theme.RED,
    hColor: "bg-[#FF4240]",
  });

  const [customData, setCustomData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
    field6: "",
    field7: "",
    field8: "",
    field9: "",
    field10: "",
  });

  const [copiedMessage, setCopiedMessage] = useState("");

  const handleCopy = (id) => {
    const text = document.getElementById(id)?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedMessage(id); // Guarda el id para mostrar el mensaje en el lugar correcto

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => setCopiedMessage(""), 2000);
    }
  };
  const handleViewAllCustom = () => {
    setViewAllCustom((prev) => {
      const newState = !prev;
      setViewAmountInput(newState);
      setViewIntegrationMethods(newState);
      setViewProcessType(newState);
      setViewFormActions(newState);
      setViewPaymentMethods(newState);
      setViewLanguageSelector(newState);
      setViewLogoInput(newState);
      setViewThemeColor(newState);
      setViewCustomFields(newState);
      return newState;
    });
  };

  useEffect(() => {
    let newArrayMethodPay = [];
    if (methodPay.all[0]) {
      newArrayMethodPay = [methodPay.all[1]];
    } else {
      newArrayMethodPay = Object.keys(methodPay)
        .filter((key) => key !== "all" && methodPay[key][0])
        .map((key) => methodPay[key][1]);
    }
    setArrayMethodPay(newArrayMethodPay);
  }, [methodPay]);

  return (
    <div className="w-full flex md:flex-row flex-col gap-0 md:items-start items-center justify-around">
      <section className="flex flex-col gap-2 items-center md:w-1/2 p-4 border rounded-md border-[#1A90FF] mx-2">
        <div className="flex border-b-[1px] border-[#1A90FF]  w-full justify-between items-center">
          <h2 className="text-slate-200 pb-1">
            Customización del objeto Config:
          </h2>
          <RiArrowDownSLine
            className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#1A90FF] ${
              !viewAllCustom && "rotate-180 pb-0 pt-1"
            }`}
            onClick={handleViewAllCustom}
          />
        </div>
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          configCurrency={configCurrency}
          setConfigCurrency={setConfigCurrency}
          viewAmountInput={viewAmountInput}
          setViewAmountInput={setViewAmountInput}
        />
        <IntegrationMethods
          integrationMethod={integrationMethod}
          setIntegrationMethod={setIntegrationMethod}
          viewIntegrationMethods={viewIntegrationMethods}
          setViewIntegrationMethods={setViewIntegrationMethods}
        />
        <ProcessType
          processType={processType}
          setProcessType={setProcessType}
          viewProcessType={viewProcessType}
          setViewProcessType={setViewProcessType}
        />
        <FormActions
          actionForm={actionForm}
          setActionForm={setActionForm}
          cardToken={cardToken}
          setCardToken={setCardToken}
          merchantBuyerId={merchantBuyerId}
          setMerchantBuyerId={setMerchantBuyerId}
          viewFormActions={viewFormActions}
          setViewFormActions={setViewFormActions}
        />
        <PaymentMethods
          methodPay={methodPay}
          setMethodPay={setMethodPay}
          viewPaymentMethods={viewPaymentMethods}
          setViewPaymentMethods={setViewPaymentMethods}
        />
        <LanguageSelector
          lenguageSelect={lenguageSelect}
          setLenguageSelect={setLenguageSelect}
          viewLanguageSelector={viewLanguageSelector}
          setViewLanguageSelector={setViewLanguageSelector}
        />
        <LogoInput
          appearance={appearance}
          setAppearance={setAppearance}
          viewLogoInput={viewLogoInput}
          setViewLogoInput={setViewLogoInput}
        />
        <ThemeColor
          appearance={appearance}
          setAppearance={setAppearance}
          viewThemeColor={viewThemeColor}
          setViewThemeColor={setViewThemeColor}
        />
        <CustomFields
          customData={customData}
          setCustomData={setCustomData}
          viewCustomFields={viewCustomFields}
          setViewCustomFields={setViewCustomFields}
        />
      </section>
      <section className="flex flex-col items-center md:w-1/2">
        <PaymentButton
          integrationMethod={integrationMethod}
          amount={amount}
          actionForm={actionForm}
          arrayMethodPay={arrayMethodPay}
          lenguageSelect={lenguageSelect}
          appearance={appearance}
          customData={customData}
          configCurrency={configCurrency}
          processType={processType}
          cardToken={cardToken}
          merchantBuyerId={merchantBuyerId}
        />
        <div className="flex flex-col p-2 justify-center items-center border rounded-md border-[#00A09D] w-full md:w-[700px] my-2 mx-4">
          <div className="flex border-b-[1px] border-[#00A09D]  w-full justify-between items-center">
            <h2 className="text-slate-200 pb-1">Objeto Config:</h2>
            <div className="flex gap-1">
              <MdCopyAll
                id="copyconfig"
                className="size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#00A09D]"
                onClick={() => handleCopy("objet-config")}
              />
              <RiArrowDownSLine
                className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#00A09D] ${
                  !viewObjetConfig && "rotate-180 pb-0 pt-1"
                }`}
                onClick={() => {
                  setViewObjetConfig(!viewObjetConfig);
                }}
              />
            </div>
          </div>
          <pre
            id="objet-config"
            className={`relative w-full p-2 font-light text-slate-300 text-sm overflow-y-auto max-h-[225px] ${
              viewObjetConfig ? "block" : "hidden"
            }`}
          >
            {/* ✅ Mensaje centrado dentro del <pre> */}
            {copiedMessage === "objet-config" && (
              <div className="absolute bottom-0 right-0 -translate-x-1/8 -translate-y-1/8 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
                ¡Texto copiado! ✅
              </div>
            )}
          </pre>
        </div>
        <div className="flex flex-col p-2 justify-center items-center border rounded-md border-[#FF4240] w-full md:w-[700px] my-2 mx-4 ">
          <div className="flex border-b-[1px] border-[#FF4240]  w-full justify-between items-center">
            <h2 className="text-slate-200 pb-1">Response:</h2>
            <div className="flex gap-1">
              <MdCopyAll
                id="copyresponse"
                className="size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#FF4240]"
                onClick={() => handleCopy("payment-message")}
              />
              <RiArrowDownSLine
                className={`size-6 pb-1 hover:cursor-pointer hover:scale-110 hover:text-[#FF4240] ${
                  !viewResponse && "rotate-180 pb-0 pt-1"
                }`}
                onClick={() => {
                  setViewResponse(!viewResponse);
                }}
              />
            </div>
          </div>
          <pre
            id="payment-message"
            className={`relative w-full p-2 font-light text-slate-300 text-sm overflow-y-auto max-h-[225px] ${
              viewResponse ? "block" : "hidden"
            }`}
          >
            {/* ✅ Mensaje centrado dentro del <pre> */}
            {copiedMessage === "payment-message" && (
              <div className="absolute bottom-0 right-0 -translate-x-1/8 -translate-y-1/8 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">
                ¡Texto copiado! ✅
              </div>
            )}
          </pre>
        </div>

        <div
          id="container-iframe"
          className=" w-min hidden overflow-hidden rounded-md p-4"
        >
          <div id="iframe-payment"></div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
