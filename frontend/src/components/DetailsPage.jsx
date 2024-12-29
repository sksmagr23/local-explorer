import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Typography, Rate, Tag, Avatar, Skeleton, message } from "antd";
import { EnvironmentOutlined, TagOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Header from "./header";

const { Title, Text, Paragraph } = Typography;

function DetailsPage() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/experiences/${id}`
        );
        setExperience(response.data);
      } catch (err) {
        setError("Failed to load experience details");
        message.error("Failed to load experience details");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 text-center">
        <Text type="danger">{error}</Text>
      </div>
    );
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-200"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="relative h-[60vh]"
        >
          <img
            src={experience.image}
            alt={experience.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </motion.div>

        <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex-1">
                  <Title level={1}>{experience.name}</Title>

                  <div className="flex items-center gap-4 mb-6">
                    <Rate disabled defaultValue={experience.rating} />
                    <Text className="text-lg">{experience.rating} / 5</Text>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Tag icon={<EnvironmentOutlined />} color="blue">
                      {experience.location}
                    </Tag>
                    <Tag icon={<TagOutlined />} color="green">
                      {experience.category}
                    </Tag>
                  </div>

                  <Paragraph className="text-lg mb-8">
                    {experience.description}
                  </Paragraph>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card>
              <Title level={3}>Reviews</Title>
              <div className="space-y-6">
                {experience.reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 border-b last:border-b-0 pb-4"
                  >
                    <Avatar size={48} className="bg-blue-500">
                      {index + 1}
                    </Avatar>
                    <div>
                      <Rate disabled defaultValue={5} className="text-sm" />
                      <Paragraph className="mt-2">{review}</Paragraph>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default DetailsPage;
