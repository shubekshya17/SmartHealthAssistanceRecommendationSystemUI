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
  Divider,
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
import type { ListHospitalDto } from "../../ViewModels/HospitalDto";

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
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" />
      </div>
    );

  if (!hospital)
    return <p style={{ textAlign: "center" }}>Hospital details not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 px-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          type="link"
          onClick={() => window.history.back()}
          className="text-blue-600 hover:text-blue-800 mb-3"
        >
          Back
        </Button>

        <div className="bg-blue-500 rounded-2xl text-white p-6 flex items-center justify-between">
          <div>
            <Title level={2} className="!text-white mb-1">
              {hospital.hospitalName}
            </Title>
            <p className="opacity-90 flex items-center gap-2">
              <EnvironmentOutlined /> {hospital.address}
            </p>
          </div>
          <Tag color="gold" className="text-base font-semibold">
            {hospital.type === 1
              ? "Hospital"
              : hospital.type === 2
              ? "Clinic"
              : "Health Post"}
          </Tag>
        </div>
      </div>

      {/* Details Card */}
      <div className="max-w-6xl mx-auto">
        <Card
          bordered={false}
          className="rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300"
        >
          <Row gutter={[32, 32]}>
            {/* Left: Image */}
            <Col xs={24} md={10}>
              <Image
                src={hospital.imagePath || "/default-hospital.jpg"}
                alt={hospital.hospitalName}
                width="100%"
                height={300}
                style={{ borderRadius: "14px", objectFit: "cover" }}
              />
              <Divider />
              <div className="space-y-2">
                <p className="text-gray-700 flex items-center gap-2">
                  <PhoneOutlined className="text-blue-500" /> {hospital.phone}
                </p>
                <p className="text-gray-700 flex items-center gap-2">
                  <MailOutlined className="text-blue-500" /> {hospital.email}
                </p>
              </div>
            </Col>

            {/* Right: Information */}

            <Col xs={24} md={14}>
              <Descriptions
                bordered
                column={1}
                labelStyle={{ fontWeight: 600, width: "30%" }}
                contentStyle={{ backgroundColor: "#fafafa" }}
              >
                <Descriptions.Item label="Latitude">
                  {hospital.latitude}
                </Descriptions.Item>
                <Descriptions.Item label="Longitude">
                  {hospital.longitude}
                </Descriptions.Item>
                <Descriptions.Item label="Opening Hours">
                  <ClockCircleOutlined className="text-green-500" />{" "}
                  {hospital.openingTime} - {hospital.closingTime}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <div>
                <Title level={4}>About</Title>
                <Paragraph className="text-gray-700 leading-relaxed">
                  {hospital.description}
                </Paragraph>
              </div>

              <Divider />

              <div>
                <Title level={4}>Specialities</Title>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialities && hospital.specialities.length > 0 ? (
                    hospital.specialities.map((spec, index) => (
                      <Tag
                        color={
                          ["blue", "green", "magenta", "geekblue", "volcano"][
                            index % 5
                          ]
                        }
                        key={index}
                        className="text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {spec}
                      </Tag>
                    ))
                  ) : (
                    <Tag color="default">No specialities listed</Tag>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default HospitalDetails;
