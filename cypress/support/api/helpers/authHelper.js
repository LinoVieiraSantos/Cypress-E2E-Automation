import UserService from "../services/UserService";
import LoginService from "../services/LoginService";
import { createRandomUser } from "../../factories/userFactory";

class AuthHelper {
  createAuthenticatedUser() {
    const user = createRandomUser();

    return UserService.createUser(user)
      .then((createResponse) => {
        expect(createResponse.status).to.eq(201);

        return LoginService.login(
          user.email,
          user.password
        );
      })
      .then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);

        return {
          user,
          token: loginResponse.body.authorization,
        };
      });
  }
}

export default new AuthHelper();