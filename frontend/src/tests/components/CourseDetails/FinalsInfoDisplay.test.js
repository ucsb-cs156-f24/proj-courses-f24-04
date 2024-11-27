import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import FinalsInfoDisplay from "main/components/CourseDetails/FinalsInfoDisplay";
import { finalsInfoFixtures } from "fixtures/finalsInfoFixtures";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const mockedMutate = jest.fn();

jest.mock("main/utils/useBackend", () => ({
  ...jest.requireActual("main/utils/useBackend"),
  useBackendMutation: () => ({ mutate: mockedMutate }),
}));

describe("UserTable tests", () => {
  const queryClient = new QueryClient();
  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <FinalsInfoDisplay finalsInfo={[]} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("Has the expected colum headers and content", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <FinalsInfoDisplay
            finalsInfo={[finalsInfoFixtures.oneFinalsInfo]}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = [
      "Has Finals?",
      "Comments",
      "Exam Day",
      "Exam Date",
      "Begin Time",
      "End Time",
    ];
    const expectedFields = [
        "hasFinals",
        "comments",
        "examDay",
        "examDate",
        "beginTime",
        "endTime",
    ];

    const testId = "FinalsInfoDisplay";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-hasFinals`),
    ).toHaveTextContent("Yes");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-comments`),
    ).toHaveTextContent("Final exam will be cumulative.");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-examDay`),
    ).toHaveTextContent("R");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-examDate`),
    ).toHaveTextContent("2022-06-09");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-beginTime`),
    ).toHaveTextContent("08:00");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-endTime`),
    ).toHaveTextContent("11:00");
  });
});
