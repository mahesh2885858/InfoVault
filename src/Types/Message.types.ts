export type TBaseMessage = {
  _id: string | number;
  sender: TUser;
  receiver: TUser;
  image?: string;
  system?: boolean;
  status: 'pending' | 'sent' | 'delivered' | 'read';
  pinnedTill?: any;
  createdAt: Date;
  isStared?: boolean;
  replyMessage?: TMessageType;
  isPinned?: boolean;
  isSelected?: boolean;
};

export type TText = TBaseMessage & {
  type: 'text';
  text: string;
};

export type TVideo = TBaseMessage & {
  type: 'video';
  video: string;
};
export type TAudio = TBaseMessage & {
  type: 'audio';
  audio: string;
};

export type TLocation = TBaseMessage & {
  type: 'location';
  location: {
    description?: string;
    title?: string;
    latitude: number;
    longitude: number;
  };
};

export type TListItem = {
  type: string;
  text: string;
  data?: any;
};

export type TListSection = {
  title: string;
  items: TListItem[];
};

export type TList = TBaseMessage & {
  type: 'list';
  list: {
    title: string;
    description?: string;
    file?: any;
    sections: TListSection[];
  };
};

export type TUser = {
  _id: number;
  name?: string;
  avatar?: string | number;
};
export type TReply = {
  title: string;
  value: string;
  messageId?: any;
};
export type TChoices = TBaseMessage & {
  type: 'choice';
  choices: {
    title?: string;
    values: {
      title: string;
      value: string;
    }[];
  };
};

export type TCard = {
  title: string;
  image: string;
  description: string;
  choices?: {
    values: {
      title: string;
      value: string;
    }[];
  };
};
export type TCardMessage = TBaseMessage & {
  type: 'card';
  card: TCard;
};

export type TCarousel = TBaseMessage & {type: 'carousel'; carousel: TCard[]};

export type TMultiImage = TBaseMessage & {
  type: 'multiImage';
  multiImage: {image: string}[];
};

export type TTextMessage = TBaseMessage & {
  type: 'text';
  text: string;
};

export type TMessageType =
  | TTextMessage
  | TChoices
  | TLocation
  | TCarousel
  | TList
  | TCardMessage
  | TMultiImage
  | TVideo
  | TAudio;

export type TTimeStampProps = {
  isPinned: boolean;
  isStared: boolean;
  date: any;
  status: 'pending' | 'sent' | 'delivered' | 'read';
  type?: string;
  readReceipts: boolean;
};

export type TRenderTimeStampProps = {
  renderTimeStamp: (props: TTimeStampProps) => React.ReactNode;
};

export type TAddressComponent = {
  long_name: string;
  types: string[];
};

export type TResult = {
  address_components: TAddressComponent[];
};

export type TRenderSlideShowProps = {
  selectedImage: string | null;
  selectedIndex: number | null;
  closeModal: () => void;
  data: {image: string}[];
};

export type TRenderMessageProps = {
  message: TMessageType;
  selectMessages: (id: any) => void;
  selectedMessagesCount: number;
  renderingForInfoModal?: boolean;
};
