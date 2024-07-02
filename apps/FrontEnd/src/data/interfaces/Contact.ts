export interface Contact {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  content: string;
  status: string;
  referent?: {
    _id: string;
    firstname: string;
    lastname: string;
  };
}
