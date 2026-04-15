import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../Register";
import api from "../../api/axios";

// ✅ mock axios
jest.mock("../../api/axios");

describe("Register Component", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    // ✅ mock alert (used in component)
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    window.alert.mockRestore();
  });

  test("renders Register button", () => {
    render(<Register />);
    expect(screen.getByText("Register Now")).toBeInTheDocument();
  });

  test("shows alert if fields are empty", () => {
    render(<Register />);

    fireEvent.click(screen.getByText("Register Now"));

    expect(window.alert).toHaveBeenCalledWith("⚠️ All fields are required");
  });

  test("calls API when all fields are filled", async () => {
    // ❗ reject to avoid navigation (window.location.href)
    api.post.mockRejectedValueOnce(new Error("fail"));

    render(<Register />);

    fireEvent.change(screen.getByPlaceholderText("👤 Full Name"), {
      target: { name: "fullName", value: "Raji" }
    });

    fireEvent.change(screen.getByPlaceholderText("📧 Email"), {
      target: { name: "email", value: "raji@mail.com" }
    });

    fireEvent.change(screen.getByPlaceholderText("📱 Phone"), {
      target: { name: "phone", value: "9876543210" }
    });

    fireEvent.change(screen.getByPlaceholderText("🎓 Qualification"), {
      target: { name: "qualification", value: "BCA" }
    });

    fireEvent.change(screen.getByPlaceholderText("💼 Experience Level"), {
      target: { name: "experienceLevel", value: "Fresher" }
    });

    fireEvent.change(screen.getByPlaceholderText("🎯 Hobby"), {
      target: { name: "hobby", value: "Reading" }
    });

    fireEvent.change(screen.getByPlaceholderText("👤 Username"), {
      target: { name: "username", value: "raji123" }
    });

    fireEvent.change(screen.getByPlaceholderText("🔒 Password"), {
      target: { name: "password", value: "1234" }
    });

    fireEvent.click(screen.getByText("Register Now"));

    expect(api.post).toHaveBeenCalledWith(
      "/auth/register",
      expect.objectContaining({
        fullName: "Raji",
        username: "raji123"
      })
    );
  });
});
``