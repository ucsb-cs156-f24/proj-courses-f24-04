import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";

const JobLogDetailPage = () => {
  const { id } = useParams();
  const [log, setLog] = useState("");

  const { data, error, status } = useBackend(
    [`/api/jobs/logs/${id}`],
    {
      method: "GET",
      url: `/api/jobs/logs/${id}`,
    },
    []
  );

  useEffect(() => {
    if (data) {
      setLog(data.logOutput);  // Assuming data contains the full log in logOutput
    }
  }, [data]);

  if (error) {
    return <div>Error loading log: {error.message}</div>;
  }

  return (
    <div>
      <h2>Job Log: {id}</h2>
      <textarea value={log} rows="20" cols="100" readOnly />
    </div>
  );
};

export default JobLogDetailPage;
