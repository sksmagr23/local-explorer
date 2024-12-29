import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Select, Button, message } from "antd";
import { SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { FaUtensils, FaMountain } from "react-icons/fa";
import { motion } from "framer-motion";

function HomePage() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results?location=${location}&category=${category}`);
  };

  const categories = [
    { value: "Food", icon: <FaUtensils className="mr-2" /> },
    { value: "Outdoor", icon: <FaMountain className="mr-2" /> },
  ];

  const handleValidationAndSearch = () => {
    if (!location || !category) {
      message.error('Please enter both location and category');
      return;
    }
    handleSearch();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-blue-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-white italic mb-4 tracking-tight">
          Local Experience Explorer
        </h1>
        <p className="text-zinc-200 text-xl mb-8 opacity-90">
          Discover amazing local experiences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="bg-gray-200 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="space-y-6">
          <div>
            <Input
              size="large"
              placeholder="Enter location"
              prefix={<EnvironmentOutlined className="text-gray-400" />}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="hover:border-blue-500 transition-colors"
            />
          </div>

          <Select
            size="large"
            placeholder="Select Category"
            value={category}
            onChange={setCategory}
            className="w-full text-gray-300"
            options={categories.map((cat) => ({
              value: cat.value,
              label: (
                <div className="flex items-center">
                  {cat.icon}
                  {cat.value}
                </div>
              ),
            }))}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              size="large"
              icon={<SearchOutlined />}
              onClick={handleValidationAndSearch}
              className="w-full bg-blue-500 hover:bg-blue-600 h-12 text-lg"
            >
              Explore Now
            </Button>
          </motion.div>        
          </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-white text-center"
      >
        <p className="text-sm opacity-75">
          Find the best local experiences in your area
        </p>
      </motion.div>
    </div>
  );
}

export default HomePage;
