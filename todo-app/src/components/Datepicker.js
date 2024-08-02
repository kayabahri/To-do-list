import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Datepicker.css';

const Datepicker = ({ selectedDate, onDateChange, onSave, onCancel }) => {
  const [startDate, setStartDate] = useState(selectedDate.start ? new Date(selectedDate.start) : null);
  const [endDate, setEndDate] = useState(selectedDate.end ? new Date(selectedDate.end) : null);
  const [selectingStartDate, setSelectingStartDate] = useState(true);

  const handleStartDateChange = (date) => {
    console.log('Start Date Selected:', date);
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
    onDateChange({ start: date.toISOString(), end: endDate ? endDate.toISOString() : null });
    setSelectingStartDate(false);
  };

  const handleEndDateChange = (date) => {
    console.log('End Date Selected:', date);
    if (startDate && date < startDate) {
      alert('Bitiş tarihi başlangıç tarihinden önce olamaz!');
    } else {
      setEndDate(date);
      onDateChange({ start: startDate ? startDate.toISOString() : null, end: date.toISOString() });
      setSelectingStartDate(true);
    }
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
            dateFormat="dd/MM/yyyy"
            placeholderText="Başlangıç Tarihi Seç"
            className="datepicker-input"
            shouldCloseOnSelect={true} // Tarih seçildiğinde takvimi kapatır
          />
        </label>
        {!selectingStartDate && (
          <label>
            Bitiş Tarihi
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Bitiş Tarihi Seç"
              className="datepicker-input"
              minDate={startDate}
              shouldCloseOnSelect={true} // Tarih seçildiğinde takvimi kapatır
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
