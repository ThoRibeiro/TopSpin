import React, { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

const AdminPanel: React.FC = () => {
  const { setIsAdminPage } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Admin panel content */}
    </div>
  );
};

export default AdminPanel;
