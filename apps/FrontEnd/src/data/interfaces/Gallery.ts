export interface AddGalleryPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  gallery?: Gallery;
}

export interface EditGalleryPopinProps {
  show: boolean;
  onClose: () => void;
  onSave: (id: string, formData: FormData) => void;
  gallery: Gallery;
}

export interface Gallery {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  images: string[];
}

export interface Gallery_ {
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  images: string[];
}
export interface NewGallery {
  title: string;
  startDate: string;
  endDate: string;
  images: File[];
}
