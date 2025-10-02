export interface ChannelType {
  _id: string;
  channel_name: string;
  channel_type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SendMessageResult {
  success?: boolean;
  data?: { _id: string; createdAt: Date };
  errors?: { msgError: string }[];
}

export interface Message {
  _id: string;
  userChannel_id: string | undefined;
  user_id: string |undefined;
  type: string[];
  content: string |undefined;
  createdAt?: Date |string;
  updatedAt?: Date;
}

export interface NewPost {
  userId: string;
  type?: string[];
  content: string;
  title: string;
}

export interface PostType {
  _id: string;
  type: string;
  content: string;
  title: string;
  createdAt: Date ;
  userId: UserId;
}

interface UserId {
  _id: string;
  username: string;
  email: string;
  active: boolean;
};
