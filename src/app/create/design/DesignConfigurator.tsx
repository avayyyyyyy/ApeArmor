"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import NextImage from "next/image";
import PhontTemplate from "@/public/assets/phone-template.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Rnd } from "react-rnd";
import HandleComponent from "@/components/HandleComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronsUpDownIcon,
  Loader2,
  Loader2Icon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthings";
import { useMutation } from "@tanstack/react-query";
import updateConfig from "./actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ProgressContext } from "@/ContextAPI/ProgressBarContext";

const models = [
  "iPhone 15 Pro Max",
  "iPhone 14 Pro Max",
  "iPhone 13 Pro Max",
  "iPhone 12 Pro Max",
  "iPhone 11 Pro Max",
];

interface DesignConfiguratorProps {
  configId: string;
  imageUrl: string;
  imageDimension: { width: number; height: number };
}

function DesignConfigurator({
  configId,
  imageUrl,
  imageDimension,
}: DesignConfiguratorProps) {
  const [progress, setProgress] = useContext(ProgressContext);
  const [selectedColor, setSelectedColor] = useState("orange");
  const [freeMaterial, setFreeMaterial] = useState(true);
  const [smoothFinish, setSmoothFinish] = useState(true);
  const [value, setValue] = useState("Select iPhone Model");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const [price, setPrice] = useState("$14.00");
  const [renderDimension, setRenderDimension] = useState({
    width: imageDimension.width / 4,
    height: imageDimension.height / 4,
  });
  const { startUpload } = useUploadThing("imageUploader");
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);

  const [renderPosition, setRenderPosition] = useState({
    x: 150,
    y: 205,
  });

  const colors = ["blue", "orange", "green"];
  const router = useRouter();

  const handleClick = () => {
    if (value === "Select iPhone Model") {
      return toast({
        title: "Select your iPhone Model",
        description: "You haven't selected your model yet.",
        variant: "destructive",
      });
    } else if (!requestSubmitted) {
      setRequestSubmitted(true);
      saveConfig();
    }
  };

  const { mutate: saveConfig } = useMutation({
    mutationKey: ["saving-Config"],
    mutationFn: async () => {
      await saveConfiguration();
    },
  });

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const saveConfiguration = async () => {
    try {
      const {
        top: caseTop,
        left: caseLeft,
        height,
        width,
      } = phoneCaseRef.current!.getBoundingClientRect();
      const { left: containerLeft, top: containerTop } =
        mainContainerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderPosition.x - leftOffset;
      const actualY = renderPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderDimension.width,
        renderDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", {
        type: "image/png",
      });

      console.log("Uploading file...");

      setProgress(44.44);

      const uploaded = await startUpload([file], { configId });

      if (!uploaded) {
        setRequestSubmitted(false);
        return toast({
          title: "Something went wrong.",
          description: "Unale to upload",
          variant: "destructive",
        });
      }

      const updated = await updateConfig({
        configId,
        freeMaterial,
        selectedColor,
        smoothFinish,
        value,
        croppedImageUrl: uploaded?.[0]?.url ?? "",
      });
      setProgress(69.66);
      console.log(updated);
      toast({
        title: "Configuraions saved successfully!",
        description: "Redirecting you to the checkout page.",
      });
      router.push(`/create/design/preview?id=${configId}`);
      console.log("Configuration updated successfully.");
      return uploaded;
    } catch (error) {
      console.error("Error occurred while saving configuration:", error);
      throw new Error("Error occurred while saving configuration");
    }
  };

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  useEffect(() => {
    let newPrice = 14.0;
    if (!freeMaterial) {
      newPrice += 5.0;
    }
    if (!smoothFinish) {
      newPrice += 3.0;
    }
    setPrice(`$${newPrice.toFixed(2)}`);
  }, [freeMaterial, smoothFinish]);

  return (
    <div className="relative lg:flex-row flex-col flex mt-16 items-center justify-center">
      <div
        ref={mainContainerRef}
        className="relative h-[43.8rem] lg:shadow-xl shadow lg:w-[50vw] w-full overflow-hidden col-span-2 flex items-center justify-center rounded-l-lg border-dashed border-2 border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ratio={896 / 1831}
            ref={phoneCaseRef}
            className="pointer-events-none z-50 aspect-[896/1831] w-full"
          >
            <NextImage
              src={PhontTemplate}
              className="pointer-events-none z-50 select-none"
              alt="Phone Image"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px bottom-px right-[3px] rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              `absolute inset-0 left-[3px] top-px bottom-px right-[3px] rounded-[32px]`,
              `${selectedColor === "orange" ? "bg-orange-700" : null}`,
              `${selectedColor === "blue" ? "bg-blue-700" : null}`,
              `${selectedColor === "green" ? "bg-green-700" : null}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimension.height / 4,
            width: imageDimension.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
            setRenderPosition({
              x,
              y,
            });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderPosition({ x, y });
          }}
          lockAspectRatio
          className="absolute z-20 border-[3px] border-primary"
          resizeHandleComponent={{
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              className="pointer-events-none"
              alt="Uploaded Image"
              fill
            />
          </div>
        </Rnd>
      </div>
      <div className=" lg:shadow-xl w-full lg:w-[30%]  shadow-md px-5 rounded-r-lg flex flex-col bg-white">
        <ScrollArea className="relative  overflow-hidden flex px-5">
          <h1 className="lg:text-4xl text-3xl mt-4 text-center font-extrabold mx-auto">
            Customize Your Case
          </h1>
          <Separator className="mb-4" />
          <div className="space-y-2">
            <div className="text-lg font-medium">
              Color:{" "}
              <span className="font-bold">
                {selectedColor.replace(
                  selectedColor[0],
                  selectedColor[0].toUpperCase()
                )}
              </span>
            </div>
            <fieldset className="flex px-2 flex-wrap gap-3">
              <legend className="sr-only">Color</legend>
              {colors.map((e) => (
                <label
                  key={e}
                  htmlFor={e}
                  className={`block size-8 shadow-lg cursor-pointer mb-3 rounded-full ${
                    e === "orange" ? "bg-orange-600" : ""
                  } ${e === "blue" ? "bg-blue-600" : ""} ${
                    e === "green" ? "bg-green-600" : ""
                  } shadow-sm ${
                    selectedColor === e
                      ? `ring-2 ring-${e}-500 ring-offset-2`
                      : ""
                  } ${
                    selectedColor === "orange" && e === "orange"
                      ? "ring-orange-700 bg-orange-600"
                      : ""
                  } ${
                    selectedColor === "blue" && e === "blue"
                      ? "ring-blue-700 bg-blue-600"
                      : ""
                  } ${
                    selectedColor === "green" && e === "green"
                      ? "ring-green-600"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="ColorOption"
                    value={e}
                    id={e}
                    className="sr-only"
                    checked={selectedColor === e}
                    onChange={() => handleColorChange(e)}
                  />
                  <span className="sr-only">{e}</span>
                </label>
              ))}
            </fieldset>
            <div className="text-lg font-medium">Model:</div>
            <Label className="sr-only">Model</Label>
            <div className="mx-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className=" py-2">
                  <Button className="w-full justify-between" variant="outline">
                    {value}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]">
                  <DropdownMenuLabel>iPhone Models</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {models.map((phone) => {
                    return (
                      <DropdownMenuItem
                        onSelect={() => {
                          setValue(phone);
                        }}
                        key={phone}
                      >
                        {phone}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <fieldset className="px-px mt-4">
            <div className="text-lg font-medium mb-1">Material:</div>
            <legend className="sr-only">Material</legend>
            <div>
              <label
                htmlFor="DeliveryStandard"
                className="flex cursor-pointer mb-4 items-center justify-between gap-4 rounded-lg border-gray-300 bg-white p-4 text-sm border-2 font-medium shadow-sm has-[:checked]:border-primary has-[:checked]:border-2 has-[:checked]:ring-0 has-[:checked]:ring-border-primary"
              >
                <p className="text-gray-900">Silicon</p>
                <p className="text-gray-600">+$0.00</p>
                <input
                  type="radio"
                  name="MaterialOption"
                  value="Silicon"
                  id="DeliveryStandard"
                  className="sr-only"
                  checked={freeMaterial}
                  onClick={() => setFreeMaterial(true)}
                />
              </label>
            </div>
            <div>
              <label
                htmlFor="DeliveryPriority"
                className="flex cursor-pointer mb-4 items-center justify-between gap-4 rounded-lg border-gray-300 bg-white p-4 text-sm border-2 font-medium shadow-sm has-[:checked]:border-primary has-[:checked]:border-2 has-[:checked]:ring-0 has-[:checked]:ring-border-primary"
              >
                <p className="text-gray-900">Soft Polycarbonate</p>
                <p className="text-gray-600">+$5.00</p>
                <input
                  type="radio"
                  name="MaterialOption"
                  value="Soft Polycarbonate"
                  id="DeliveryPriority"
                  className="sr-only"
                  onClick={() => setFreeMaterial(false)}
                  checked={!freeMaterial}
                />
              </label>
            </div>
          </fieldset>
          <fieldset className="px-px my-4">
            <div className="text-lg font-medium mb-1">Finish:</div>
            <legend className="sr-only">Finish</legend>
            <div>
              <label
                htmlFor="smoothFinish"
                className="flex cursor-pointer mb-4 items-center justify-between gap-4 rounded-lg border-gray-300 bg-white p-4 text-sm border-2 font-medium shadow-sm has-[:checked]:border-primary has-[:checked]:border-2 has-[:checked]:ring-0 has-[:checked]:ring-border-primary"
              >
                <p className="text-gray-900">Smooth Finish</p>
                <p className="text-gray-600">+$0.00</p>
                <input
                  type="radio"
                  name="FinishOption"
                  value="Smooth Finish"
                  id="smoothFinish"
                  className="sr-only"
                  checked={smoothFinish}
                  onClick={() => setSmoothFinish(true)}
                />
              </label>
            </div>
            <div className="">
              <label
                htmlFor="texturedFinish"
                className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border-gray-300 bg-white p-4 text-sm border-2 font-medium shadow-sm has-[:checked]:border-primary has-[:checked]:border-2 has-[:checked]:ring-0 has-[:checked]:ring-border-primary"
              >
                <p className="text-gray-900">Textured Finish</p>
                <p className="text-gray-600">+$3.00</p>
                <input
                  type="radio"
                  name="FinishOption"
                  value="Textured Finish"
                  id="texturedFinish"
                  className="sr-only"
                  checked={!smoothFinish}
                  onClick={() => setSmoothFinish(false)}
                />
              </label>
            </div>
          </fieldset>
        </ScrollArea>
        <div className="flex border-primary border-t-2 py-4  items-center justify-between">
          <div className="text-2xl font-bold">{price}</div>
          <Button
            disabled={requestSubmitted}
            onClick={() => handleClick()}
            className="flex items-center gap-px"
          >
            <span>
              {requestSubmitted ? (
                <Loader2Icon
                  size={16}
                  className={`animate-spin className="mr-2"`}
                />
              ) : null}
            </span>
            Checkout{" "}
            <span>
              <ArrowRight size={18} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DesignConfigurator;
