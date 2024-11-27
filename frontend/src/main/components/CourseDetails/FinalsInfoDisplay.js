import React from "react";
import OurTable from "main/components/OurTable";

export default function FinalsInfoDisplay({ finalsInfo }) {
const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return dateString; // Return original if not valid
    return `${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6, 8)}`;
    };

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
      Cell: ({ value }) => formatDate(value),
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
