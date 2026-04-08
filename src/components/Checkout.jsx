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
import { BillingInfo } from "./BillingInfo";
// icons
import { MdCopyAll } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { IpnUrlInput } from "./IpnUrlInput";

const Checkout = ({ appSettings }) => {
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
  const [viewIpnUrlInput, setViewIpnUrlInput] = useState(false);
  const [viewCustomFields, setViewCustomFields] = useState(false);
  const [viewBillingInfo, setViewBillingInfo] = useState(false);

  const [merchantBuyerId, setMerchantBuyerId] = useState("MC2149");
  const [cardToken, setCardToken] = useState("");
  const [processType, setProcessType] = useState(
    window.Izipay.enums.processType.AUTHORIZATION
  );
  const [configCurrency, setConfigCurrency] = useState({
    currency: "PEN",
    merchantCode: appSettings?.credentials?.PEN?.merchantCode || "4004353",
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
    payCardSelector: false,
  });
  const [appearance, setAppearance] = useState({
    logo: "",
    theme: window.Izipay.enums.theme.RED,
    hColor: "bg-[#FF4240]",
  });

  const [urlIpn, setUrlIpn] = useState("");

  const [cardSelectorData, setCardSelectorData] = useState({
    documentType: "DNI",
    document: "",
  });

  const [billingData, setBillingData] = useState({
    firstName: "Daniel",
    lastName: "Castañeda",
    email: "jwick@izipay.pe",
    phoneNumber: "989339999",
    street: "calle el demo",
    city: "Lima",
    state: "Lima",
    country: "PE",
    postalCode: "00001",
    document: "12345678",
    documentType: "DNI",
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
      setCopiedMessage(id);
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
      setViewIpnUrlInput(newState);
      setViewCustomFields(newState);
      setViewBillingInfo(newState);
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
    <div className="w-full flex md:flex-row flex-col gap-4 md:items-start items-center justify-center px-4 pb-8">
      {/* Left Column: Settings Panel */}
      <section className="glass-panel flex flex-col gap-0 md:w-[520px] w-full p-5 shadow-2xl transition-all duration-500">
        <div className="p-5 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/30 dark:bg-transparent rounded-t-2xl">
          <h2 className="text-slate-900 dark:text-white font-bold text-sm tracking-tight">
            ⚡ Configuración del objeto Config
          </h2>
          <button
            className="text-xs font-bold px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 hover:bg-blue-600/20 transition-all shadow-sm"
            onClick={handleViewAllCustom}
          >
            {viewAllCustom ? "Colapsar todo" : "Expandir todo"}
          </button>
        </div>
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          configCurrency={configCurrency}
          setConfigCurrency={setConfigCurrency}
          viewAmountInput={viewAmountInput}
          setViewAmountInput={setViewAmountInput}
          appSettings={appSettings}
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
          cardSelectorData={cardSelectorData}
          setCardSelectorData={setCardSelectorData}
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
        <IpnUrlInput
          urlIpn={urlIpn}
          setUrlIpn={setUrlIpn}
          viewIpnUrlInput={viewIpnUrlInput}
          setViewIpnUrlInput={setViewIpnUrlInput}
        />
        <BillingInfo
          billingData={billingData}
          setBillingData={setBillingData}
          viewBillingInfo={viewBillingInfo}
          setViewBillingInfo={setViewBillingInfo}
        />
        <CustomFields
          customData={customData}
          setCustomData={setCustomData}
          viewCustomFields={viewCustomFields}
          setViewCustomFields={setViewCustomFields}
        />
      </section>

      {/* Right Panel - Payment + Output */}
      <section className="flex flex-col items-center md:w-[520px] w-full gap-4">
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
          urlIpn={urlIpn}
          cardSelectorData={cardSelectorData}
          billingData={billingData}
          appSettings={appSettings}
        />

        {/* Config Output */}
        <div className="output-panel w-full shadow-lg border-emerald-500/10 dark:border-white/5">
          <div className="output-panel-header">
            <h2 className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
              📄 Objeto Config
            </h2>
            <div className="flex gap-2">
              <MdCopyAll
                className="size-5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                onClick={() => handleCopy("objet-config")}
              />
              <RiArrowDownSLine
                className={`size-5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-all ${
                  !viewObjetConfig && "rotate-180"
                }`}
                onClick={() => setViewObjetConfig(!viewObjetConfig)}
              />
            </div>
          </div>
          <pre
            id="objet-config"
            className={`relative w-full p-4 font-mono text-slate-950 dark:text-slate-300 text-xs overflow-y-auto max-h-[250px] font-medium ${
              viewObjetConfig ? "block" : "hidden"
            }`}
          >
            {copiedMessage === "objet-config" && (
              <div className="copy-toast">¡Copiado! ✅</div>
            )}
          </pre>
        </div>

        {/* Response Output */}
        <div className="output-panel response w-full shadow-lg border-red-500/10 dark:border-white/5">
          <div className="output-panel-header">
            <h2 className="text-sm font-bold text-red-600 dark:text-red-400">
              📨 Response
            </h2>
            <div className="flex gap-2">
              <MdCopyAll
                className="size-5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
                onClick={() => handleCopy("payment-message")}
              />
              <RiArrowDownSLine
                className={`size-5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-all ${
                  !viewResponse && "rotate-180"
                }`}
                onClick={() => setViewResponse(!viewResponse)}
              />
            </div>
          </div>
          <pre
            id="payment-message"
            className={`relative w-full p-4 font-mono text-slate-950 dark:text-slate-300 text-xs overflow-y-auto max-h-[250px] font-medium ${
              viewResponse ? "block" : "hidden"
            }`}
          >
            {copiedMessage === "payment-message" && (
              <div className="copy-toast">¡Copiado! ✅</div>
            )}
          </pre>
        </div>

        <div
          id="container-iframe"
          className={`relative z-10 w-full md:w-[520px] bg-white rounded-2xl overflow-hidden p-4 sm:p-6 shadow-xl transition-all duration-300 mt-2 ${
            integrationMethod.embebed ? "block" : "hidden"
          }`}
        >
          <div id="iframe-payment"></div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
