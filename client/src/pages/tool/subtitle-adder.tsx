import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileDown, Subtitles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function SubtitleAdderPage() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [manualSubtitles, setManualSubtitles] = useState<string>("");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubtitleFile(e.target.files[0]);
    }
  };

  const processFile = async () => {
    if (!videoFile) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      
      if (subtitleFile) {
        formData.append('subtitle', subtitleFile);
      } else if (manualSubtitles.trim()) {
        formData.append('manualSubtitles', manualSubtitles);
      }

      const response = await apiRequest('/api/tools/subtitle-adder', {
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
      title="Subtitle Adder"
      description="Add subtitles to video files from SRT files or manual input"
      icon={<Subtitles className="w-8 h-8" />}
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Subtitle Source</h3>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center bg-gray-800">
            <Subtitles className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              accept=".srt,.vtt,.ass"
              onChange={handleSubtitleChange}
              className="hidden"
              id="subtitle-upload"
            />
            <label
              htmlFor="subtitle-upload"
              className="cursor-pointer text-blue-400 hover:text-blue-300"
            >
              Upload subtitle file (.srt, .vtt, .ass)
            </label>
            {subtitleFile && (
              <p className="mt-2 text-sm text-gray-300">
                Selected: {subtitleFile.name}
              </p>
            )}
          </div>

          <div className="text-center text-gray-400">OR</div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Manual Subtitles (SRT format)
            </label>
            <Textarea
              value={manualSubtitles}
              onChange={(e) => setManualSubtitles(e.target.value)}
              placeholder={`1
00:00:00,000 --> 00:00:05,000
Your subtitle text here

2
00:00:05,000 --> 00:00:10,000
Next subtitle text`}
              rows={8}
              className="bg-gray-700 border-gray-600"
            />
          </div>
        </div>

        <Button
          onClick={processFile}
          disabled={!videoFile || (!subtitleFile && !manualSubtitles.trim()) || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Adding Subtitles...' : 'Add Subtitles to Video'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Subtitles Added Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Video with Subtitles
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}