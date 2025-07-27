export type TPassword = {
  username: string;
  password: string;
  id: string;
  website: string;
  isSelected: boolean;
  profileId: string;
  isPinned?: boolean;
};

export type TBaseInput = {
  value: string;
  error: string;
};

export type TPasswordInput = {
  username: TBaseInput;
  password: TBaseInput;
  website: TBaseInput;
};
