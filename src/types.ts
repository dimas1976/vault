export type Credential = {
  _id: number;
  service: string;
  username: string;
  password: string;
};

export type DB = {
  credentials: Credential[];
};
