import { RiArrowDownSLine } from "react-icons/ri";
export const AmountInput = ({
  amount,
  setAmount,
  configCurrency,
  setConfigCurrency,
  viewAmountInput,
  setViewAmountInput,
  appSettings,
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
    const selectedCurrency = event.currentTarget.id;
    const dynamicMerchantCode = 
      selectedCurrency === "PEN" 
        ? appSettings?.credentials?.PEN?.merchantCode 
        : appSettings?.credentials?.USD?.merchantCode;

    setConfigCurrency({
      currency: selectedCurrency,
      merchantCode: dynamicMerchantCode || "4004353",
    });
  };

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewAmountInput(!viewAmountInput)}
      >
        <h2>💰 Monto y moneda de pago</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewAmountInput ? "collapsed" : ""}`}
        />
      </div>
      <div className={`section-content ${!viewAmountInput ? "hidden-section" : ""}`}>
        <div className="flex flex-wrap items-center gap-4 px-1">
          <div className="flex flex-col gap-1">
            <label className="field-label">Monto</label>
            <input
              type="text"
              value={amount}
              onChange={handleChange}
              onBlur={handleBlur}
              inputMode="decimal"
              className="config-input w-[140px]"
            />
          </div>
          <div className="flex gap-2">
            <button
              id="PEN"
              className={`pill-btn ${
                currency === "PEN" ? "active" : "inactive"
              }`}
              onClick={handleCurrency}
            >
              🇵🇪 Soles
            </button>
            <button
              id="USD"
              className={`pill-btn ${
                currency === "USD" ? "active" : "inactive"
              }`}
              onClick={handleCurrency}
            >
              🇺🇸 Dólares
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
