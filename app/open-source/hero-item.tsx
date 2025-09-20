import React, { useState } from "react";
import {
  ReactJSDatetimeRangePicker,
  type CalendarType,
} from "reactjs-datetime-range-picker";

const DTRP_TYPES: CalendarType[] = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
];

const DTRP_OPTIONS = ["timepicker", "timezone"];

export function HeroItem({ className = "" }: { className?: string }) {
  const [datetimeRangePickerType, setDatetimeRangePickerType] =
    useState<CalendarType>("daily");

  const [isTimePickerEnabled, setIsTimePickerEnabled] =
    useState<boolean>(false);
  const [isTimezoneSupportEnabled, setIsTimezoneSupportEnabled] =
    useState<boolean>(false);

  const handleTypeChange = (type: CalendarType) => {
    setDatetimeRangePickerType(type);
  };

  const handleOptionChanges = (checked: boolean, option: string) => {
    console.log("=====> checked", checked);
    if (option === "timepicker") {
      setIsTimePickerEnabled(checked);
    }
    if (option === "timezone") {
      setIsTimezoneSupportEnabled(checked);
    }
  };

  return (
    <div
      className={`hero-item project flex flex-col justify-between h-full w-full ${className}`}
    >
      <div className="image-container flex flex-col gap-16 justify-start items-start">
        <div className="types-container">
          <fieldset id="types" className="flex flex-wrap gap-8">
            {DTRP_TYPES.map((type, idx) => (
              <div
                key={idx}
                className="flex gap-4 text-sm items-center type-container"
              >
                <input
                  id={type}
                  type="radio"
                  value={type}
                  name="types"
                  checked={datetimeRangePickerType === type}
                  onChange={(e) =>
                    handleTypeChange(e.target.value as CalendarType)
                  }
                />
                <label htmlFor={type} className="type-label">
                  {type}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <div className="options-container flex gap-8">
          {DTRP_OPTIONS.map((option, idx) => (
            <div
              key={idx}
              className="flex gap-4 text-sm items-center type-container"
            >
              <input
                id={option}
                type="checkbox"
                value={option}
                name="types"
                checked={
                  (option === "timepicker" && isTimePickerEnabled && true) ||
                  (option === "timezone" && isTimezoneSupportEnabled && true)
                }
                onChange={(e) => handleOptionChanges(e.target.checked, option)}
              />
              <label htmlFor={option} className="option-label">
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="component-container">
          <ReactJSDatetimeRangePicker
            canBeEmpty={false}
            type={datetimeRangePickerType}
            timePicker={isTimePickerEnabled}
            timezoneSupport={isTimezoneSupportEnabled}
            dateRangeModel={{
              daily: {
                endDate: "2025-07-18",
                startDate: "2025-07-18",
              },
              weekly: {
                endDate: "2025-07-18",
                startDate: "2025-07-12",
              },
              monthly: {
                endDate: "2025-07-18",
                startDate: "2025-07-12",
              },
              quarterly: {
                endDate: "2025-07-18",
                startDate: "2025-07-12",
              },
              yearly: {
                endDate: "2025-07-18",
                startDate: "2025-07-12",
              },
            }}
            displayEndDate
            inputDateFormat="YYYY-MM-DD"
            label="Date"
            onDateRangeChange={() => {}}
            onDateRangeModelChange={() => {}}
            onDateSelect={() => {}}
            onInputBlur={() => {}}
            placeholder="Date"
            showRowNumber
            singleDatePicker
            viewDateFormat="MMM D, YYYY"
          />
        </div>
      </div>
      <div className="info mt-16">
        <div className="name">
          <a
            target="_blank"
            href="https://github.com/BhavinPatel04/ngx-datetime-range-picker"
            className="underline portfolio-link" rel="noreferrer"
          >
            Angular Datetime range picker
          </a>
          {" | "}
          <a
            target="_blank"
            href="https://github.com/BhavinPatel04/ngx-datetime-range-picker"
            className="underline portfolio-link" rel="noreferrer"
          >
            React Datetime range picker
          </a>
        </div>
        <div className="description">
          This plugin uses bootstrap and moment.js. This plugin can render the
          components from any UI library you are using in your app as long as
          the UI library exports Input, Select and Button components.
        </div>
        <div className="tech-stack">
          <i>React</i> | <i>Angular</i>
        </div>
      </div>
    </div>
  );
}
