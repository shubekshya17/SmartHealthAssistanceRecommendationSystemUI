import { useState } from "react";
import { Link, useParams } from "wouter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingTemp() {
  const params = useParams();
  const { hospitalId } = params;
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Simple data
  const hospital = { name: "City Hospital", address: "123 Main St" };

  const specialties = [
    "All Specialties",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
    "Dermatologist",
    "General Physician",
  ];

  const doctors = [
    { id: "1", name: "Dr. John Smith", specialty: "Cardiologist" },
    { id: "2", name: "Dr. Sarah Wilson", specialty: "Neurologist" },
    { id: "3", name: "Dr. Mike Johnson", specialty: "Pediatrician" },
    { id: "4", name: "Dr. Emily Brown", specialty: "Cardiologist" },
    { id: "5", name: "Dr. David Lee", specialty: "Orthopedic" },
  ];

  // Filter doctors based on selected specialty
  const filteredDoctors =
    selectedSpecialty === "all"
      ? doctors
      : doctors.filter((doctor) => doctor.specialty === selectedSpecialty);

  const handleConfirm = () => {
    alert("Appointment booked!");
    window.location.href = "/";
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
          <Link href={`/hospital/${hospitalId}`}>
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
        {/* Progress */}
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

        {/* Hospital Info */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "16px",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ fontWeight: "600", margin: "0 0 4px 0" }}>
            {hospital.name}
          </h3>
          <p style={{ color: "#6b7280", margin: 0, fontSize: "14px" }}>
            {hospital.address}
          </p>
        </div>

        {/* Step 1: Select Doctor */}
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
                margin: "0 0 8px 0",
              }}
            >
              Select a Doctor
            </h2>
            <p style={{ color: "#6b7280", margin: "0 0 24px 0" }}>
              Choose your doctor
            </p>

            {/* Specialty Filter Dropdown */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                Filter by Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => {
                  setSelectedSpecialty(e.target.value);
                  setSelectedDoctor(""); // Clear selected doctor when specialty changes
                }}
                style={{
                  width: "100%",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "white",
                }}
              >
                {specialties.map((specialty) => (
                  <option
                    key={specialty}
                    value={specialty === "All Specialties" ? "all" : specialty}
                  >
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctors List */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {filteredDoctors.length === 0 ? (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p style={{ color: "#6b7280", margin: 0 }}>
                    No doctors found for the selected specialty.
                  </p>
                </div>
              ) : (
                filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    style={{
                      padding: "16px",
                      borderRadius: "8px",
                      border:
                        selectedDoctor === doctor.id
                          ? "2px solid #69b3b4"
                          : "2px solid #e5e7eb",
                      backgroundColor:
                        selectedDoctor === doctor.id ? "#eff6ff" : "white",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          backgroundColor: "#dbeafe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: "#1e40af",
                        }}
                      >
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontWeight: "600", margin: "0 0 4px 0" }}>
                          {doctor.name}
                        </h3>
                        <p style={{ color: "#6b7280", margin: 0 }}>
                          {doctor.specialty}
                        </p>
                      </div>
                      <div
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#f3f4f6",
                          borderRadius: "4px",
                          fontSize: "12px",
                          color: "#6b7280",
                        }}
                      >
                        {doctor.specialty}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: selectedDoctor ? "#69b3b4" : "#9ca3af",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: selectedDoctor ? "pointer" : "not-allowed",
              }}
              disabled={!selectedDoctor}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Choose Time */}
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
                margin: "0 0 8px 0",
              }}
            >
              Choose Date & Time
            </h2>
            <p style={{ color: "#6b7280", margin: "0 0 24px 0" }}>
              Select your appointment slot
            </p>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                Select Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="date-picker-custom"
                wrapperClassName="date-picker-wrapper"
              />

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  marginTop: "16px",
                }}
              >
                Available Time Slots
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                {[
                  "09:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "02:00 PM",
                  "03:00 PM",
                  "04:00 PM",
                ].map((time) => (
                  <button
                    key={time}
                    style={{
                      padding: "8px",
                      border:
                        selectedTime === time
                          ? "2px solid #69b3b4"
                          : "1px solid #d1d5db",
                      backgroundColor:
                        selectedTime === time ? "#eff6ff" : "white",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
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
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor:
                    selectedDate && selectedTime ? "#69b3b4" : "#9ca3af",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor:
                    selectedDate && selectedTime ? "pointer" : "not-allowed",
                }}
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Rest of the code remains the same */}
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
                margin: "0 0 8px 0",
              }}
            >
              Patient Details
            </h2>
            <p style={{ color: "#6b7280", margin: "0 0 24px 0" }}>
              Enter your information
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "500",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 12px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "500",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+1 234-567-8900"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 12px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "500",
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 12px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "4px",
                    fontWeight: "500",
                  }}
                >
                  Symptoms
                </label>
                <textarea
                  placeholder="Describe your symptoms..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    resize: "vertical",
                  }}
                />
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
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor:
                    patientName && patientPhone && patientEmail
                      ? "#69b3b4"
                      : "#9ca3af",
                  color: "white",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  cursor:
                    patientName && patientPhone && patientEmail
                      ? "pointer"
                      : "not-allowed",
                }}
                disabled={!patientName || !patientPhone || !patientEmail}
                onClick={() => setStep(4)}
              >
                Continue
              </button>
            </div>
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
                {doctors.find((d) => d.id === selectedDoctor)?.name}
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

      <style>
        {`
          .date-picker-custom {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
          }
          .date-picker-wrapper {
            width: 100%;
            margin-bottom: 16px;
          }
        `}
      </style>
    </div>
  );
}
