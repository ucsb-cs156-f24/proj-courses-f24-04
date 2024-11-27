import React from "react";
import OurTable from "main/components/OurTable";

export default function FinalsInfoDisplay({ finalsInfo }) {
  const columns = [
    {
      Header: "Has Finals?",
      accessor: "hasFinals",
      Cell: ({ value }) => (value ? "Yes" : "No"), // boolean to readable text
    },
    {
      Header: "Comments",
      accessor: "comments",
    },
    {
      Header: "Exam Day",
      accessor: "examDay",
    },
    {
      Header: "Exam Date",
      accessor: "examDate",
    },
    {
      Header: "Begin Time",
      accessor: "beginTime",
    },
    {
      Header: "End Time",
      accessor: "endTime",
    },
  ];

  const testid = "FinalsInfoDisplay";

  const columnsToDisplay = columns;

  return <OurTable data={finalsInfo} columns={columnsToDisplay} testid={testid} />;
}
