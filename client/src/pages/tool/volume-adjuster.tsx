import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Upload, FileDown, Volume2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function VolumeAdjusterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [volume, setVolume] = useState<number[]>([100]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('volume', volume[0].toString());

      const response = await apiRequest('/api/tools/volume-adjuster', {
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
      title="Volume Adjuster"
      description="Adjust audio volume levels in audio and video files"
      icon={<Volume2 className="w-8 h-8" />}
      category="Audio Tools"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".mp3,.wav,.m4a,.mp4,.avi,.mov,.mkv"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose audio/video file
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Volume Level</h3>
          <div className="space-y-4">
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={300}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="text-center text-gray-300">
              <span className="text-lg font-medium">{volume[0]}%</span>
              <div className="text-sm text-gray-400 mt-1">
                {volume[0] < 50 && "Quiet"}
                {volume[0] >= 50 && volume[0] <= 150 && "Normal"}
                {volume[0] > 150 && "Loud"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 100, 200].map((preset) => (
            <Button
              key={preset}
              variant="outline"
              onClick={() => setVolume([preset])}
              className="text-xs"
            >
              {preset}%
            </Button>
          ))}
        </div>

        <Button
          onClick={processFile}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Adjusting Volume...' : 'Adjust Volume'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Volume Adjusted Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Adjusted File
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}