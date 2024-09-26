"use client";
import moment from "moment";
import { useState } from "react";
//@ts-ignore
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import CalendarView from "@/components/Calendar";
import { classes } from "../../timetable.js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api.js";
import { useRouter } from "next/navigation";

// Set up the localizer for moment.js

const Home = () => {
  const [name, setName] = useState("Priyansh");
  const [sap, setSap] = useState("60003220151");
  const [selected, setSelected] = useState([]);

  const [reason, setReason] = useState("membership drive");
  console.log(selected);
  const createClass = useMutation(api.item.createItem);
  const handleSubmit = async () => {
    await Promise.all(
      selected.map((item) =>
        createClass({
          //@ts-ignore

          date: item.date,
          //@ts-ignore

          day: item.day,
          //@ts-ignore

          faculty: item.faculty,
          //@ts-ignore
          subject: item.name,
          //@ts-ignore
          time: item.time,
          name: name,
          sap: sap,
          reason: reason,
          division: "division",
        })
      )
    );
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="w-full flex items-center justify-center gap-10">
        <div className="">
          <Label>Name</Label>
          <Input
            placeholder="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="">
          <Label>SAP</Label>
          <Input
            placeholder="SAPID"
            type="text"
            value={sap}
            onChange={(e) => setSap(e.target.value)}
          />
        </div>

        <div className="">
          <Label>Reason</Label>
          <Input
            placeholder="Reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>
      <CalendarView classes={classes} setSelected={setSelected} />

      <Button
        className="bg-blue-500"
        onClick={() => {
          handleSubmit();
        }}
      >
        Add to attendance
      </Button>
    </div>
  );
};

export default Home;
