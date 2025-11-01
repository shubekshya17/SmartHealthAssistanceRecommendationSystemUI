import { useState } from "react";
import { Link } from "wouter";

export default function DashboardDoctor() {
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    hospital: "City General Hospital",
    email: "sarah.johnson@hospital.com",
    phone: "+1 234-567-8900",
    rating: 4.9,
    reviewCount: 128,
    experience: 15,
  };

  const stats = [
    { label: "Today's Appointments", value: "8", icon: "📅", color: "#3B82F6" },
    { label: "Total Patients", value: "245", icon: "👥", color: "#8B5CF6" },
    { label: "Average Rating", value: "4.9", icon: "⭐", color: "#F59E0B" },
    { label: "Consultation Fee", value: "$150", icon: "💰", color: "#10B981" },
  ];

  const todayAppointments = [
    {
      id: "1",
      patient: "John Doe",
      time: "10:00 AM",
      type: "Follow-up",
      status: "confirmed",
      symptoms: "Chest pain follow-up",
    },
    {
      id: "2",
      patient: "Jane Smith",
      time: "11:30 AM",
      type: "New Consultation",
      status: "confirmed",
      symptoms: "Heart palpitations",
    },
    {
      id: "3",
      patient: "Robert Brown",
      time: "2:30 PM",
      type: "Check-up",
      status: "pending",
      symptoms: "Routine cardiac check",
    },
  ];

  const upcomingAppointments = [
    {
      id: "4",
      patient: "Mary Wilson",
      date: "Jan 29, 2025",
      time: "9:00 AM",
      type: "New Consultation",
    },
    {
      id: "5",
      patient: "David Lee",
      date: "Jan 30, 2025",
      time: "3:00 PM",
      type: "Follow-up",
    },
  ];

  const [activeTab, setActiveTab] = useState("today");

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#F8FAFC",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: "white", 
        borderBottom: "1px solid #E2E8F0",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: "0 20px",
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          height: "70px"
        }}>
          <Link href="/">
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              cursor: "pointer"
            }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#3B82F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px"
              }}>
                ❤️
              </div>
              <span style={{ 
                fontSize: "22px", 
                fontWeight: "700",
                color: "#1E293B"
              }}>HealthConnect</span>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#F0FDF4",
              color: "#166534",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "500",
              border: "1px solid #BBF7D0"
            }}>
              <div style={{ width: "6px", height: "6px", backgroundColor: "#22C55E", borderRadius: "50%" }}></div>
              Online
            </div>
            <button style={{
              background: "none",
              border: "none",
              padding: "8px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: "#F8FAFC"
            }}>
              <span style={{ fontSize: "18px" }}>⚙️</span>
            </button>
            <Link href="/login/doctor">
              <button style={{
                backgroundColor: "#F8FAFC",
                color: "#64748B",
                border: "1px solid #E2E8F0",
                padding: "8px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: "500"
              }}>
                <span style={{ fontSize: "16px" }}>🚪</span>
                Logout
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>
        {/* Doctor Profile */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "32px",
          marginBottom: "32px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              backgroundColor: "#3B82F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "white"
            }}>
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                margin: "0 0 8px 0",
                color: "#1E293B"
              }}>
                {doctor.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
                <span style={{
                  backgroundColor: "#EFF6FF",
                  color: "#1D4ED8",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "500"
                }}>
                  {doctor.specialty}
                </span>
                <span style={{ color: "#64748B" }}>•</span>
                <span style={{ color: "#475569", fontWeight: "500" }}>{doctor.hospital}</span>
                <span style={{ color: "#64748B" }}>•</span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#F59E0B", fontWeight: "500" }}>
                  ⭐ {doctor.rating} <span style={{ color: "#64748B" }}>({doctor.reviewCount} reviews)</span>
                </span>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px"
                  }}>
                    📧
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#64748B" }}>Email</div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E293B" }}>{doctor.email}</div>
                  </div>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px"
                  }}>
                    📞
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#64748B" }}>Phone</div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E293B" }}>{doctor.phone}</div>
                  </div>
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#FFFBEB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px"
                  }}>
                    🏆
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", color: "#64748B" }}>Experience</div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: "#1E293B" }}>{doctor.experience} years</div>
                  </div>
                </div>
              </div>
            </div>
            <button style={{
              backgroundColor: "#3B82F6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              height: "fit-content"
            }}>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
          gap: "20px", 
          marginBottom: "32px" 
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  backgroundColor: stat.color + "15",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#1E293B" }}>{stat.value}</div>
                  <div style={{ fontSize: "14px", color: "#64748B" }}>{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px" }}>
          <div>
            {/* Tabs */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                display: "inline-flex",
                backgroundColor: "#F1F5F9",
                borderRadius: "10px",
                padding: "4px",
                gap: "4px"
              }}>
                {[
                  { id: "today", label: "Today's Schedule", icon: "📅" },
                  { id: "upcoming", label: "Upcoming", icon: "📆" },
                  { id: "patients", label: "Patient Records", icon: "👥" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    style={{
                      padding: "10px 20px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: activeTab === tab.id ? "white" : "transparent",
                      color: activeTab === tab.id ? "#3B82F6" : "#64748B",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none"
                    }}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            {activeTab === "today" && (
              <div style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
              }}>
                <div style={{ 
                  padding: "24px", 
                  borderBottom: "1px solid #E2E8F0"
                }}>
                  <h2 style={{ 
                    fontSize: "20px", 
                    fontWeight: "600", 
                    margin: "0 0 4px 0",
                    color: "#1E293B"
                  }}>
                    Today's Appointments
                  </h2>
                  <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
                    {todayAppointments.length} appointments scheduled for today
                  </p>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {todayAppointments.map((apt) => (
                      <div key={apt.id} style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        border: "1px solid #E2E8F0",
                        padding: "20px",
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start"
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#1E293B" }}>{apt.patient}</h3>
                            <span style={{
                              padding: "4px 8px",
                              borderRadius: "12px",
                              fontSize: "12px",
                              fontWeight: "500",
                              backgroundColor: apt.status === "confirmed" ? "#DCFCE7" : "#FEF3C7",
                              color: apt.status === "confirmed" ? "#166534" : "#92400E"
                            }}>
                              {apt.status}
                            </span>
                          </div>
                          <p style={{ color: "#64748B", margin: "0 0 12px 0", fontSize: "14px" }}>{apt.type}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748B", fontSize: "14px", marginBottom: "8px" }}>
                            <span>🕒</span>
                            <span style={{ fontWeight: "500", color: "#3B82F6" }}>{apt.time}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#64748B" }}>
                            <span>📝</span>
                            <span>{apt.symptoms}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "140px" }}>
                          <button style={{
                            backgroundColor: "#3B82F6",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500"
                          }}>
                            Start Consultation
                          </button>
                          <button style={{
                            border: "1px solid #E2E8F0",
                            backgroundColor: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontWeight: "500"
                          }}>
                            <span>👤</span>
                            View Patient
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Appointments */}
            {activeTab === "upcoming" && (
              <div style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
              }}>
                <div style={{ 
                  padding: "24px", 
                  borderBottom: "1px solid #E2E8F0"
                }}>
                  <h2 style={{ 
                    fontSize: "20px", 
                    fontWeight: "600", 
                    margin: "0 0 4px 0",
                    color: "#1E293B"
                  }}>
                    Upcoming Appointments
                  </h2>
                  <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>Future scheduled appointments</p>
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {upcomingAppointments.map((apt) => (
                      <div key={apt.id} style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        backgroundColor: "white"
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0", color: "#1E293B" }}>{apt.patient}</h3>
                          <p style={{ color: "#64748B", margin: "0 0 8px 0", fontSize: "14px" }}>{apt.type}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "14px", color: "#64748B" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <span>📅</span>
                              <span>{apt.date}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                              <span>🕒</span>
                              <span>{apt.time}</span>
                            </div>
                          </div>
                        </div>
                        <button style={{
                          border: "1px solid #E2E8F0",
                          backgroundColor: "white",
                          padding: "8px 16px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "500"
                        }}>
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Patient Records */}
            {activeTab === "patients" && (
              <div style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
              }}>
                <div style={{ 
                  padding: "24px", 
                  borderBottom: "1px solid #E2E8F0"
                }}>
                  <h2 style={{ 
                    fontSize: "20px", 
                    fontWeight: "600", 
                    margin: "0 0 4px 0",
                    color: "#1E293B"
                  }}>
                    Patient Records
                  </h2>
                  <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>Access and manage patient information</p>
                </div>
                <div style={{ padding: "32px", textAlign: "center" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>👥</div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", margin: "0 0 8px 0", color: "#1E293B" }}>Patient Records</h3>
                  <p style={{ color: "#64748B", margin: "0 0 24px 0", fontSize: "14px" }}>
                    View detailed medical histories and treatment records
                  </p>
                  <button style={{
                    backgroundColor: "#3B82F6",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    Search Patient Records
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick Actions */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              marginBottom: "24px"
            }}>
              <div style={{ 
                padding: "20px", 
                borderBottom: "1px solid #E2E8F0"
              }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: "#1E293B" }}>Quick Actions</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <button style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: "16px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#EFF6FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      📅
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Schedule</span>
                  </button>
                  
                  <button style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: "16px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      💊
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Prescriptions</span>
                  </button>
                  
                  <button style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: "16px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#FFFBEB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      📊
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Reports</span>
                  </button>
                  
                  <button style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: "16px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#F0FDF4",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px"
                    }}>
                      👥
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>Patients</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
            }}>
              <div style={{ 
                padding: "20px", 
                borderBottom: "1px solid #E2E8F0"
              }}>
                <h3 style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  margin: 0, 
                  color: "#1E293B"
                }}>
                  Notifications
                </h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#FFFBEB",
                    border: "1px solid #FEF3C7"
                  }}>
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#F59E0B",
                      marginTop: "6px",
                      flexShrink: 0
                    }}></div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 2px 0", color: "#92400E" }}>Lab results ready</p>
                      <p style={{ fontSize: "12px", color: "#92400E", margin: 0 }}>John Doe's blood work is available</p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#EFF6FF",
                    border: "1px solid #DBEAFE"
                  }}>
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#3B82F6",
                      marginTop: "6px",
                      flexShrink: 0
                    }}></div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 2px 0", color: "#1E40AF" }}>New message</p>
                      <p style={{ fontSize: "12px", color: "#1E40AF", margin: 0 }}>From patient Jane Smith</p>
                    </div>
                  </div>
                  
                  <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#F0FDF4",
                    border: "1px solid #DCFCE7"
                  }}>
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#22C55E",
                      marginTop: "6px",
                      flexShrink: 0
                    }}></div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 2px 0", color: "#166534" }}>Appointment reminder</p>
                      <p style={{ fontSize: "12px", color: "#166534", margin: 0 }}>Robert Brown at 2:30 PM today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}