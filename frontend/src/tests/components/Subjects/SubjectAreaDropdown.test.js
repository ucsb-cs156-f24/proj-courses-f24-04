import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { useState } from "react";

import SubjectAreaDropdown from "main/components/Subjects/SubjectAreaDropdown";
import { oneSubject } from "fixtures/subjectFixtures";
import { threeSubjects } from "fixtures/subjectFixtures";
import { outOfOrderSubjects } from "fixtures/subjectFixtures";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  compareValues: jest.fn(),
}));

describe("SubjectAreaDropdown tests", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    console.error.mockImplementation(() => null);
  });

  beforeEach(() => {
    useState.mockImplementation(jest.requireActual("react").useState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  const subject = jest.fn();
  const setSubject = jest.fn();

  test("renders without crashing on one subject", () => {
    render(
      <SubjectAreaDropdown
        subjects={oneSubject}
        subject={oneSubject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );
  });

  test("renders without crashing on three subjects", async () => {
    render(
      <SubjectAreaDropdown
        subjects={[threeSubjects[2], threeSubjects[0], threeSubjects[1]]}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    const ART_CS = "dds1-option-ART--CS";
    const ANTH = "dds1-option-ANTH";
    const ARTHI = "dds1-option-ARTHI";

    // Check that blanks are replaced with hyphens
    await waitFor(() => expect(screen.getByTestId(ART_CS).toBeInTheDocument));
    await waitFor(() => expect(screen.getByTestId(ANTH).toBeInTheDocument));
    await waitFor(() => expect(screen.getByTestId(ARTHI).toBeInTheDocument));

    // Check that the options are sorted
    // See: https://www.atkinsondev.com/post/react-testing-library-order/
    const allOptions = screen.getAllByTestId("dds1-option-", { exact: false });
    for (let i = 0; i < allOptions.length - 1; i++) {
      console.log("[i]" + allOptions[i].value);
      console.log("[i+1]" + allOptions[i + 1].value);
      expect(allOptions[i].value < allOptions[i + 1].value).toBe(true);
    }
  });

  test("sorts and puts hyphens in testids", () => {
    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );
  });

  test("when I select an object, the value changes", async () => {
    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    expect(await screen.findByLabelText("Subject Area")).toBeInTheDocument();

    const selectQuarter = screen.getByLabelText("Subject Area");
    userEvent.selectOptions(selectQuarter, "ARTHI");
    expect(setSubject).toBeCalledWith("ARTHI");
  });

  test("out of order subjects is sorted by subjectCode", async () => {
    render(
      <SubjectAreaDropdown
        subjects={outOfOrderSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    expect(await screen.findByText("Subject Area")).toBeInTheDocument();
    expect(screen.getByText("ANTH - Anthropology")).toHaveAttribute(
      "data-testid",
      "dds1-option-ANTH",
    );
  });

  test("if I pass a non-null onChange, it gets called when the value changes", async () => {
    const onChange = jest.fn();
    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
        onChange={onChange}
      />,
    );

    expect(await screen.findByLabelText("Subject Area")).toBeInTheDocument();

    const selectSubject = screen.getByLabelText("Subject Area");
    userEvent.selectOptions(selectSubject, "ARTHI");
    await waitFor(() => expect(setSubject).toBeCalledWith("ARTHI"));
    await waitFor(() => expect(onChange).toBeCalledTimes(1));

    // x.mock.calls[0][0] is the first argument of the first call to the jest.fn() mock x
    const event = onChange.mock.calls[0][0];
    expect(event.target.value).toBe("ARTHI");
  });

  test("default label is Subject Area", async () => {
    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    expect(await screen.findByLabelText("Subject Area")).toBeInTheDocument();
  });

  test("keys / testids are set correctly on options", async () => {
    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    const expectedKey = "dds1-option-ANTH";
    await waitFor(() =>
      expect(screen.getByTestId(expectedKey).toBeInTheDocument),
    );
  });

  test("when localstorage has a value, it is passed to useState", async () => {
    const getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockImplementation(() => "ARTHI");

    const setSubjectStateSpy = jest.fn();
    useState.mockImplementation((x) => [x, setSubjectStateSpy]);

    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    await waitFor(() => expect(useState).toBeCalledWith("ARTHI"));
  });

  test("when localstorage has no value, first element of subject list is passed to useState", async () => {
    const getItemSpy = jest.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockImplementation(() => null);

    const setSubjectStateSpy = jest.fn();
    useState.mockImplementation((x) => [x, setSubjectStateSpy]);

    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    await waitFor(() =>
      expect(useState).toBeCalledWith(expect.objectContaining({})),
    );
  });

  test("When no subjects, dropdown is blank", async () => {
    render(
      <SubjectAreaDropdown
        subjects={[]}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    const expectedKey = "dds1";
    expect(screen.queryByTestId(expectedKey)).toBeNull();
  });
  test("renders 'All Subjects' option correctly", async () => {
    render(
      <SubjectAreaDropdown
        subjects={threeSubjects}
        subject={subject}
        setSubject={setSubject}
        controlId="dds1"
      />,
    );

    const allSubjectsOption = screen.getByTestId("dds1-option-all");
    expect(allSubjectsOption).toBeInTheDocument();
    expect(allSubjectsOption).toHaveValue("ALL");
  });
});
