import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileDown, Image } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function VideoWatermarkPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [watermarkFile, setWatermarkFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [position, setPosition] = useState<string>("bottom-right");
  const [opacity, setOpacity] = useState<number>(50);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleWatermarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setWatermarkFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!videoFile || !watermarkFile) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('watermark', watermarkFile);
      formData.append('position', position);
      formData.append('opacity', opacity.toString());

      const response = await apiRequest('/api/tools/video-watermark', {
        method: 'POST',
        body: formData,
      });

      setResult(response.downloadUrl);
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolTemplate
      title="Video Watermark"
      description="Add watermarks to video files for branding and protection"
      icon={<Image className="w-8 h-8" />}
      category="Video Tools"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".mp4,.avi,.mov,.mkv,.webm"
            onChange={handleVideoChange}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose video file
          </label>
          {videoFile && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {videoFile.name}
            </p>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            onChange={handleWatermarkChange}
            className="hidden"
            id="watermark-upload"
          />
          <label
            htmlFor="watermark-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose watermark image
          </label>
          {watermarkFile && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {watermarkFile.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Position</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            >
              <option value="top-left">Top Left</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-right">Bottom Right</option>
              <option value="center">Center</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Opacity: {opacity}%
            </label>
            <Input
              type="range"
              min="10"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="bg-gray-700"
            />
          </div>
        </div>

        <Button
          onClick={processFile}
          disabled={!videoFile || !watermarkFile || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Adding Watermark...' : 'Add Watermark to Video'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Watermark Added Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Watermarked Video
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}