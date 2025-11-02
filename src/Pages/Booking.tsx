import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams,Link } from "react-router-dom";

interface Hospital {
  hospitalId: number;
  hospitalName: string;
}

interface Doctor {
  doctorId: number;
  fullName: string;
  specialization: string;
  hospitalId: number;
  departmentId: number;
}

interface Slot {
  id: number;
  doctorId: number;
  hospitalId: number;
  shift: string;
  sunStart: string | null;
  sunEnd: string | null;
  monStart: string | null;
  monEnd: string | null;
  tueStart: string | null;
  tueEnd: string | null;
  wedStart: string | null;
  wedEnd: string | null;
  thuStart: string | null;
  thuEnd: string | null;
  friStart: string | null;
  friEnd: string | null;
  satStart: string | null;
  satEnd: string | null;
  appTimeGap: number;
}

interface BookedSlot {
  doctorId: number;
  hospitalId: number;
  date: string;
  startTime: string;
  endTime: string;
  isConfirmed: boolean;
}

interface Department {
  departmentId : number;
  departmentName: string;
}

export default function Booking() {
  const params = useParams();

  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
   // Fetch hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch(
          "http://localhost:5102/api/Hospitals/GetHospitalDropdown"
        );
        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      }
    };
    fetchHospitals();
  }, [params.id]);
  useEffect(() => {
    if (params.id) {
      const match = hospitals.find(
        (h: any) => h.hospitalId === parseInt(params.id!)
      );
      if (match) {
        setSelectedHospital(match.hospitalId);
      } 
    }
  }, [hospitals, params.id]);

  //Departments OR Specialities
  const [filteredSpecialities, setFilteredSpecialities] = useState<Department[]>([]);
  useEffect(() => {
    if(!selectedHospital) return;
    const fetchSpecialities = async () => {
      try {
        const res = await fetch(
          `http://localhost:5102/api/Department/GetDepartmentByHospitalId/${selectedHospital}`
        );
        const data = await res.json();
        setFilteredSpecialities(data);
      } catch (err) {
        console.error("Error fetching specialities:", err);
      }
    };
    fetchSpecialities();
  }, [selectedHospital]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Doctors
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  
  const [step, setStep] = useState(1);
  // Slots
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Patient info
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");

 

  // Fetch doctors when hospital changes
  useEffect(() => {
    if (!selectedHospital) return;
    fetch(`http://localhost:5102/api/Doctor/GetAll`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
      })
      .catch(console.error);
  }, [selectedHospital]);

  // Filter doctors by specialty
  useEffect(() => {
    if (selectedSpecialty === "all") setFilteredDoctors(doctors);
    else
      setFilteredDoctors(
        doctors.filter((d) => d.departmentId === Number(selectedSpecialty))
      );
    setSelectedDoctor(null);
  }, [selectedSpecialty, doctors]);

  // Fetch slots for selected doctor
  useEffect(() => {
    if (!selectedDoctor || !selectedHospital) return;
    const dateStr = selectedDate.toISOString().split("T")[0];
    fetch(
      `http://localhost:5102/api/Appointment/GetSlots?hospitalId=${selectedHospital}&doctorId=${selectedDoctor}`
      // http://localhost:5102/api/Appointment/GetSlots?hospitalId=1&doctorId=1
    )
      .then((res) => res.json())
      .then((data) => {
        // Set the slots and log data
        setSlots(data); // Set the fetched data to your state (if using React)
        console.log(data); // Log the data to the console
      })
      .catch(console.error);

    // Fetch booked slots
    fetch(
      `http://localhost:5102/api/Appointment/GetBookedSlots?hospitalId=${selectedHospital}&doctorId=${selectedDoctor}&date=${dateStr}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Set the slots and log data
        setBookedSlots(data); // Set the fetched data to your state (if using React)
        console.log(data);
      })

      .catch(console.error);
  }, [selectedDoctor, selectedHospital, selectedDate]);

  // Generate available times for selected date
  const getAvailableTimes = () => {
    if (!slots.length || !selectedDate) return [];

    const dayOfWeek = selectedDate
      .toLocaleDateString("en-US", { weekday: "short" })
      .toLowerCase();

    const slotTimes: string[] = [];

    slots.forEach((slot) => {
      const startKey = `${dayOfWeek}Start` as keyof Slot;
      const endKey = `${dayOfWeek}End` as keyof Slot;
      const start = slot[startKey];
      const end = slot[endKey];
      if (!start || !end) return;

      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);

      let time = new Date(selectedDate);
      time.setHours(sh, sm, 0, 0);

      const endTime = new Date(selectedDate);
      endTime.setHours(eh, em, 0, 0);

      while (time < endTime) {
        const displayTime = time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        const dateStr = selectedDate.toISOString().split("T")[0];
        const currentH = time.getHours();
        const currentM = time.getMinutes();

        const isBooked = bookedSlots.some((b) => {
          const bookedDate = b.date.split("T")[0];
          const [bh, bm] = b.startTime.split(":").map(Number);
          return (
            b.doctorId === selectedDoctor &&
            b.hospitalId === selectedHospital &&
            bookedDate === dateStr &&
            bh === currentH &&
            bm === currentM &&
            b.isConfirmed === true
          );
        });

        slotTimes.push(isBooked ? `booked-${displayTime}` : displayTime);
        time.setMinutes(time.getMinutes() + slot.appTimeGap);
      }
    });

    return slotTimes;
  };

  const handleConfirm = async () => {
    if (
      !selectedDoctor ||
      !selectedHospital ||
      !selectedDate ||
      !selectedTime
    ) {
      alert("Please select all details before confirming.");
      return;
    }

    // Format date correctly
    const dateStr = selectedDate.toISOString().split("T")[0]; // e.g. "2025-11-01"

    // Convert "12:00 PM" → "12:00:00"
    // Converts "12:00 PM" or "3:15 AM" → "12:00:00" or "03:15:00"
    const parseTime = (time12h: string) => {
      const [time, modifier] = time12h.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const h = hours.toString().padStart(2, "0");
      const m = minutes.toString().padStart(2, "0");
      return `${h}:${m}:00`;
    };

    const startTime = parseTime(selectedTime);
    const endTime = parseTime(selectedTime); // You can later add logic for duration if needed

    console.log("🟡 Sending to backend:", {
      doctorId: selectedDoctor,
      hospitalId: selectedHospital,
      date: dateStr,
      startTime,
      endTime,
    });

    try {
      // BookSlot API
      const res1 = await fetch(
        "http://localhost:5102/api/Appointment/BookSlot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId: selectedDoctor,
            hospitalId: selectedHospital,
            date: dateStr,
            startTime,
            endTime,
            isConfirmed: true,
            reservedAt: new Date().toISOString(),
          }),
        }
      );

      if (!res1.ok) {
        const err = await res1.text();
        console.error("🔴 BookSlot error:", err);
        alert("Error booking slot: " + err);
        return;
      }

      // SaveAppointment API
      const res2 = await fetch(
        "http://localhost:5102/api/Appointment/SaveAppointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId: selectedDoctor,
            hospitalId: selectedHospital,
            date: dateStr,
            startTime,
            endTime,
            patientName,
            patientEmail,
            patientPhone,
            symptoms,
            createdAt: new Date().toISOString(),
          }),
        }
      );

      if (!res2.ok) {
        const err = await res2.text();
        console.error("🔴 SaveAppointment error:", err);
        alert("Error saving appointment: " + err);
        return;
      }

      alert("✅ Appointment booked successfully!");
    } catch (error) {
      console.error("🔴 API Error:", error);
      alert("Error creating appointment");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href={`/hospital/${selectedHospital}`}>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#69b3b4",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ← Back
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Progress bar (keep original UI) */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            {[1, 2, 3, 4].map((num) => (
              <div key={num} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: step >= num ? "#69b3b4" : "#d1d5db",
                    color: step >= num ? "white" : "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px auto",
                    fontWeight: "bold",
                  }}
                >
                  {step > num ? "✓" : num}
                </div>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  {["Doctor", "Time", "Details", "Confirm"][num - 1]}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                height: "100%",
                backgroundColor: "#69b3b4",
                borderRadius: "4px",
                width: `${(step / 4) * 100}%`,
                transition: "width 0.3s",
              }}
            ></div>
          </div>
        </div>

        {/* Step 1: Select Hospital & Doctor */}
        {step === 1 && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Select Hospital & Doctor
            </h2>

            {/* Hospital dropdown */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                Select Hospital
              </label>
              <select
                value={selectedHospital?.toString()}
                disabled={!!selectedHospital}
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "white",
                  cursor: selectedHospital ? "not-allowed" : "pointer",
                }}
              >
                <option value="">Select Hospital</option>
                {hospitals.map((h) => (
                  <option key={h.hospitalId} value={h.hospitalId}>
                    {h.hospitalName}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty dropdown */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                Filter by Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "white",
                }}
              >
                <option value="">Select Department</option>
                {filteredSpecialities.map((s) => (
                  <option key={s.departmentId} value={s.departmentId}>
                    {s.departmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctors */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {filteredDoctors.map((d) => (
                <div
                  key={d.doctorId}
                  onClick={() => setSelectedDoctor(d.doctorId)}
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    border:
                      selectedDoctor === d.doctorId
                        ? "2px solid #69b3b4"
                        : "2px solid #e5e7eb",
                    backgroundColor:
                      selectedDoctor === d.doctorId ? "#eff6ff" : "white",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ fontWeight: 600, margin: 0 }}>{d.fullName}</h3>
                  <p style={{ color: "#6b7280", margin: 0 }}>
                    {d.specialization}
                  </p>
                </div>
              ))}
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: selectedDoctor ? "#69b3b4" : "#9ca3af",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: selectedDoctor ? "pointer" : "not-allowed",
              }}
              disabled={!selectedDoctor}
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Select Date & Time
            </h2>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "8px" }}>
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Time slots */}
            {/* Time slots */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {getAvailableTimes().map((time) => {
                const isBooked =
                  time.includes("booked-") ||
                  bookedSlots.some(
                    (b) =>
                      b.doctorId === selectedDoctor &&
                      b.hospitalId === selectedHospital &&
                      new Date(b.date).toISOString().split("T")[0] ===
                        selectedDate.toISOString().split("T")[0] &&
                      b.startTime.startsWith(time.split(":")[0]) &&
                      b.isConfirmed === true
                  );

                const displayTime = time.replace("booked-", "");

                return (
                  <div
                    key={time}
                    onClick={() => !isBooked && setSelectedTime(displayTime)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border:
                        selectedTime === displayTime
                          ? "2px solid #69b3b4"
                          : "1px solid #d1d5db",
                      backgroundColor: isBooked
                        ? "#f87171"
                        : selectedTime === displayTime
                        ? "#eff6ff"
                        : "white",
                      color: isBooked ? "white" : "black",
                      cursor: isBooked ? "not-allowed" : "pointer",
                    }}
                  >
                    {displayTime}
                  </div>
                );
              })}
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: selectedTime ? "#69b3b4" : "#9ca3af",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: selectedTime ? "pointer" : "not-allowed",
              }}
              disabled={!selectedTime}
              onClick={() => setStep(3)}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Patient Details */}
        {step === 3 && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Patient Details
            </h2>
            <input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <input
              type="text"
              placeholder="Patient Phone"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <input
              type="email"
              placeholder="Patient Email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />
            <textarea
              placeholder="Symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "24px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
              }}
            />

            <button
              style={{
                width: "100%",
                backgroundColor:
                  patientName && patientPhone && patientEmail
                    ? "#69b3b4"
                    : "#9ca3af",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor:
                  patientName && patientPhone && patientEmail
                    ? "pointer"
                    : "not-allowed",
              }}
              disabled={!patientName || !patientPhone || !patientEmail}
              onClick={() => setStep(4)}
            >
              Confirm
            </button>
          </div>
        )}
        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 8px 0",
              }}
            >
              Confirm Appointment
            </h2>
            <p style={{ color: "#6b7280", margin: "0 0 24px 0" }}>
              Review your details
            </p>

            <div
              style={{
                backgroundColor: "#f3f4f6",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "24px",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <strong>Doctor:</strong>{" "}
                {doctors.find((d) => d.doctorId === selectedDoctor)?.fullName}
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Date:</strong>{" "}
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Time:</strong> {selectedTime}
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong>Patient:</strong> {patientName}
              </div>
              <div>
                <strong>Contact:</strong> {patientPhone} | {patientEmail}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  flex: 1,
                  border: "1px solid #d1d5db",
                  backgroundColor: "white",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => setStep(3)}
              >
                Back
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={handleConfirm}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
