"use client";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import CalendarView from "@/components/Calendar";
import { classes } from "../../timetable.js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api.js";
import { Toaster, toast } from "sonner";

const Home = () => {
  const [name, setName] = useState("Priyansh");
  const [sap, setSap] = useState("60003220151");
  const [selected, setSelected] = useState([]);

  const [reason, setReason] = useState("membership drive");
  console.log(selected);
  const createClass = useMutation(api.item.createItem);
  const handleSubmit = async () => {
    const faculty = {
      VS: "Dr. Vinaya Sawant",
      ARJ: "Dr. A. R. Joshi",
      RM: "Dr. Ramchandra Mangrulkar",
      MM: "Dr. Monika Mangla",
      NK: "Ms. Neha Katre",
      HD: "Mr. Harshal Dalvi",
      AJ: "Mr. Arjun Jaiswal",
      SC: "Ms. Stevina Correia",
      PS: "Ms. Prachi Satam",
      RS: "Ms. Richa Sharma",
      SM: "Ms. Sweedle Machado",
      AP: "Ms. Anushree Patkar",
      NA: "Ms. Neha Agarwal",
      SSP: "Ms. Savyasacchi Pandit",
      SP: "Ms. Sharvari Patil",
      V: "Mr. Vishal Shah",
      KT: "Dr. Khushbu Trehaan",
      SR: "Ms. Smita Rane",
      RP: "Mr. Ranjeet Puyed",
      B: "Ms. Bindi",
    };

    selected.map((item) => {
      item.faculty = faculty[item.faculty];
    });

    const createClassesPromise = Promise.all(
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
    toast.promise(createClassesPromise, {
      loading: "Adding to attendance",
      success: "Added to attendance",
      error: "Error in adding to attendance",
    });
    createClassesPromise.then((results) => {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Toaster position="bottom-center" richColors />

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
