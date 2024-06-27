export interface Article {
  _id: string;
  titlePost: string;
  content: string;
  image: string;
  member: {
    firstname: string;
    lastname: string;
    image: string;
  };
}

export interface PopupProps {
  article: Article;
  onClose: () => void;
}
