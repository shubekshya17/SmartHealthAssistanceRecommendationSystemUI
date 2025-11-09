import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  const params = useParams();
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
    if (params.id && hospitals.length > 0) {
      setForm((prev) => ({
        ...prev,
        hospitalId: String(params.id),
      }));
    }
  }, [params.id, hospitals]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(
          `http://localhost:5102/api/Hospitals/GetHospitalDropdown`
        );
        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      }
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!form.hospitalId) return;
      try {
        const res = await fetch(
          `http://localhost:5102/api/Doctor/GetDoctorByHospitalId/${form.hospitalId}`
        );
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, [form.hospitalId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    if (form.doctorId !== "")
      payload.doctorId = parseInt(String(form.doctorId), 10);
    if (form.hospitalId !== "")
      payload.hospitalId = parseInt(String(form.hospitalId), 10);

    // Fix time format and remove null/empty
    Object.keys(payload).forEach((key) => {
      const val = payload[key];
      if (val === "" || val === undefined || val === null) {
        delete payload[key]; // remove null/empty
      } else if (
        typeof val === "string" &&
        (key.toLowerCase().includes("start") ||
          key.toLowerCase().includes("end"))
      ) {
        if (/^\d{2}:\d{2}$/.test(val)) payload[key] = val + ":00";
      }
    });
    console.log("🟡 Sending payload:", payload);

    try {
      const res = await axios.post(
        "http://localhost:5102/api/Appointment/CreateSlot",
        payload
      );
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Appointment Slot
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Hospital Selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Hospital
          </label>
          <select
            name="hospitalId"
            value={form.hospitalId}
            onChange={handleInputChange}
            disabled={!!params.id}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Shift
          </label>
          <select
            name="shift"
            value={form.shift}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          >
            <option>Morning</option>
            <option>Day</option>
            <option>Evening</option>
          </select>
        </div>

        {/* Days Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Available Days
          </label>
          <div className="flex gap-2 flex-wrap">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1.5 border-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Inputs for Selected Days */}
        <div className="space-y-3">
          {selectedDays.map((day) => (
            <div key={day} className="bg-gray-50 p-3 rounded-lg space-y-2">
              <h3 className="font-medium text-gray-800 text-sm">
                {day} Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name={`${day.toLowerCase()}Start`}
                    value={(form as any)[`${day.toLowerCase()}Start`] || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [`${day.toLowerCase()}Start`]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-600">
                    End Time
                  </label>
                  <input
                    type="time"
                    name={`${day.toLowerCase()}End`}
                    value={(form as any)[`${day.toLowerCase()}End`] || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [`${day.toLowerCase()}End`]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointment Time Gap */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Appointment Time Gap (minutes)
          </label>
          <input
            type="number"
            name="appTimeGap"
            value={form.appTimeGap}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
            min="5"
            max="60"
            step="5"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-200 transition-all duration-200 shadow-sm text-sm"
          >
            Create Slot
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateSlot;
