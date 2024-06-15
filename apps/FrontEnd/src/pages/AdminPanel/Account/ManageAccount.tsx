import React, { useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext.tsx';

const ManageAccount: React.FC = () => {
  const { setIsAdminPage } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  return (
    <div>
      <h1>Gérer un compte</h1>

    </div>
  );
};

export default ManageAccount;
