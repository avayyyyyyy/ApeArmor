"use client";
import Dropzone, { DropzoneState, FileRejection } from "react-dropzone";
import { startTransition, useContext, useState } from "react";
import { Loader } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthings";
import { useRouter } from "next/navigation";
import { ProgressContext } from "@/ContextAPI/ProgressBarContext";
import { useToast } from "./ui/use-toast";

export function FileUpload() {
  const { toast } = useToast();

  const [redirecting, setRedirecting] = useState(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [dragAccepted, setDragAccepted] = useState<boolean>(false);

  const [progress, setProgress] = useContext(ProgressContext);

  const router = useRouter();

  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      try {
        const configID = data.serverData.configId;
        startTransition(() => {
          router.push(`/create/design?id=${configID}`);
        });
      } catch (error) {
        setProgress(0);
        setRedirecting(false);
        setDragAccepted(false);
        toast({
          variant: "destructive",
          title: `File not uploaded`,
          description: "Please try again.. ",
        });
      }
    },
    onUploadProgress(p) {
      if (p == 100) {
        setProgress(33.33);
      }
    },
  });

  const onDropAccepted = async (acceptedFile: File[]) => {
    try {
      console.log("Accepted");
      setDragAccepted(true);
      setProgress(11.11);


      const fileUpload = await startUpload(acceptedFile, {
        configId: undefined,
      });

      setRedirecting(true);

      if (!fileUpload) {
        setProgress(0);
        setRedirecting(false);
        setDragAccepted(false);
        return toast({
          variant: "destructive",
          title: `File not uploaded`,
          description: "Please try again.. ",
        });
      }


      setProgress(22.22);
      setIsDragOver(false);
    } catch (err) {
      setProgress(0);
      setRedirecting(false);
      setDragAccepted(false);
      toast({
        variant: "destructive",
        title: `File not uploaded`,
        description: "Please try again.. ",
      });
    }
  };
  const onDropRejected = (rejectedFile: FileRejection[]) => {
    const [file] = rejectedFile;
    setIsDragOver(false);
    toast({
      variant: "destructive",
      title: `${file.file.type || "This file"} is not supported!`,
      description: "Please choose a JPG,JPEG,or a PNG file. ",
    });
  };

  return (
    <>
      {dragAccepted ? (
        <Loading redirecting={redirecting} />
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-[80vw] border border-primary max-w-md space-y-6 rounded-lg bg-primary-foreground p-6 shadow-lg dark:bg-gray-950">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-gray-50">
                Upload Your Images
              </h1>
              <p className="mt-2 text-base  text-gray-500 dark:text-gray-400">
                Drag and drop your images or click to select.
              </p>
            </div>
            <Dropzone
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
              onDrop={(acceptedFiles) => console.log(acceptedFiles)}
              accept={{
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
              }}
              onDragEnter={() => setIsDragOver(true)}
              onDragLeave={() => setIsDragOver(false)}
            >
              {({ getRootProps, getInputProps }) => (
                <div>
                  <div className="flex justify-center" {...getRootProps()}>
                    <label
                      className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-gray-500 transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-gray-500 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      htmlFor="file-upload"
                    >
                      <div className="text-center">
                        <UploadIcon
                          className="mx-auto h-8 w-8"
                          {...getInputProps()}
                        />
                        <span className="mt-2 block text-base font-medium">
                          {isDragOver
                            ? "Drop it here!"
                            : "Drop images to upload."}
                        </span>
                      </div>
                      <input
                        accept="image/*"
                        className="sr-only"
                        id="file-upload"
                        multiple
                        type="file"
                      />
                    </label>
                  </div>
                </div>
              )}
            </Dropzone>
          </div>
        </div>
      )}
    </>
  );
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function Loading({ redirecting }: { redirecting: boolean }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[80vw] border border-primary max-w-md space-y-6 rounded-lg bg-primary-foreground p-6 shadow-lg dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-3xl flex items-center justify-center font-bold tracking-tight text-foreground dark:text-gray-50">
            Loading...{" "}
            <span>
              <Loader size={30} className="animate-spin text-foreground" />
            </span>
          </h1>

          <p className="mt-2 text-base  text-gray-500 dark:text-gray-400">
            {redirecting
              ? "Redirecting, Please wait."
              : "Uploading your image, Please wait."}
          </p>
        </div>
      </div>
    </div>
  );
}
