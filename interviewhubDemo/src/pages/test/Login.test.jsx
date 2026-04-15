import api from "../../api/axios";
import { registerUser, loginUser, resetPassword } from "../../api//authApi";

// ✅ FIX: correct mock path
jest.mock("../../api/axios");

describe("Auth API", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("registerUser calls /auth/register API", async () => {
    api.post.mockResolvedValue({ data: {} });

    const data = { username: "test", password: "1234" };
    await registerUser(data);

    expect(api.post).toHaveBeenCalledWith("/auth/register", data);
  });

  test("loginUser calls /auth/login API", async () => {
    api.post.mockResolvedValue({ data: {} });

    const data = { username: "test", password: "1234" };
    await loginUser(data);

    expect(api.post).toHaveBeenCalledWith("/auth/login", data);
  });

  test("resetPassword calls /auth/reset API with query params", async () => {
    api.post.mockResolvedValue({ data: {} });

    await resetPassword("test@mail.com", "reading", "newpass");

    expect(api.post).toHaveBeenCalledWith(
      "/auth/reset?email=test@mail.com&hobby=reading&newPassword=newpass"
    );
  });

});
