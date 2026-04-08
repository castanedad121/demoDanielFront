import { RiArrowDownSLine } from "react-icons/ri";

export const BillingInfo = ({
  billingData,
  setBillingData,
  viewBillingInfo,
  setViewBillingInfo,
}) => {
  const handleChange = (field, value) => {
    setBillingData((prev) => ({ ...prev, [field]: value }));
  };

  const fields = [
    { key: "firstName", label: "Nombres", placeholder: "Ej: Daniel" },
    { key: "lastName", label: "Apellidos", placeholder: "Ej: Castañeda" },
    { key: "email", label: "Email", placeholder: "Ej: cliente@email.com" },
    { key: "phoneNumber", label: "Teléfono", placeholder: "Ej: 989339999" },
    { key: "street", label: "Dirección", placeholder: "Ej: Av. Principal 123" },
    { key: "city", label: "Ciudad", placeholder: "Ej: Lima" },
    { key: "state", label: "Estado/Departamento", placeholder: "Ej: Lima" },
    { key: "country", label: "País (ISO)", placeholder: "Ej: PE" },
    { key: "postalCode", label: "Código Postal", placeholder: "Ej: 00001" },
    { key: "document", label: "Nro. Documento", placeholder: "Ej: 12345678" },
  ];

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewBillingInfo(!viewBillingInfo)}
      >
        <h2>📋 Datos de facturación (billing)</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewBillingInfo ? "collapsed" : ""}`}
        />
      </div>
      <div className={`section-content ${!viewBillingInfo ? "hidden-section" : ""}`}>
        <div className="grid grid-cols-2 gap-2 px-1">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="field-label">{label}</label>
              <input
                type="text"
                value={billingData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className="config-input"
              />
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <label className="field-label">Tipo de Documento</label>
            <select
              value={billingData.documentType}
              onChange={(e) => handleChange("documentType", e.target.value)}
              className="config-select"
            >
              <option value="DNI">DNI</option>
              <option value="CE">CE</option>
              <option value="RUC">RUC</option>
              <option value="PASAPORTE">PASAPORTE</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
