"use client";
import moment from "moment";
import { useState } from "react";
//@ts-ignore
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = ({ classes, setSelected }: any) => {
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  const transformedClasses = classes.map((classItem: any) => {
    const [startTime, endTime] = classItem.time.split("-");
    const startDate = moment()
      .day(classItem.day)
      .hour(
        (parseInt(startTime.split(":")[0]) % 12) +
          (startTime.includes("pm") ? 12 : 0)
      )
      .minute(parseInt(startTime.split(":")[1].slice(0, -2)))
      .second(0)
      .millisecond(0)
      .toDate();
    const endDate = moment()
      .day(classItem.day)
      .hour(
        (parseInt(endTime.split(":")[0]) % 12) +
          (endTime.includes("pm") ? 12 : 0)
      )
      .minute(parseInt(endTime.split(":")[1].slice(0, -2)))
      .second(0)
      .millisecond(0)
      .toDate();
    const date = moment()
      .day(classItem.day)
      .startOf("day")
      .toDate()
      .toDateString();

    return {
      id: classItem.id,
      title: classItem.name,
      start: startDate,
      end: endDate,
      date: date,
      ...classItem, // Include all other class properties
    };
  });

  const views = ["week", "day"];

  const handleSelectEvent = (event: any) => {
    setSelectedClasses((prev) => {
      const isSelected = prev.some(
        (selectedEvent) => selectedEvent.id === event.id
      );
      const newSelectedClasses = isSelected
        ? prev.filter((selectedEvent) => selectedEvent.id !== event.id) // Remove if already selected
        : [...prev, event]; // Add if not selected

      setSelected(newSelectedClasses); // Update the parent state
      return newSelectedClasses;
    });
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    // Optionally, you could implement logic here to select classes based on the slot
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

  return (
    <Calendar
      localizer={localizer}
      events={transformedClasses}
      defaultView="week"
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
        toolbar: CustomToolbar, // Use the custom toolbar
        event: (eventProps: any) => (
          <div style={{}}>{eventProps.event.title}</div>
        ),
      }}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
    />
  );
};

export default CalendarView;
