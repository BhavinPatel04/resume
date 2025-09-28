import React, { useState } from "react";
import {
  ReactJSDatetimeRangePicker,
  type CalendarType,
  type DateRangeModel,
  type Options,
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
  const [isSingleDatePicker, setIsSingleDatePicker] = useState<boolean>(true);
  const [datetimeRangePickerType, setDatetimeRangePickerType] =
    useState<CalendarType>("daily");

  const [isTimePickerEnabled, setIsTimePickerEnabled] = useState<boolean>(true);
  const [isTimezoneSupportEnabled, setIsTimezoneSupportEnabled] =
    useState<boolean>(true);

  const [dateRange, setDateRange] = useState<{
    endDate: string;
    startDate: string;
  }>({
    startDate: "2025-07-12",
    endDate: "2025-07-18",
  });

  const getOptions = (dateRange: { endDate: string; startDate: string }) => ({
    daily: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    weekly: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    monthly: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    quarterly: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
    yearly: {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    },
  });

  const [dateRangeModel, setDateRangeModel] = useState<DateRangeModel>(
    getOptions(dateRange),
  );

  const handleTypeChange = (type: CalendarType) => {
    setDatetimeRangePickerType(type);
  };

  const handleOptionChanges = (checked: boolean, option: string) => {
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
        <div className="options-container flex gap-8">
          <div
            key={"single-date-picker-selector"}
            className="flex gap-4 text-sm items-center type-container"
          >
            <input
              id={"single-date-picker-selector"}
              type="checkbox"
              value={"Single date picker"}
              name="types"
              checked={isSingleDatePicker}
              onChange={(e) => setIsSingleDatePicker(e.target.checked)}
            />
            <label
              htmlFor={"single-date-picker-selectorr"}
              className="option-label"
            >
              Single date rangle picker
            </label>
          </div>
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
        <div className="component-container w-full">
          <ReactJSDatetimeRangePicker
            canBeEmpty={false}
            type={datetimeRangePickerType}
            timePicker={isTimePickerEnabled}
            timezoneSupport={isTimezoneSupportEnabled}
            dateRangeModel={dateRangeModel}
            displayEndDate
            inputDateFormat="YYYY-MM-DD"
            label="Date"
            placeholder="Date"
            showRowNumber
            singleDatePicker={isSingleDatePicker}
            viewDateFormat="MMM D, YYYY"
            onDateRangeChange={(options: Options) => {
              const _dateRange = {
                startDate: options.startDate
                  ? `${options.startDate}`
                  : dateRange.startDate,
                endDate: options.endDate
                  ? `${options.endDate}`
                  : dateRange.endDate,
              };
              setDateRange(_dateRange);
              setDateRangeModel(getOptions(_dateRange));
            }}
            onDateRangeModelChange={(model) => {
              setDateRangeModel(model as DateRangeModel);
            }}
            onDateSelect={(options: Options) => {
              const _dateRange = {
                startDate: options.startDate
                  ? `${options.startDate}`
                  : dateRange.startDate,
                endDate: options.endDate
                  ? `${options.endDate}`
                  : dateRange.endDate,
              };
              setDateRange(_dateRange);
              setDateRangeModel(getOptions(_dateRange));
            }}
            onInputBlur={() => {}}
          />
        </div>
      </div>
      <div className="info mt-16">
        <div className="name">
          <a
            target="_blank"
            href="https://github.com/BhavinPatel04/ngx-datetime-range-picker"
            className="underline portfolio-link"
            rel="noreferrer"
          >
            Angular Datetime range picker
          </a>
          {" | "}
          <a
            target="_blank"
            href="https://github.com/BhavinPatel04/reactjs-datetime-range-picker"
            className="underline portfolio-link"
            rel="noreferrer"
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
