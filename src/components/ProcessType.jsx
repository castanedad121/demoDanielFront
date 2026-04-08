import { RiArrowDownSLine } from "react-icons/ri";
export const ProcessType = ({
  processType,
  setProcessType,
  viewProcessType,
  setViewProcessType,
}) => {
  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewProcessType(!viewProcessType)}
      >
        <h2>⚙️ Tipo de proceso</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewProcessType ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${!viewProcessType ? "hidden-section" : ""}`}
      >
        <div className="flex gap-2 flex-wrap px-1">
          <button
            className={`pill-btn ${
              processType === window.Izipay.enums.processType.AUTHORIZATION
                ? "active"
                : "inactive"
            }`}
            onClick={() =>
              setProcessType(window.Izipay.enums.processType.AUTHORIZATION)
            }
          >
            ✅ Autorización
          </button>
          <button
            className={`pill-btn ${
              processType === window.Izipay.enums.processType.PRE_AUTHORIZATION
                ? "active"
                : "inactive"
            }`}
            onClick={() =>
              setProcessType(window.Izipay.enums.processType.PRE_AUTHORIZATION)
            }
          >
            🔒 Pre-Autorización
          </button>
        </div>
      </div>
    </div>
  );
};
