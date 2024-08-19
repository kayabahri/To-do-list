import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import '../styles/Datepicker.css';

const Datepicker = ({ selectedDate, onDateChange, onSave, onCancel }) => {
  const { t } = useTranslation();
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
      alert(t('End date cannot be before the start date!'));
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
      <h2>{t('Dates')}</h2>
      <div className="datepicker-inputs">
        <label>
          {t('Start Date')}
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText={t('Select Start Date')}
            className="datepicker-input"
            shouldCloseOnSelect={true} // Close the calendar when a date is selected
          />
        </label>
        {!selectingStartDate && (
          <label>
            {t('End Date')}
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText={t('Select End Date')}
              className="datepicker-input"
              minDate={startDate}
              shouldCloseOnSelect={true} // Close the calendar when a date is selected
            />
          </label>
        )}
      </div>
      <div className="datepicker-buttons">
        <button className="save-button" onClick={handleSave}>{t('Save')}</button>
        <button className="cancel-button" onClick={handleCancel}>{t('Close')}</button>
      </div>
    </div>
  );
};

export default Datepicker;
