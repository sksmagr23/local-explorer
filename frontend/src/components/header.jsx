import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-800 shadow-md p-4 flex items-center justify-between top-0">
      <div className="flex items-center">
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="mr-6"
        />
        <h1 className="text-2xl font-bold text-zinc-100">Local Experience Explorer</h1>
      </div>
    </div>
  );
};

export default Header;