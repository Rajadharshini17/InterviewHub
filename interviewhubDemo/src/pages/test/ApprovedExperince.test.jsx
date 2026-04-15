import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Approvedexperience from "../admin/Approvedexperience";

/**
 * ✅ Correct mock path to where ExperienceModal ACTUALLY is
 */
jest.mock("../admin/ExperienceModal", () => {
  return function MockExperienceModal({ experience }) {
    return experience ? <div>Experience Modal Open</div> : null;
  };
});

describe("Approvedexperience Component", () => {
  test("shows message when no approved experiences", () => {
    const experiences = [
      { id: 1, company: "ABC", role: "Dev", status: "pending" }
    ];

    render(<Approvedexperience experiences={experiences} />);

    expect(
      screen.getByText("No approved experiences")
    ).toBeInTheDocument();
  });

  test("renders only approved experiences", () => {
    const experiences = [
      { id: 1, company: "Google", role: "SDE", status: "approved" },
      { id: 2, company: "Amazon", role: "QA", status: "pending" }
    ];

    render(<Approvedexperience experiences={experiences} />);

    expect(screen.getByText("Google – SDE")).toBeInTheDocument();
    expect(screen.queryByText("Amazon – QA")).not.toBeInTheDocument();
  });

  test("opens modal on click", () => {
    const experiences = [
      { id: 1, company: "Microsoft", role: "Engineer", status: "approved" }
    ];

    render(<Approvedexperience experiences={experiences} />);

    fireEvent.click(screen.getByText("Microsoft – Engineer"));

    expect(
      screen.getByText("Experience Modal Open")
    ).toBeInTheDocument();
  });
});
