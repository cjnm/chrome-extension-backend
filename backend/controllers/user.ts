import { User } from "../models/User"

const saveUser = ({ username, id, avatar_url, name, email }: Record<string, string | undefined | number>) => {
  return User.findOneAndUpdate({ id }, { username, id, avatar_url, name, email }, {
    upsert: true,
  });
}

const findUser = ({ username, id }:  Record<string, string | number>) => {
  return User.findOne({ username, id });
}

export { saveUser, findUser };
