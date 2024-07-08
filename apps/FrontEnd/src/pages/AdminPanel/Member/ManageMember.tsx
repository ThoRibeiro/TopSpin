import React, { useState, useEffect } from "react";
import memberManageService from "../../../services/Admin/ManageMemberService";
import "./ManageMember.css";
import { useAuth } from "../../../Context/AuthContext";
import AddMemberPopin from "../../../components/Popup/Member/AddMember";
import EditMemberPopin from "../../../components/Popup/Member/EditMember";
import {
  notifySuccess,
  notifyError,
} from "../../../components/Toast/ToastNotification";
import { Member } from "../../../data/interfaces/Member";

const ManageMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [showAddMemberPopin, setShowAddMemberPopin] = useState(false);
  const [showEditMemberPopin, setShowEditMemberPopin] = useState(false);
  const { setIsAdminPage, isAuthenticated } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await memberManageService.getAllMembers();
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
        notifyError("Erreur lors de la récupération des membres.");
      }
    };
    fetchMembers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setShowEditMemberPopin(true);
  };

  const handleSaveClick = async (memberData: FormData) => {
    if (editingMember) {
      try {
        const updatedMember = await memberManageService.updateMember(
          editingMember._id,
          memberData,
        );
        setMembers(
          members.map((member) =>
            member._id === editingMember._id
              ? {
                  ...member,
                  ...Object.fromEntries(memberData.entries()),
                  image: updatedMember.data.member.image,
                }
              : member,
          ),
        );
        setEditingMember(null);
        notifySuccess("Membre mis à jour avec succès.");
      } catch (error) {
        console.error("Error updating member:", error);
        notifyError("Erreur lors de la mise à jour du membre.");
      }
    } else {
      try {
        await memberManageService.createMember(memberData);
        const response = await memberManageService.getAllMembers();
        setMembers(response.data);
        notifySuccess("Membre ajouté avec succès.");
      } catch (error) {
        console.error("Error adding member:", error);
        notifyError("Erreur lors de l'ajout du membre.");
      }
    }
    setShowAddMemberPopin(false);
    setShowEditMemberPopin(false);
  };

  const handleDeleteClick = async (_id: string) => {
    if (isAuthenticated) {
      try {
        await memberManageService.deleteMember(_id);
        setMembers(members.filter((member) => member._id !== _id));
        notifySuccess("Membre supprimé avec succès.");
      } catch (error) {
        console.error("Error deleting member:", error);
        notifyError("Erreur lors de la suppression du membre.");
      }
    } else {
      notifyError("Vous devez être connecté pour effectuer cette action.");
    }
  };

  const handleAddMemberSave = async (newMember: FormData) => {
    try {
      await memberManageService.createMember(newMember);
      const response = await memberManageService.getAllMembers();
      setMembers(response.data);
      setShowAddMemberPopin(false);
      notifySuccess("Membre ajouté avec succès.");
    } catch (error) {
      console.error("Error adding member:", error);
      notifyError("Erreur lors de l'ajout du membre.");
    }
  };

  const filteredMembers = members.filter((member) =>
    `${member.firstname} ${member.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="manage-members">
      <h1>Gérer les membres</h1>
      <div className="search-add-container">
        <input
          type="text"
          placeholder="Rechercher par nom ou prénom"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="add-member-button"
          onClick={() => setShowAddMemberPopin(true)}
        >
          Créer un nouveau membre
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Logo</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member._id}>
              <td>{member.firstname}</td>
              <td>{member.lastname}</td>
              <td className="logo-member">
                <img src={member.image} alt="Logo Membre" />
              </td>
              <td>{member.role}</td>
              <td className="manage-members-button">
                <button onClick={() => handleEditClick(member)}>
                  Modifier
                </button>
                <button onClick={() => handleDeleteClick(member._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddMemberPopin
        show={showAddMemberPopin}
        onClose={() => setShowAddMemberPopin(false)}
        onSave={handleAddMemberSave}
      />
      {editingMember && (
        <EditMemberPopin
          show={showEditMemberPopin}
          onClose={() => setShowEditMemberPopin(false)}
          onSave={handleSaveClick}
          member={editingMember}
        />
      )}
    </div>
  );
};

export default ManageMembers;
