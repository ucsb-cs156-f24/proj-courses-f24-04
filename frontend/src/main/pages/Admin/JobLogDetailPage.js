import { useParams } from "react-router-dom";
import { useBackend } from "main/utils/useBackend";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

const JobLogDetailPage = () => {
  const { id } = useParams();

  const { data, error} = useBackend(
    [`/api/jobs/logs/${id}`],
    {
      method: "GET",
      url: `/api/jobs/logs/${id}`,
    },
    []
  );

  return (
    
    <BasicLayout>
      <h2 className="p-3">{data}{error}</h2>
      <h2 className="p-3">Job Status</h2>
    </BasicLayout>
  );
};

export default JobLogDetailPage;
