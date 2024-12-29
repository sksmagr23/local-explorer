import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Spin, Empty } from "antd";
import {
  EyeOutlined,
  EnvironmentOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import Header from "./header";

const { Title, Text } = Typography;
const { Meta } = Card;

function ResultsPage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const location = searchParams.get("location");
        const category = searchParams.get("category");
        const response = await axios.get(
          "http://localhost:5000/api/experiences",
          {
            params: { location, category },
          }
        );
        setExperiences(response.data);
      } catch (err) {
        setError("Failed to fetch experiences");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty description={error} />
      </div>
    );
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-300 to-blue-400 p-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
            <Title level={2}>Experiences in {searchParams.get("location")}</Title>
            <Text type="primary">Category: {searchParams.get("category")}</Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hoverable
                  className="shadow-xl"
                  cover={
                    <img
                      alt={exp.name}
                      src={exp.image}
                      className="h-48 w-full object-cover"
                    />
                  }
                  actions={[
                    <Link to={`/details/${exp.id}`}>
                      <EyeOutlined /> View Details
                    </Link>,
                  ]}
                >
                  <Meta
                    title={exp.name}
                    description={
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <EnvironmentOutlined className="mr-2" />
                          <Text type="secondary">{exp.location}</Text>
                        </div>
                        <div className="flex items-center">
                          <TagOutlined className="mr-2" />
                          <Text type="secondary">{exp.category}</Text>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default ResultsPage;
