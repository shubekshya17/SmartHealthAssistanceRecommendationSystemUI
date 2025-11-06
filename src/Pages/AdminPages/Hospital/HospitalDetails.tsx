import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Descriptions,
  Tag,
  Row,
  Col,
  Image,
  Spin,
  Typography,
  Button,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import axios from "axios";
import type { ListHospitalDto } from "../../../ViewModels/HospitalDto";

const { Title, Paragraph } = Typography;
const BASE_URL = import.meta.env.VITE_API_URL;

const HospitalDetails = () => {
  const [hospital, setHospital] = useState<ListHospitalDto | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/Hospitals/GetDetails/${params.id}`
        );
        setHospital(res.data.data);
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, [params.id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-teal-700 font-medium text-lg">Loading hospital details...</p>
        </div>
      </div>
    );

  if (!hospital)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        <Card className="shadow-2xl max-w-md mx-4">
          <p className="text-gray-600 text-lg text-center">Hospital details not found.</p>
        </Card>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button
          icon={<ArrowLeftOutlined />}
          type="text"
          onClick={() => window.history.back()}
          className="mb-6 text-teal-700 hover:text-teal-900 hover:bg-teal-100 font-medium transition-all duration-200"
          size="large"
        >
          Back to List
        </Button>

        {/* Hero Header Card */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <Tag 
                  color="gold" 
                  className="mb-4 text-sm font-semibold px-4 py-1.5 border-0 shadow-lg"
                >
                  {hospital.type === 1
                    ? "🏥 Hospital"
                    : hospital.type === 2
                    ? "🏥 Clinic"
                    : "🏥 Health Post"}
                </Tag>
                <Title level={1} className="!text-white !mb-4 !text-3xl md:!text-4xl !font-bold">
                  {hospital.hospitalName}
                </Title>
                <p className="text-white/95 text-base md:text-lg flex items-center gap-3 font-medium">
                  <EnvironmentOutlined className="text-xl" />
                  {hospital.address}
                </p>
              </div>
              <div className="hidden md:block text-white/20 text-8xl">
                🏥
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <Row gutter={[24, 24]}>
          {/* Left Column - Image & Contact */}
          <Col xs={24} lg={10}>
            {/* Image Card */}
            <Card 
              className="mb-6 border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
              bodyStyle={{ padding: 0 }}
            >
              <div className="relative">
                <Image
                  src={hospital.imagePath || "/default-hospital.jpg"}
                  alt={hospital.hospitalName}
                  width="100%"
                  height={320}
                  style={{ objectFit: "cover" }}
                  className="w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </Card>

            {/* Contact Information Card */}
            <Card 
              className="border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              bodyStyle={{ padding: '24px' }}
            >
              <h3 className="text-teal-700 font-bold text-xl mb-6 flex items-center gap-2">
                <span className="text-2xl">📞</span>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100/50 rounded-xl hover:from-teal-100 hover:to-teal-200/50 transition-all duration-200 border border-teal-200/50">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-600 rounded-xl shadow-md">
                    <PhoneOutlined className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-teal-700 font-semibold mb-1 uppercase tracking-wide">Phone Number</p>
                    <p className="text-gray-800 font-semibold text-base">{hospital.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-cyan-100/50 rounded-xl hover:from-cyan-100 hover:to-cyan-200/50 transition-all duration-200 border border-cyan-200/50">
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-xl shadow-md">
                    <MailOutlined className="text-white text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-cyan-700 font-semibold mb-1 uppercase tracking-wide">Email Address</p>
                    <p className="text-gray-800 font-semibold text-base break-all">{hospital.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl hover:from-green-100 hover:to-green-200/50 transition-all duration-200 border border-green-200/50">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl shadow-md">
                    <ClockCircleOutlined className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-green-700 font-semibold mb-1 uppercase tracking-wide">Working Hours</p>
                    <p className="text-gray-800 font-semibold text-base">
                      {hospital.openingTime} - {hospital.closingTime}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Column - Details */}
          <Col xs={24} lg={14}>
            {/* About Section */}
            <Card 
              className="mb-6 border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              bodyStyle={{ padding: '24px' }}
            >
              <h3 className="text-teal-700 font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">ℹ️</span>
                About This Facility
              </h3>
              <Paragraph className="text-gray-700 leading-relaxed text-base mb-0">
                {hospital.description}
              </Paragraph>
            </Card>

            {/* Location Details */}
            <Card 
              className="mb-6 border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              bodyStyle={{ padding: '24px' }}
            >
              <h3 className="text-teal-700 font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">📍</span>
                Location Details
              </h3>
              <Descriptions
                column={{ xs: 1, sm: 2 }}
                labelStyle={{ 
                  fontWeight: 600, 
                  color: '#0f766e',
                  backgroundColor: '#f0fdfa',
                  padding: '12px 16px'
                }}
                contentStyle={{ 
                  backgroundColor: "#ffffff",
                  color: '#374151',
                  padding: '12px 16px',
                  fontWeight: 500
                }}
                bordered
              >
                <Descriptions.Item label="Latitude">
                  {hospital.latitude}
                </Descriptions.Item>
                <Descriptions.Item label="Longitude">
                  {hospital.longitude}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Specialities Section */}
            <Card 
              className="border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              bodyStyle={{ padding: '24px' }}
            >
              <h3 className="text-teal-700 font-bold text-xl mb-4 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Medical Specialities
              </h3>
              <div className="flex flex-wrap gap-3">
                {hospital.specialities && hospital.specialities.length > 0 ? (
                  hospital.specialities.map((spec, index) => (
                    <Tag
                      color={
                        ["cyan", "blue", "geekblue", "purple", "magenta"][
                          index % 5
                        ]
                      }
                      key={index}
                      className="text-sm font-semibold px-5 py-2 rounded-full border-0 shadow-md hover:shadow-lg transition-all duration-200 m-0"
                    >
                      {spec}
                    </Tag>
                  ))
                ) : (
                  <Tag color="default" className="px-5 py-2 rounded-full shadow-md">
                    No specialities listed
                  </Tag>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HospitalDetails;