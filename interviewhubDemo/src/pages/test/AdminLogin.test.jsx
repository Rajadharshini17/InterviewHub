import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLogin from "../admin/AdminLogin";
import { loginAdmin } from "../../api/adminApi";

// ✅ Mock admin API
jest.mock("../../api/adminApi", () => ({
  loginAdmin: jest.fn()
}));

describe("AdminLogin Component", () => {

  beforeAll(() => {
    // ✅ mock window.location ONCE (JSDOM-safe)
    delete window.location;
    window.location = { href: "" };
  });

  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.setItem = jest.fn();
  });

  test("renders admin login form", () => {
    render(<AdminLogin />);

    expect(screen.getByText("Admin Login")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("👤 Admin Username")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("🔑 Admin Password")
    ).toBeInTheDocument();
    expect(
      screen.getByText("🔐 Login as Admin")
    ).toBeInTheDocument();
  });

  test("successful admin login stores admin data", async () => {
    loginAdmin.mockResolvedValueOnce({
      data: { username: "admin" }
    });

    render(<AdminLogin />);

    fireEvent.change(
      screen.getByPlaceholderText("👤 Admin Username"),
      { target: { value: "admin" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("🔑 Admin Password"),
      { target: { value: "admin123" } }
    );

    fireEvent.click(screen.getByText("🔐 Login as Admin"));

    await waitFor(() => {
      expect(loginAdmin).toHaveBeenCalledWith({
        username: "admin",
        password: "admin123"
      });

      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  test("shows error message on invalid admin login", async () => {
    loginAdmin.mockRejectedValueOnce(new Error("Invalid"));

    render(<AdminLogin />);

    fireEvent.change(
      screen.getByPlaceholderText("👤 Admin Username"),
      { target: { value: "wrong" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("🔑 Admin Password"),
      { target: { value: "wrong" } }
    );

    fireEvent.click(screen.getByText("🔐 Login as Admin"));

    await waitFor(() => {
      expect(
        screen.getByText("Invalid Admin Credentials ❌")
      ).toBeInTheDocument();
    });
  });
});