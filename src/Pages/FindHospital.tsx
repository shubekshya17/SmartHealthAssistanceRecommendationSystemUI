import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Space,
  Button,
  message,
  Layout,
  Tag,
  Row,
  Col,
  Divider,
} from "antd";
import { Loader, MapPin, Navigation } from "lucide-react";
import { Content, Header } from "antd/es/layout/layout";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  StarFilled,
} from "@ant-design/icons";
import AOS from "aos";
import "aos/dist/aos.css";

type Location = {
  lat: number;
  lng: number;
};

type MockHospitalsType = {
  id: number;
  name: string;
  type: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  isOpen: boolean;
  specialties: string[];
  latitude: number;
  longitude: number;
}[];

const mockHospitals = [
  {
    id: 1,
    name: "City General Hospital",
    type: "Hospital",
    address: "123 Main Street, Downtown",
    distance: "0.8 km",
    rating: 4.5,
    phone: "+977-1-4567890",
    isOpen: true,
    specialties: ["Emergency", "Cardiology", "Surgery"],
    latitude: 27.7172,
    longitude: 85.324, // Kathmandu city center
  },
  {
    id: 2,
    name: "Community Health Clinic",
    type: "Clinic",
    address: "456 Oak Avenue, Suburb",
    distance: "1.2 km",
    rating: 4.2,
    phone: "+977-1-4567891",
    isOpen: true,
    specialties: ["General Medicine", "Pediatrics"],
    latitude: 27.7034,
    longitude: 85.3366, // Near Lalitpur
  },
  {
    id: 3,
    name: "Mountain View Health Post",
    type: "Health Post",
    address: "789 Hill Road, Valley",
    distance: "2.1 km",
    rating: 3.9,
    phone: "+977-1-4567892",
    isOpen: false,
    specialties: ["Basic Healthcare", "Vaccination"],
    latitude: 27.7305,
    longitude: 85.3458, // North Kathmandu
  },
];

const { Title, Paragraph, Text } = Typography;

const FindHospitals = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [hospitals, setHospitals] = useState<MockHospitalsType | []>([]);
  console.log("Location", location);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const getTypeColor = (type: any) => {
    switch (type) {
      case "Hospital":
        return "red";
      case "Clinic":
        return "blue";
      case "Health Post":
        return "green";
      default:
        return "default";
    }
  };

  const enableLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLocationEnabled(true);
          setHospitals(mockHospitals);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          alert(
            "Unable to access your location. Please enable location services."
          );
        }
      );
    } else {
      message.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  if (!locationEnabled && !loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <Card
            style={{
              textAlign: "center",
              borderRadius: "16px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <div>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#1890ff",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin
                    style={{ width: "40px", height: "40px", color: "white" }}
                  />
                </div>
                <Title level={2} style={{ marginBottom: "1rem" }}>
                  Find Healthcare Near You
                </Title>
                <Paragraph style={{ fontSize: "16px", color: "#666" }}>
                  Discover hospitals, clinics, and health posts in your area.
                  Get directions, contact information, and real-time
                  availability.
                </Paragraph>
              </div>

              <div>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#fed7aa",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px auto",
                  }}
                >
                  <Navigation
                    style={{ width: "32px", height: "32px", color: "#ea580c" }}
                  />
                </div>
                <Title level={3} style={{ marginBottom: "1rem" }}>
                  Enable Location Access
                </Title>
                <Paragraph style={{ marginBottom: "2rem" }}>
                  Please turn on your location to find hospitals and healthcare
                  facilities near you.
                </Paragraph>
              </div>

              <Button
                type="primary"
                size="large"
                onClick={enableLocation}
                style={{
                  height: "50px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                block
              >
                Turn On Location
              </Button>

              <Paragraph
                type="secondary"
                style={{ fontSize: "12px", margin: 0 }}
              >
                We'll only use your location to show nearby healthcare
                facilities
              </Paragraph>
            </Space>
          </Card>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            textAlign: "center",
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          <Space direction="vertical" size="large">
            <div>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader
                  style={{
                    width: "40px",
                    height: "40px",
                    color: "#2563eb",
                    animation: "spin 1s linear infinite",
                  }}
                />
              </div>
              <Title level={3} style={{ marginBottom: "0.5rem" }}>
                Finding Healthcare Facilities
              </Title>
              <Paragraph type="secondary">
                Locating hospitals and clinics near you...
              </Paragraph>
            </div>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        {/* Header */}
        <Header
          style={{
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(189, 184, 184, 0.06)",
            borderBottom: "1px solid #f0f0f0",
            padding: "0",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 24px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Title level={3} style={{ margin: 0, color: "#262626" }}>
                Healthcare Finder
              </Title>
              <Text
                type="secondary"
                style={{ display: "flex", alignItems: "center", marginTop: 4 }}
              >
                <EnvironmentOutlined style={{ marginRight: 4 }} />
                Kathmandu, Nepal
              </Text>
            </div>
            <div>
              <Tag
                color="success"
                icon={<CheckCircleOutlined />}
                style={{
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Location Enabled
              </Tag>
            </div>
          </div>
        </Header>

        {/* Results Section */}
        <Content style={{ padding: "12px 0" }}>
          <div
            style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}
          >
            <div style={{ marginBottom: 24 }}>
              <Title level={4} style={{ marginBottom: 8, color: "#262626" }}>
                Healthcare Facilities Near You
              </Title>
              <Text type="secondary">
                Found {hospitals.length} facilities within 5km radius
              </Text>
            </div>

            {/* Hospital Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {hospitals.map((hospital) => (
                <Card
                  data-aos="fade-up"
                  key={hospital.id}
                  hoverable
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #f0f0f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  bodyStyle={{ padding: "24px" }}
                >
                  <Row justify="space-between" align="top">
                    <Col flex="auto">
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        {/* Hospital Name and Type */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 8,
                          }}
                        >
                          <Title
                            level={4}
                            style={{ margin: 0, color: "#262626" }}
                          >
                            {hospital.name}
                          </Title>
                          <Tag
                            color={getTypeColor(hospital.type)}
                            style={{
                              borderRadius: "16px",
                              fontSize: "11px",
                              fontWeight: 500,
                              border: `1px solid ${
                                getTypeColor(hospital.type) === "red"
                                  ? "#ffccc7"
                                  : getTypeColor(hospital.type) === "blue"
                                  ? "#bae7ff"
                                  : "#b7eb8f"
                              }`,
                            }}
                          >
                            {hospital.type}
                          </Tag>
                        </div>

                        {/* Address */}
                        <Text
                          type="secondary"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <EnvironmentOutlined style={{ marginRight: 8 }} />
                          {hospital.address}
                        </Text>

                        {/* Distance, Rating, Status */}
                        <Space size="large" style={{ fontSize: "13px" }}>
                          <Text
                            type="secondary"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <CompassOutlined style={{ marginRight: 4 }} />
                            {hospital.distance}
                          </Text>
                          <Text
                            type="secondary"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <StarFilled
                              style={{ marginRight: 4, color: "#faad14" }}
                            />
                            {hospital.rating}
                          </Text>
                          <Text
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: hospital.isOpen ? "#52c41a" : "#ff4d4f",
                            }}
                          >
                            <ClockCircleOutlined style={{ marginRight: 4 }} />
                            {hospital.isOpen ? "Open" : "Closed"}
                          </Text>
                        </Space>
                      </Space>
                    </Col>

                    {/* Action Buttons */}
                    <Col>
                      <Space direction="vertical" size="small">
                        <Button
                          type="primary"
                          size="middle"
                          style={{
                            borderRadius: "6px",
                            fontWeight: 500,
                            minWidth: "120px",
                          }}
                          onClick={() => {
                            if (hospital.latitude && hospital.longitude) {
                              window.open(
                                `https://www.google.com/maps?q=${hospital.latitude},${hospital.longitude}`,
                                "_blank"
                              );
                            } else if (hospital.address) {
                              window.open(
                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                  hospital.address
                                )}`,
                                "_blank"
                              );
                            } else {
                              message.warning(
                                "No location information available"
                              );
                            }
                          }}
                        >
                          Get Directions
                        </Button>
                        <Button
                          size="middle"
                          icon={<PhoneOutlined />}
                          style={{
                            borderRadius: "6px",
                            fontWeight: 500,
                            minWidth: "120px",
                          }}
                          onClick={() => {
                            navigator.clipboard
                              .writeText(hospital.phone)
                              .then(() =>
                                message.success(
                                  "Phone number copied to clipboard!"
                                )
                              )
                              .catch(() =>
                                message.error("Failed to copy number")
                              );
                          }}
                        >
                          Call
                        </Button>
                      </Space>
                    </Col>
                  </Row>

                  <Divider style={{ margin: "16px 0" }} />

                  {/* Specialties */}
                  <div>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "13px",
                        marginBottom: 8,
                        display: "block",
                      }}
                    >
                      Specialties:
                    </Text>
                    <Space wrap size={[8, 8]}>
                      {hospital.specialties?.map((specialty, index) => (
                        <Tag
                          key={index}
                          style={{
                            backgroundColor: "#f5f5f5",
                            color: "#595959",
                            border: "none",
                            borderRadius: "16px",
                            fontSize: "11px",
                            padding: "2px 8px",
                          }}
                        >
                          {specialty}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default FindHospitals;
