"use client";
import moment from "moment";
import { useState } from "react";
//@ts-ignore
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = ({ classes, setSelected }: any) => {
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  const transformedClasses = classes.map((classItem: any) => {
    const [startTime, endTime] = classItem.time.split("-");

    const today = moment();
    let currentWeekStart = today.clone().startOf("week");
    let classDay = currentWeekStart.clone().day(classItem.day);

    const startDate = classDay
      .clone()
      .hour(
        (parseInt(startTime.split(":")[0]) % 12) +
          (startTime.includes("pm") ? 12 : 0)
      )
      .minute(parseInt(startTime.split(":")[1].slice(0, -2)))
      .second(0)
      .millisecond(0)
      .toDate();

    const endDate = classDay
      .clone()
      .hour(
        (parseInt(endTime.split(":")[0]) % 12) +
          (endTime.includes("pm") ? 12 : 0)
      )
      .minute(parseInt(endTime.split(":")[1].slice(0, -2)))
      .second(0)
      .millisecond(0)
      .toDate();

    return {
      id: classItem.id,
      title: classItem.name,
      start: startDate,
      end: endDate,
      date: classDay.format("ddd Do MMM YYYY"),
      ...classItem,
    };
  });

  const handleSelectEvent = (event: any) => {
    setSelectedClasses((prev) => {
      const isSelected = prev.some(
        (selectedEvent) => selectedEvent.id === event.id
      );
      const newSelectedClasses = isSelected
        ? prev.filter((selectedEvent) => selectedEvent.id !== event.id)
        : [...prev, event];

      setSelected(newSelectedClasses);
      return newSelectedClasses;
    });
  };

  const eventStyleGetter = (event: any) => {
    const backgroundColor = selectedClasses.some(
      (selectedEvent) => selectedEvent.id === event.id
    )
      ? "#32CD32"
      : "#2463EB";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "5px",
        border: "1px solid #3174ad",
        display: "block",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        padding: "4px 8px",
        fontSize: "0.875rem",
        fontWeight: "bold",
      },
    };
  };

  const CustomToolbar = (toolbar: any) => {
    const label = () => {
      const date = toolbar.date;
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-toolbar-label">{label()}</span>
      </div>
    );
  };

  const currentWeekStart = moment().startOf("week").toDate();

  return (
    <Calendar
      localizer={localizer}
      events={transformedClasses}
      defaultView="week"
      defaultDate={currentWeekStart}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 600, width: "100%" }}
      className="w-full px-12"
      step={15}
      selectable
      min={new Date(0, 0, 0, 8, 0)}
      max={new Date(0, 0, 0, 18, 0)}
      eventPropGetter={eventStyleGetter}
      components={{
        toolbar: CustomToolbar,
      }}
      onSelectEvent={handleSelectEvent}
    />
  );
};

export default CalendarView;
