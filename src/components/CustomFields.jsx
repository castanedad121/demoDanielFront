import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

export const CustomFields = ({
  customData,
  setCustomData,
  viewCustomFields,
  setViewCustomFields,
}) => {
  const [tempValues, setTempValues] = useState(customData);

  const handleBlur = (e) => {
    let name = e.target.name;
    setCustomData((prev) => ({ ...prev, [name]: tempValues[name] }));
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTempValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="config-section">
      <div
        className="section-header"
        onClick={() => setViewCustomFields(!viewCustomFields)}
      >
        <h2>📝 Custom Fields</h2>
        <RiArrowDownSLine
          className={`arrow-icon ${!viewCustomFields ? "collapsed" : ""}`}
        />
      </div>
      <div
        className={`section-content ${!viewCustomFields ? "hidden-section" : ""}`}
      >
        <div className="grid grid-cols-2 gap-2 px-1">
          {Object.keys(customData).map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="field-label">{field}</label>
              <input
                type="text"
                value={tempValues[field] || ""}
                name={field}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`Valor para ${field}`}
                className="config-input"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
