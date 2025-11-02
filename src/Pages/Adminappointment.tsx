import React, { useState, useEffect } from "react";
import axios from "axios";

interface SlotForm {
  doctorId: string | number;
  hospitalId: string | number;
  shift: string;
  sunStart?: string;
  sunEnd?: string;
  monStart?: string;
  monEnd?: string;
  tueStart?: string;
  tueEnd?: string;
  wedStart?: string;
  wedEnd?: string;
  thuStart?: string;
  thuEnd?: string;
  friStart?: string;
  friEnd?: string;
  satStart?: string;
  satEnd?: string;
  appTimeGap: number;
}

const AdminCreateSlot: React.FC = () => {
  const [form, setForm] = useState<SlotForm>({
    doctorId: "",
    hospitalId: "",
    shift: "Morning",
    appTimeGap: 15,
  });

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalsRes = await fetch(`http://localhost:5102/api/Hospitals/GetAll`);
        const hospitalsData = await hospitalsRes.json();
        setHospitals(hospitalsData);

        const doctorsRes = await fetch(`http://localhost:5102/api/Doctor/GetAll`);
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
      setForm((prev) => ({
        ...prev,
        [`${day.toLowerCase()}Start`]: undefined,
        [`${day.toLowerCase()}End`]: undefined,
      }));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Build payload safely
    const payload: any = {
      ...form,
      appTimeGap: parseInt(String(form.appTimeGap), 10),
    };

    // Convert doctorId and hospitalId only if not empty
    if (form.doctorId !== "") payload.doctorId = parseInt(String(form.doctorId), 10);
    if (form.hospitalId !== "") payload.hospitalId = parseInt(String(form.hospitalId), 10);

    // Fix time format and remove null/empty
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val === "" || val === undefined || val === null) {
        delete payload[key]; // remove null/empty
      } else if (
        typeof val === "string" &&
        (key.toLowerCase().includes("start") || key.toLowerCase().includes("end"))
      ) {
        if (/^\d{2}:\d{2}$/.test(val)) payload[key] = val + ":00";
      }
    });

    console.log("🟡 Sending payload:", payload);

    try {
      const res = await axios.post("http://localhost:5102/api/Appointment/CreateSlot", payload);
      console.log("🟢 API Response:", res.data);
      alert("Slot created successfully!");

      setForm({
        doctorId: "",
        hospitalId: "",
        shift: "Morning",
        appTimeGap: 15,
      });
      setSelectedDays([]);
    } catch (err) {
      console.error("🔴 API Error:", err);
      alert("Error creating slot");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Appointment Slot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hospital Selector */}
        <div>
          <label>Hospital:</label>
          <select
            name="hospitalId"
            value={form.hospitalId}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.hospitalId} value={hospital.hospitalId}>
                {hospital.hospitalName}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Selector */}
        <div>
          <label>Doctor:</label>
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Selector */}
        <div>
          <label>Shift:</label>
          <select
            name="shift"
            value={form.shift}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option>Morning</option>
            <option>Day</option>
            <option>Evening</option>
          </select>
        </div>

        {/* Days Selection */}
        <div>
          <label>Available Days:</label>
          <div className="flex gap-2 flex-wrap">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 border rounded ${
                  selectedDays.includes(day) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Inputs for Selected Days */}
        {selectedDays.map((day) => (
          <div key={day} className="flex gap-4 items-center">
            <label>{day} Start:</label>
            <input
              type="time"
              name={`${day.toLowerCase()}Start`}
              value={(form as any)[`${day.toLowerCase()}Start`] || ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [`${day.toLowerCase()}Start`]: e.target.value }))
              }
              className="border p-1"
              required
            />
            <label>{day} End:</label>
            <input
              type="time"
              name={`${day.toLowerCase()}End`}
              value={(form as any)[`${day.toLowerCase()}End`] || ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, [`${day.toLowerCase()}End`]: e.target.value }))
              }
              className="border p-1"
              required
            />
          </div>
        ))}

        {/* Appointment Time Gap */}
        <div>
          <label>Appointment Time Gap (minutes):</label>
          <input
            type="number"
            name="appTimeGap"
            value={form.appTimeGap}
            onChange={handleInputChange}
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Create Slot
        </button>
      </form>
    </div>
  );
};

export default AdminCreateSlot;
