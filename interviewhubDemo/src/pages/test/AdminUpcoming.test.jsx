import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminUpcomingInterview from "../admin/AdminUpcomingInterview";
import api from "../../api/axios";

jest.mock("../../api/axios");

describe("AdminUpcomingInterview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(window, "confirm").mockImplementation(() => true);
  });

  afterEach(() => {
    window.alert.mockRestore();
    window.confirm.mockRestore();
  });

  test("shows empty state when no interviews", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(<AdminUpcomingInterview />);

    expect(
      await screen.findByText("No interviews scheduled yet")
    ).toBeInTheDocument(); // ✅ handles act automatically
  });

  test("alerts when submit clicked with empty fields", async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(<AdminUpcomingInterview />);

    fireEvent.click(
      await screen.findByText("+ Add Interview")
    );

    expect(window.alert).toHaveBeenCalledWith("⚠️ Fill all fields");
  });

  test("renders interview card from API", async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          company: "Google",
          role: "SDE",
          date: "2025-01-01",
          location: "Bangalore",
          mode: "Online",
          packageOffer: "12 LPA"
        }
      ]
    });

    render(<AdminUpcomingInterview />);

    // ✅ Wait for the async render – no act warning
    expect(await screen.findByText("Google")).toBeInTheDocument();
    expect(screen.getByText("SDE")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("Bangalore")).toBeInTheDocument();

    // ✅ Use queryAllByText when duplicate text exists
    const onlineBadges = screen.getAllByText("Online");
    expect(onlineBadges.length).toBeGreaterThan(0);

    expect(screen.getByText("12 LPA")).toBeInTheDocument();
  });
});