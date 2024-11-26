import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";  // Make sure this is the correct path

const JobLogDetailPage = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [log, setLog] = useState("");
  const { data, error } = useBackend(
    [`/api/jobs/logs/${id}`],  // Use dynamic URL to fetch the log for the job with this ID
    { method: "GET", url: `/api/jobs/logs/${id}` }, // API call to fetch the log
    []
  );

  useEffect(() => {
    if (data) {
      setLog(data.logOutput); // Assuming the API returns the log output in 'logOutput'
    }
  }, [data]);

  // Handle error state
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
