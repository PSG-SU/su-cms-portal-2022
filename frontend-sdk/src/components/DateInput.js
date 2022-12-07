import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  startTitle = "",
  endTitle = "",
  className = "w-full",
  startState = [new Date(), (v) => { }],
  endState = [new Date(), (v) => { }],
  range = false,
  year = false,
  dateformat="dd MMM yyyy, hh:mm aa"
}) => {
  const [startValue, setStartValue] = startState;
  const [endValue, setEndValue] = endState;

  return (
    <div className={`${className} flex items-center space-x-4`}>
      <div
        className={`${className} flex flex-col items-start justify-center space-y-2`}
      >
        <label className="text-blue text-base">{startTitle}</label>
        <DatePicker
          className="px-4 py-2 w-full rounded-lg text-slate bg-gray bg-clip-padding bg-no-repeat border-2 border-solid border-gray 
              first-letter:transition ease-in-out m-0 focus:outline-none focus:border-cloud"
          selected={startValue}
          onChange={(date) => setStartValue(date)}
          selectsStart

          startDate={startValue}
          endDate={endValue}
          maxDate={endValue}

          showYearPicker={year}
          showTimeSelect={!year}
          dateFormat={dateformat}
          placeholderText="Select a date"
        />
      </div>
      {range && (
        <div
          className={`${className} flex flex-col items-start justify-center space-y-2`}
        >
          <label className="text-blue text-base">{endTitle}</label>
          <DatePicker
            className="px-4 py-2 w-full rounded-lg text-slate bg-gray bg-clip-padding bg-no-repeat border-2 border-solid border-gray 
              first-letter:transition ease-in-out m-0 focus:outline-none focus:border-cloud"
            selected={endValue}
            onChange={(date) => setEndValue(date)}
            selectsEnd

            startDate={startValue}
            endDate={endValue}
            minDate={startValue}

            showYearPicker={year}
            showTimeSelect={!year}
            filterTime={
              (time) => {
                return startValue.getTime() < time.getTime();
              }
            }
            dateFormat={dateformat}
            placeholderText="Select a date"
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
