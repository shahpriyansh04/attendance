"use client";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import CalendarView from "@/components/Calendar";
import { I2 } from "../../TimetableI2.js";
import { I1 } from "../../TimetableI1.js";
import { I3 } from "../../TimetableI3.js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api.js";
import { Toaster, toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home = () => {
  const [name, setName] = useState("");
  const [sap, setSap] = useState("");
  const [selected, setSelected] = useState([]);
  const [reason, setReason] = useState("");
  const [division, setDivision] = useState("I2"); // Default value for division
  console.log(division);

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
      RP: "Mr. Ranjeet Puyed",
      API: "Ms. Aprajita Philips",
      SR: "Ms. Smita Rane",
      VI: "Visiting faculty",
      SV: "Dr. Satish Verma",
      MS: "Ms. Monali Sankhe",
      PG: "Ms. Priyanca Gonsalves",
      PH: "Mr. Pravin Hole",
      LS: "Ms. Leena Sahu",
      CB: "Mr. Chandrashekhar Badjugar",
      B: "Ms. Bindi",
      Other: "Other",
    };

    selected.map((item) => {
      //@ts-ignore
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
          division: division,
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

        <div>
          <Label>Division</Label>
          <Select
            value={division}
            onValueChange={(value) => {
              setSelected([]);
              setDivision(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="I1">I1</SelectItem>
              <SelectItem value="I2">I2</SelectItem>
              <SelectItem value="I3">I3</SelectItem>
            </SelectContent>
          </Select>
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
      {division === "I1" && (
        <CalendarView classes={I1} setSelected={setSelected} />
      )}
      {division === "I2" && (
        <CalendarView classes={I2} setSelected={setSelected} />
      )}
      {division === "I3" && (
        <CalendarView classes={I3} setSelected={setSelected} />
      )}

      <Button
        className="bg-blue-500"
        onClick={() => {
          if (
            name.length > 0 &&
            sap.length > 0 &&
            selected.length > 0 &&
            reason.length > 0
          )
            handleSubmit();
        }}
      >
        Add to attendance
      </Button>
    </div>
  );
};

export default Home;
