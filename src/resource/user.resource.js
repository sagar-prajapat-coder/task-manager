import moment from "moment";

export default class UserResource {
  constructor(user) {
    this.user = user;
  }

  toArray() {
    return {
      id: this.user._id,
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      status: this.user.status,
      created_at: moment(this.user.created_at).format("DD-MM-YYYY"),
    };
  }

  static collection(users) {
    return users.map((user) => new UserResource(user).toArray());
  }

  toJson() {
    return JSON.stringify(this.toArray());
  }
}
