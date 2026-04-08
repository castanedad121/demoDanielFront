import { RiArrowDownSLine } from "react-icons/ri";
export const FormActions = ({
  actionForm,
  setActionForm,
  cardToken,
  setCardToken,
  merchantBuyerId,
  setMerchantBuyerId,
  viewFormActions,
  setViewFormActions,
}) => {
  const handleActionClick = (action) => {
    setActionForm({
      pay: action === "pay",
      register: action === "register",
      payRegister: action === "payRegister",
      payToken: action === "payToken",
      payCardSelector: action === "payCardSelector",
    });
  };

  const actions = [
    { id: "pay", label: "Pay", icon: "💳" },
    { id: "register", label: "Register", icon: "📝" },
    { id: "payRegister", label: "Pay Register", icon: "💳📝" },
    { id: "payToken", label: "Pay Token", icon: "🔑" },
    { id: "payCardSelector", label: "Pay Card Selector", icon: "🗂️" },
  ];

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewFormActions(!viewFormActions)}
      >
        <h2>🎯 Acción del formulario</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewFormActions ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${!viewFormActions ? "hidden-section" : ""}`}
      >
        <div className="flex flex-wrap gap-2 px-1 mb-3">
          {actions.map((a) => (
            <button
              key={a.id}
              id={a.id}
              className={`pill-btn ${actionForm[a.id] ? "active" : "inactive"}`}
              onClick={() => handleActionClick(a.id)}
            >
              {a.icon} {a.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 px-1">
          <div className="flex flex-col gap-1">
            <label className="field-label">merchantBuyerId</label>
            <input
              type="text"
              value={merchantBuyerId}
              onChange={(e) => setMerchantBuyerId(e.currentTarget.value)}
              placeholder="Ingresa ID del cliente"
              className="config-input w-[200px]"
            />
          </div>

          {actionForm.payToken && (
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <label className="field-label">cardToken</label>
              <input
                type="text"
                value={cardToken}
                onChange={(e) => setCardToken(e.currentTarget.value)}
                placeholder="Token de tarjeta..."
                className="config-input"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
