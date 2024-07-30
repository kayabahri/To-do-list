import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Datepicker.css';

const Datepicker = ({ selectedDate, onDateChange, onSave, onCancel }) => {
  const [startDate, setStartDate] = useState(selectedDate.start || null);
  const [endDate, setEndDate] = useState(selectedDate.end || null);
  const [selectingStartDate, setSelectingStartDate] = useState(true);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateChange({ start: date, end: endDate });
    setSelectingStartDate(false);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateChange({ start: startDate, end: date });
  };

  const handleSave = () => {
    if (startDate && endDate) {
      onSave();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="datepicker-container">
      <h2>Tarihler</h2>
      <div className="datepicker-inputs">
        <label>
          Başlangıç Tarihi
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="Pp"
            showTimeSelect
            placeholderText="Başlangıç Tarihi Seç"
            className="datepicker-input"
          />
        </label>
        {!selectingStartDate && (
          <label>
            Bitiş Tarihi
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="Pp"
              showTimeSelect
              placeholderText="Bitiş Tarihi Seç"
              className="datepicker-input"
            />
          </label>
        )}
      </div>
      <div className="datepicker-buttons">
        <button className="save-button" onClick={handleSave}>Kaydet</button>
        <button className="cancel-button" onClick={handleCancel}>Kapat</button>
      </div>
    </div>
  );
};

export default Datepicker;
