/*
import React from "react";
import OurTable, {
  PlaintextColumn,
  DateColumn,
} from "main/components/OurTable";

import { useTable, usePagination } from "react-table";
import { Link } from "react-router-dom"; 

export default function JobsTable({ jobs }) {
  const testid = "JobsTable";

  const columns = [
    {
      Header: "id",
      accessor: "id", // accessor is the "key" in the data
    },
    DateColumn("Created", (cell) => cell.row.original.createdAt),
    DateColumn("Updated", (cell) => cell.row.original.updatedAt),
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Log",
      accessor: "log",
      Cell: ({ cell }) => {
        const logOutput = cell.value;
        // Check if the log has more than 10 lines
        if (logOutput.split("\n").length > 10) {
          return (
            <>
              {logOutput.split("\n").slice(0, 10).join("\n")}
              <br />
              <Link to={`/admin/jobs/logs/${cell.row.original.id}`}>
                See entire log
              </Link>
            </>
          );
        }
        return logOutput;
      },
    },
    PlaintextColumn("Log", (cell) => cell.row.original.log),
  ];

  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: true,
      },
    ],
    // Stryker disable next-line all
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canNextPage,
    canPreviousPage,
    pageIndex,
    pageSize,
    pageCount,
    gotoPage,
    setPageSize,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data: jobs,
      initialState: { sortBy: sortees, pageIndex: 0, pageSize: 10 }, // 10 jobs per page
    },
    usePagination
  );

  return (
    <div>
      <OurTable
        data={jobs}
        columns={columns}
        testid={testid}
        initialState={{ sortBy: sortees }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </OurTable>

      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page {pageIndex + 1} of {pageCount}
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30].map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              Show {pageSizeOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
*/
import React from "react";
import OurTable, {
  PlaintextColumn,
  DateColumn,
} from "main/components/OurTable";

export default function JobsTable({ jobs }) {
  const testid = "JobsTable";

  const columns = [
    {
      Header: "id",
      accessor: "id", // accessor is the "key" in the data
    },
    DateColumn("Created", (cell) => cell.row.original.createdAt),
    DateColumn("Updated", (cell) => cell.row.original.updatedAt),
    {
      Header: "Status",
      accessor: "status",
    },
    PlaintextColumn("Log", (cell) => cell.row.original.log),
  ];

  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: true,
      },
    ],
    // Stryker disable next-line all
    [],
  );

  return (
    <OurTable
      data={jobs}
      columns={columns}
      testid={testid}
      initialState={{ sortBy: sortees }}
    />
  );
}