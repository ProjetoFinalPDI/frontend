import { useState, useEffect, useMemo } from "react";
import { Download, Settings2 } from "lucide-react";
import { MdOutlineDownloading } from "react-icons/md";
import { init as coreInit, imageLoader } from "@cornerstonejs/core";
import {
  init as dicomImageLoaderInit,
  wadouri,
} from "@cornerstonejs/dicom-image-loader";
import DICOMViewer from "@/components/dicom-viewer";
import {
  applyWindowing,
  drawImageWithContours,
  downloadImage,
  saveContoursAsCSV,
  colorizePixelData,
} from "@/utils/image";
import { ImageData } from "@/types/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { useParameters } from "@/hooks/use-parameters";
import useLanguage from "@/hooks/use-language";
import useTheme from "@/hooks/use-theme";

coreInit();
dicomImageLoaderInit();

const ResultsSection = () => {
  const [classImageSrc, setClassImageSrc] = useState<string | null>(null);
  const [showColorizedImage, setShowColorizedImage] = useState<boolean>(false);
  const [drawOnOriginal, setDrawOnOriginal] = useState<boolean>(true);
  const [showPreprocessed, setShowPreprocessed] = useState<boolean>(false);
  const [showAllContours, setShowAllContours] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { dicomFile, apiResponse } = useParameters();
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const { text } = useLanguage();
  const { theme } = useTheme();

  // Load DICOM image and apply windowing
  useEffect(() => {
    const loadDicomImage = async () => {
      if (!dicomFile) return;
      try {
        const imageId = wadouri.fileManager.add(dicomFile);
        const image = await imageLoader.loadImage(imageId);
        const pixelData = image.getPixelData();
        const normalizedPixelData = applyWindowing(pixelData);
        setImageData({
          pixelData: normalizedPixelData,
          width: image.width,
          height: image.height,
        });
        const colorizedSrc = colorizePixelData(
          pixelData,
          image.width,
          image.height
        );
        setClassImageSrc(colorizedSrc);
      } catch (error) {
        console.error("Error loading DICOM image:", error);
      }
    };

    loadDicomImage();
  }, [dicomFile]);

  // Create the final image with the contours returned from the backend
  const imageSrc = useMemo(() => {
    if (!imageData) return null;
    return drawImageWithContours(
      imageData,
      showAllContours
        ? apiResponse?.todos_os_contornos
        : apiResponse?.contornos_validos,
      drawOnOriginal
    );
  }, [imageData, showAllContours, drawOnOriginal, apiResponse]);

  return (
    <section className="w-full h-full flex gap-40 px-20 pb-2">
      <div className="flex flex-col gap-5 pt-3 w-full">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl font-dm-sans">
            {text.originalImage}
          </h1>

          {classImageSrc && (
            <div className="flex gap-2 items-center">
              <p className="text-lg font-poppins">{text.highlight}:</p>
              <input
                type="checkbox"
                checked={showColorizedImage}
                onChange={(e) => setShowColorizedImage(e.target.checked)}
              />
            </div>
          )}
        </div>
        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          {!showColorizedImage ? (
            <DICOMViewer
              imageData={imageData}
              contours={null}
              drawable={false}
              isPanning={false}
              isDrawing={false}
            />
          ) : (
            <img src={classImageSrc!} className="absolute top-0 left-0 z-0" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5 pt-3 w-full">
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <h1 className="font-bold text-3xl font-dm-sans">
              {text.finalResult}
            </h1>
            {imageData && apiResponse && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings2 size={32} className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-52 font-poppins px-2 flex flex-col gap-1"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.text,
                  }}
                >
                  <div className="flex justify-between">
                    <p>{text.onlyContours}:</p>

                    <input
                      type="checkbox"
                      checked={!drawOnOriginal}
                      onChange={(e) => setDrawOnOriginal(!e.target.checked)}
                      disabled={showPreprocessed}
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <p>{text.preprocessed}:</p>

                    <input
                      type="checkbox"
                      checked={showPreprocessed}
                      onChange={(e) => setShowPreprocessed(e.target.checked)}
                      disabled={
                        !drawOnOriginal || !apiResponse.imagem_pre_processada
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <p>{text.allContours}:</p>

                    <input
                      type="checkbox"
                      checked={showAllContours}
                      onChange={(e) => setShowAllContours(e.target.checked)}
                      disabled={showPreprocessed}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            {apiResponse && (
              <DialogTrigger asChild>
                <button className="cursor-pointer flex items-center gap-2 border border-gray-500 px-6 py-2 rounded-4xl font-poppins text-[14px] font-medium hover:border-amber-400 hover:text-amber-400 transition-all">
                  <Download />
                  {text.downloadButton}
                </button>
              </DialogTrigger>
            )}
            <DialogContent
              className="max-w-sm [&_svg:not([class*='size-'])]:size-7"
              style={{ backgroundColor: theme.background, color: theme.text }}
            >
              <DialogHeader className="flex flex-col items-center text-center">
                <MdOutlineDownloading className="size-20 mt-2" />
                <DialogTitle className="text-3xl font-bold font-dm-sans">
                  {text.resultDownloadText}
                </DialogTitle>
                <DialogDescription
                  className="mt-2 font-poppins text-[16px]"
                  style={{ color: theme.text }}
                >
                  {text.resultDownloadDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col justify-center items-center gap-4 mt-4">
                <button
                  onClick={() => {
                    if (dicomFile && imageSrc) {
                      const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                      downloadImage(imageSrc, `${fileName}_result.png`);
                    }
                  }}
                  className="flex justify-center items-center font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer"
                  style={{
                    backgroundColor: theme.buttonBackground,
                    color: theme.buttonText,
                  }}
                >
                  {text.pngButton}
                </button>
                <button
                  onClick={() => {
                    if (dicomFile && apiResponse) {
                      const fileName = dicomFile.name.replace(/\.[^/.]+$/, "");
                      saveContoursAsCSV(
                        showAllContours
                          ? apiResponse.todos_os_contornos
                          : apiResponse.contornos_validos,
                        `contours_${fileName}.csv`
                      );
                    }
                  }}
                  className="flex justify-center items-center font-dm-sans font-bold text-[20px] w-[192px] h-[48px] rounded-3xl px-6 py-4 cursor-pointer border border-gray-800"
                  style={{
                    backgroundColor: theme.buttonSecondaryBackground,
                    color: theme.buttonSecondaryText,
                  }}
                >
                  {text.csvButton}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-full h-full rounded-3xl overflow-hidden">
          {showPreprocessed && apiResponse?.imagem_pre_processada ? (
            <img
              src={`data:image/png;base64,${apiResponse.imagem_pre_processada}`}
              className="absolute top-0 left-0 z-0"
            />
          ) : (
            <DICOMViewer
              imageData={imageData}
              contours={
                showAllContours
                  ? apiResponse?.todos_os_contornos
                  : apiResponse?.contornos_validos
              }
              drawable={false}
              isPanning={false}
              isDrawing={false}
              contoursOnOriginal={drawOnOriginal}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
