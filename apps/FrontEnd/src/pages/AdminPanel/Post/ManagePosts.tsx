import React, { useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext.tsx';

const ManagePosts: React.FC = () => {
  const { setIsAdminPage } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  return (
    <div>
      <h1>Gérer les articles</h1>
      {/* Logic to manage posts */}
    </div>
  );
};

export default ManagePosts;
