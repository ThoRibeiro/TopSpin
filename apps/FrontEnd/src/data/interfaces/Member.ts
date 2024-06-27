export interface Member {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  image?: string;
}

export interface UpdatedMemberInfo {
  firstname?: string;
  lastname?: string;
  email?: string;
  role?: string;
  image?: string;
}

export interface NewMemberInfo {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  image?: string;
}

export interface AddMemberPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (memberData: FormData) => void;
  member?: {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    image?: string;
  };
}

export interface EditMemberPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (updatedMember: FormData) => void;
  member: Member;
}