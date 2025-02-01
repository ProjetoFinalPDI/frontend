import { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as cornerstone from "cornerstone-core";
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';

const HomePage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [dicomFile, setDicomFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setDicomFile(file);

    // Read and display the DICOM image using Cornerstone
    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
    cornerstone.loadImage(imageId).then((image) => {
      if (imageRef.current) {
        cornerstone.enable(imageRef.current);
        cornerstone.displayImage(imageRef.current, image);
        setImage(imageId); // Set the image ID for reference
      }
    });
  };

  const sendFileToServer = async () => {
    if (!dicomFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(dicomFile);
    reader.onload = async () => {
      const base64 = reader.result as string;

      try {
        const response = await axios.post("/api/upload-dicom", { file: base64 });
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    };
  };

  // Cleanup Cornerstone on component unmount
  useEffect(() => {
    return () => {
      if (imageRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        cornerstone.disable(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-gray-300 h-screen w-full flex flex-col gap-8 items-center justify-center py-8">
      {/* Image Selection Area */}
      <div
        onClick={() => document.getElementById("dicom-upload")?.click()}
        className="border-2 border-dashed rounded-lg p-6 cursor-pointer border-gray-400 h-40 w-40 transition-colors"
      >
        {image ? (
          <div className="relative">
            <div ref={imageRef} className="w-full h-full">
              {/* Cornerstone will render the DICOM image here */}
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">
              Click to change image
            </p>
          </div>
        ) : (
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-500">
              Click to select DICOM image
            </p>
          </div>
        )}
        <input
          id="dicom-upload"
          type="file"
          accept=".dcm"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      <button
        onClick={sendFileToServer}
        disabled={!dicomFile}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        Send DICOM to Server
      </button>
    </div>
  );
};

export default HomePage;
