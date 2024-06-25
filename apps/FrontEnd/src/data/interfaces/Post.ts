export interface Post {
  _id: string;
  titlePost: string;
  content: string;
  categorie: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  member: {
    _id: string;
    firstname: string;
    lastname: string;
    role: string;
    image?: string;
  };
}

export interface UpdatedPostInfo {
  titlePost?: string;
  content?: string;
  categorie?: string;
  images?: string[];
}

export interface NewPostInfo {
  titlePost: string;
  content: string;
  categorie: string;
  images: string[];
}
