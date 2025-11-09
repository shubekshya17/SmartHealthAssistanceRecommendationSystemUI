import {
  MailOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Col, message, Row, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ListHospitalDto } from "../../../ViewModels/HospitalDto";
import type { ListEventDto } from "../../../ViewModels/Event";
import axios from "axios";
import dayjs from "dayjs";

const BASE_URL = import.meta.env.VITE_API_URL;
const dummyDepartments = [
  { departmentId: 1, departmentName: "Cardiology", icon: "❤️" },
  { departmentId: 2, departmentName: "Neurology", icon: "🧠" },
  { departmentId: 3, departmentName: "Orthopedics", icon: "🦴" },
  { departmentId: 4, departmentName: "Pediatrics", icon: "👶" },
  { departmentId: 5, departmentName: "Emergency", icon: "🚑" },
  { departmentId: 6, departmentName: "Surgery", icon: "⚕️" },
  { departmentId: 7, departmentName: "Radiology", icon: "📡" },
  { departmentId: 8, departmentName: "Oncology", icon: "🎗️" },
];

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [hospitalDetails, setHospitalDetails] = useState<ListHospitalDto>();
  const [hospitalEvents, setHospitalEvents] = useState<ListEventDto[]>([]);

  const getPublicHospitalDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Hospitals/GetDetails/${params.id}`
      );
      if (response.status === 200 && response?.data) {
        setHospitalDetails(response.data.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Hospital List."
        );
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  const getHospitalEvents = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/Event/GetEventListByHospitalId/${params.id}`
      );
      if (response.status === 200) {
        setHospitalEvents(response.data.data);
      } else {
        message.error(
          response.data?.message || "Failed to fetch Hospital List."
        );
      }
    } catch (error) {
      message.error("An error occurred while fetching list.");
    }
  };

  useEffect(() => {
    getPublicHospitalDetails();
    getHospitalEvents();
  }, []);

  const getDepartments = () => {
    if (!hospitalDetails?.departmentName) return [];

    return hospitalDetails.departmentName.map((name, index) => {
      const match = dummyDepartments.find(
        (d) => d.departmentName.toLowerCase() === name.toLowerCase()
      );
      return {
        id: index,
        departmentName: name,
        icon: match ? match.icon : "🏥",
      };
    });
  };

  // Get upcoming 2 events
  const getUpcomingEvents = () => {
    return hospitalEvents.slice(0, 2);
  };

  if (!hospitalDetails) return <p>Loading...</p>;

  const departments = getDepartments();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div style={{ padding: 0 }}>
      <div
        style={{
          background:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 300,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "50%",
            transform: "translateX(-50%)",
            width: "calc(100% - 48px)",
            maxWidth: 1200,
          }}
        >
          <Card
            style={{
              borderRadius: 16,
              boxShadow: "0 20px 27px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Avatar src={hospitalDetails.imagePath} size={74} />
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 600,
                      color: "#344767",
                    }}
                  >
                    {hospitalDetails.hospitalName}
                  </h3>
                  <p style={{ margin: 0, color: "#7b809a", fontSize: 14 }}>
                    {hospitalDetails.address}
                  </p>
                </div>
              </div>
              <Space>
                <Button icon={<MailOutlined />}>{hospitalDetails.email}</Button>
                <Button icon={<PhoneOutlined />}>
                  {hospitalDetails.phone}
                </Button>
              </Space>
            </div>
          </Card>
        </div>
      </div>

      <div style={{ marginTop: 100, padding: 24 }}>
        <Row gutter={24}>
          {/* Departments Column */}
          <Col span={8}>
            <Card
              title={
                <span
                  style={{ fontSize: 16, fontWeight: 600, color: "#344767" }}
                >
                  Departments
                </span>
              }
              style={{
                borderRadius: 16,
                boxShadow: "0 20px 27px rgba(0,0,0,0.05)",
                marginBottom: 24,
              }}
            >
              {departments && departments.length > 0 ? (
                <Space direction="vertical" style={{ width: "100%" }} size={16}>
                  {departments.map((dept) => (
                    <div
                      key={dept.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px",
                        background: "#f8f9fa",
                        borderRadius: 8,
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#e9ecef")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#f8f9fa")
                      }
                    >
                      <Space>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background:
                              "linear-gradient(195deg, #49a3f1, #1A73E8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          {dept.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: "#344767" }}>
                            {dept.departmentName}
                          </div>
                          <div style={{ fontSize: 12, color: "#7b809a" }}>
                            Department
                          </div>
                        </div>
                      </Space>
                    </div>
                  ))}
                </Space>
              ) : (
                <p style={{ color: "#7b809a", textAlign: "center" }}>
                  No departments available
                </p>
              )}
            </Card>
          </Col>

          {/* Description Column */}
          <Col span={8}>
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: 16, fontWeight: 600, color: "#344767" }}
                  >
                    Description
                  </span>
                </div>
              }
              style={{
                borderRadius: 16,
                boxShadow: "0 20px 27px rgba(0,0,0,0.05)",
                marginBottom: 24,
              }}
            >
              <p style={{ color: "#7b809a", lineHeight: 1.6 }}>
                {hospitalDetails.description ||
                  "No description available for this hospital."}
              </p>
            </Card>
          </Col>

          {/* Upcoming Events Column */}
          <Col span={8}>
            <Card
              title={
                <span
                  style={{ fontSize: 16, fontWeight: 600, color: "#344767" }}
                >
                  Upcoming Events
                </span>
              }
              style={{
                borderRadius: 16,
                boxShadow: "0 20px 27px rgba(0,0,0,0.05)",
                marginBottom: 24,
              }}
            >
              {upcomingEvents && upcomingEvents.length > 0 ? (
                <Space direction="vertical" style={{ width: "100%" }} size={16}>
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.eventId}
                      style={{
                        padding: "12px",
                        background: "#f8f9fa",
                        borderRadius: 8,
                        borderLeft: "4px solid #5e72e4",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#e9ecef")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#f8f9fa")
                      }
                      onClick={() => navigate(`/events/${event.eventId}`)}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          color: "#344767",
                          marginBottom: 8,
                        }}
                      >
                        {event.eventName}
                      </div>
                      <Space
                        style={{
                          marginBottom: 8,
                          fontSize: 12,
                          color: "#7b809a",
                        }}
                      >
                        <CalendarOutlined />
                        <span>
                          {event.eventDate
                            ? dayjs(event.eventDate).format("YYYY-MM-DD")
                            : "Date TBD"}
                        </span>
                        <ClockCircleOutlined />
                        <span>
                          {event.eventDate
                            ? dayjs(event.eventDate).format("hh:mm:ss")
                            : "Time TBD"}
                        </span>
                      </Space>
                      {event.eventLocation && (
                        <Tag
                          color="blue"
                          style={{
                            fontSize: 11,
                            padding: "2px 8px",
                            borderRadius: 4,
                          }}
                        >
                          {event.eventLocation}
                        </Tag>
                      )}
                    </div>
                  ))}
                </Space>
              ) : (
                <p style={{ color: "#7b809a", textAlign: "center" }}>
                  No upcoming events
                </p>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Profile;
