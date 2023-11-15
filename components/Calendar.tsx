"use client";

import { useEffect, useState } from "react";
import DayState from "./DayState";
import { toggleDuty } from "@/app/actions";

function getDayInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const firstWeekDay = (date.getDay() + 6) % 7;
  const numberOfEmptyDays = Array(firstWeekDay).fill(null);
  const days = [...numberOfEmptyDays];
  while (date.getMonth() == month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({
  duty,
  dutyTime,
}: {
  duty: string;
  dutyTime: Record<string, boolean> | null;
}) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    getDayInMonth(currentMonth, currentYear)
  );

  useEffect(() => {
    setDaysInMonth(getDayInMonth(month, year));
    setSelectedDate(new Date(year, month));
  }, [month, year]);

  function goToPreviousMonth() {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  }
  function goToNextMonth() {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  }

  function getFullDate() {
    return `${selectedDate.toLocaleString("en", {
      month: "long",
    })} of ${selectedDate.getFullYear()}`;
  }
  function getCurrentDay(day: Date) {
    return `${year.toString()}-${(month + 1).toString().padStart(2, "0")}-${day
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <section className="w-full my-2 rounded-md bg-neutral-800">
      <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
        <button onClick={goToPreviousMonth}>←</button>
        <span>{getFullDate()}</span>
        <button onClick={goToNextMonth}>→</button>
      </div>
      <div className="grid w-full grid-cols-7 mt-2">
        {weekDays.map((day) => (
          <div className="flex flex-col items-center p-2" key={day}>
            <span className="font-sans text-xs font-light text-neutral-200">
              {day}
            </span>
          </div>
        ))}

        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 hover:cursor-pointer"
            onClick={() =>
              toggleDuty({
                duty,
                dutyTime,
                date: getCurrentDay(day),
                done: dutyTime ? dutyTime[getCurrentDay(day)]: true,
              })
            }
          >
            <span className="font-sans text-xs text-center font-light text-neutral-400">
              {day?.getDate()}
            </span>
            {day && (
                <DayState day={dutyTime ? dutyTime[getCurrentDay(day)]: undefined} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
