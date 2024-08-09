type UserType = {
  _id: string;
  date: string;
  password: string;
  roles: string[];
  username: string;
  email: string;
  token: string;
};
type UsersListType = {
  _id: string;
  date: string;
  password: string;
  roles: string[];
  username: string;
  email: string;
};
type UserTypeForAdmin = {
  _id: string;
  date: string;
  password: string;
  roles: string[];
  username: string;
  email: string;
  pic: string[];
  token: string;
};

export type { UserType, UserTypeForAdmin, UsersListType };
