import { RiArrowDownSLine } from "react-icons/ri";
export const IntegrationMethods = ({
  integrationMethod,
  setIntegrationMethod,
  viewIntegrationMethods,
  setViewIntegrationMethods,
}) => {
  const handleSelectMethod = (method) => {
    if (method === "popUp") {
      setIntegrationMethod({ popUp: true, embebed: false, redirect: false });
    } else if (method === "embebed") {
      setIntegrationMethod({ popUp: false, embebed: true, redirect: false });
    } else if (method === "redirect") {
      setIntegrationMethod({ popUp: false, embebed: false, redirect: true });
    }
  };

  const methods = [
    { id: "popUp", label: "Pop-up", icon: "🪟", active: integrationMethod.popUp },
    { id: "embebed", label: "Embebido", icon: "📦", active: integrationMethod.embebed },
    { id: "redirect", label: "Redirect", icon: "↗️", active: integrationMethod.redirect },
  ];

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewIntegrationMethods(!viewIntegrationMethods)}
      >
        <h2>🔗 Métodos de integración</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewIntegrationMethods ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${
          !viewIntegrationMethods ? "hidden-section" : ""
        }`}
      >
        <div className="flex gap-2 flex-wrap px-1">
          {methods.map((m) => (
            <button
              key={m.id}
              className={`pill-btn ${m.active ? "active" : "inactive"}`}
              onClick={() => handleSelectMethod(m.id)}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
