import React, { useState } from "react";
import "./FIlter.css";
import DatePicker from "react-datepicker";
function Filter({ setFilter, setSubmitFilter, filter, submitFilter }) {
  const [startDateMin, setStartDateMin] = useState(new Date());
  const [startDateMax, setStartDateMax] = useState(new Date());

  function handleMinChange(date: Date) {
    const minDay = date;
    setStartDateMin(date);
    setFilter({ ...filter, minDay });
  }
  function handleMaxChange(date: Date) {
    const maxDay = date;
    setStartDateMax(date);
    setFilter({ ...filter, maxDay });
  }
  function handleMinPeapolChange(e) {
    var minPeapol = e.target.value;
    setFilter({ ...filter, minPeapol });
  }
  function handleMaxPeapolChange(e) {
    var maxPeapol = e.target.value;
    setFilter({ ...filter, maxPeapol });
  }
  function handleStateChange(Status) {
    setFilter({ ...filter, Status });
  }
  function handleSubmit() {
    setSubmitFilter(true);
  }
  function handleSubmitCancel() {
    setSubmitFilter(false);
    setFilter([])
  }
  var ClassNamePrivate = "Private" === filter.Status ? "seleccionado" : "";
  var ClassNamePublic = "Public" === filter.Status ? "seleccionado" : "";

  return (
    <div className="filter_card">
      <div className="filter_container">
        {/* Aca para los usuarios */}
        <div className="filter_peapol">
          <span>Users in the bet</span>
          <div>
            <input
              type="number"
              onChange={handleMinPeapolChange}
              placeholder="min"
              name=""
              id=""
            />
            <input
              type="number"
              onChange={handleMaxPeapolChange}
              placeholder="max"
              name=""
              id=""
            />
          </div>
        </div>
        {/* aca para el status */}
        <div className="filter_state">
          <span>Status of bet</span>
          <div>
            <button
              className={ClassNamePrivate}
              onClick={() => handleStateChange("Private")}
            >
              Private
            </button>
            <button
              className={ClassNamePublic}
              onClick={() => handleStateChange("Public")}
            >
              Public
            </button>
          </div>
        </div>
        {/* aca para dias */}
        <div className="filter_peapol">
          <span>Min day of the bet</span>
          <div>
            <DatePicker
              className="filter_date"
              selected={startDateMin}
              onChange={(date) => handleMinChange(date)}
            />
          </div>
          <span>Max day of the bet</span>
          <div>
            <DatePicker
              className="filter_date"
              selected={startDateMax}
              onChange={(date) => handleMaxChange(date)}
            />
          </div>
          {submitFilter === false ? (
            <button onClick={handleSubmit} className="filter_button">
              Submit
            </button>
          ) : (
            <button style={{backgroundColor:'red', color:'white'}} onClick={handleSubmitCancel} className="filter_button">

              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
