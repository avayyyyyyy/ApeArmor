import { FileUpload } from "@/components/file-upload";
import UploadSteps from "@/components/UploadSteps";

const page = () => {
  return (
    <div>
      <UploadSteps />
      <FileUpload />
    </div>
  );
};

export default page;
