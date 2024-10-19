"use client";
import moment from "moment";
import { useState, useMemo } from "react";
//@ts-ignore
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = ({ classes, setSelected }: any) => {
  const [selectedClasses, setSelectedClasses] = useState<any[]>([]);

  const transformedClasses = useMemo(() => {
    const today = moment();
    const startOfYear = today.clone().startOf("year");
    const endOfYear = today.clone().endOf("year");

    return classes.flatMap((classItem: any) => {
      const [startTime, endTime] = classItem.time.split("-");
      const dayOfWeek = classItem.day;

      let currentDate = startOfYear.clone().day(dayOfWeek);
      const events = [];

      while (currentDate.isSameOrBefore(endOfYear)) {
        const startDate = currentDate
          .clone()
          .hour(
            (parseInt(startTime.split(":")[0]) % 12) +
              (startTime.includes("pm") ? 12 : 0)
          )
          .minute(parseInt(startTime.split(":")[1].slice(0, -2)))
          .second(0)
          .millisecond(0)
          .toDate();

        const endDate = currentDate
          .clone()
          .hour(
            (parseInt(endTime.split(":")[0]) % 12) +
              (endTime.includes("pm") ? 12 : 0)
          )
          .minute(parseInt(endTime.split(":")[1].slice(0, -2)))
          .second(0)
          .millisecond(0)
          .toDate();

        events.push({
          id: `${classItem.id}-${currentDate.format("YYYY-MM-DD")}`,
          title: classItem.name,
          start: startDate,
          end: endDate,
          date: currentDate.format("ddd Do MMM YYYY"),
          ...classItem,
        });

        currentDate.add(1, "week");
      }

      return events;
    });
  }, [classes]);

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

  const getDefaultDate = () => {
    const today = moment();
    const dayOfWeek = today.day();

    // If it's Saturday (6) or after, show next week
    if (dayOfWeek >= 6) {
      return today.add(1, "week").startOf("week").toDate();
    }

    // Otherwise, show current week
    return today.startOf("week").toDate();
  };

  const defaultDate = useMemo(() => getDefaultDate(), []);

  return (
    <Calendar
      localizer={localizer}
      events={transformedClasses}
      defaultView="week"
      defaultDate={defaultDate}
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
