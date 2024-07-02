import React, { useState, useEffect } from "react";
import contactService from "../../../services/contactService";
import memberManageService from "../../../services/Admin/ManageMemberService";
import "./ManageContact.css";
import { useAuth } from "../../../Context/AuthContext";
import {
  notifySuccess,
  notifyError,
} from "../../../components/Toast/ToastNotification";
import { Member } from "../../../data/interfaces/Member.ts";
import { Contact } from "../../../data/interfaces/Contact.ts";

const ManageContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setIsAdminPage } = useAuth();

  useEffect(() => {
    setIsAdminPage(true);
    return () => {
      setIsAdminPage(false);
    };
  }, [setIsAdminPage]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await contactService.getAllContacts();
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        notifyError("Erreur lors de la récupération des contacts.");
      }
    };
    fetchContacts();
  }, []);

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

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await contactService.updateContactStatus(id, status);
      setContacts(
        contacts.map((contact) =>
          contact._id === id ? { ...contact, status } : contact,
        ),
      );
      notifySuccess("Statut du contact mis à jour avec succès.");
    } catch (error) {
      console.error("Error updating contact status:", error);
      notifyError("Erreur lors de la mise à jour du statut du contact.");
    }
  };

  const handleReferentChange = async (id: string, referent: string) => {
    try {
      const updatedContact = await contactService.updateContactReferent(
        id,
        referent,
      );
      setContacts(
        contacts.map((contact) =>
          contact._id === id
            ? { ...contact, referent: updatedContact.data.referent }
            : contact,
        ),
      );
      notifySuccess("Référent du contact mis à jour avec succès.");
    } catch (error) {
      console.error("Error updating contact referent:", error);
      notifyError("Erreur lors de la mise à jour du référent du contact.");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="manage-contacts">
      <h1>Gérer les contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Contenu</th>
            <th>Statut</th>
            <th>Référent</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.email}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.content}</td>
              <td>
                <select
                  value={contact.status}
                  onChange={(e) =>
                    handleStatusChange(contact._id, e.target.value)
                  }
                >
                  <option value="non consulté">Non consulté</option>
                  <option value="en cours">En cours</option>
                  <option value="e-mail envoyé">E-mail envoyé</option>
                  <option value="clôturé">Clôturé</option>
                </select>
              </td>
              <td>
                <select
                  value={contact.referent?._id || ""}
                  onChange={(e) =>
                    handleReferentChange(contact._id, e.target.value)
                  }
                >
                  <option value="">Aucun</option>
                  {members.map((member) => (
                    <option key={member._id} value={member._id}>
                      {member.firstname} {member.lastname}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageContacts;
