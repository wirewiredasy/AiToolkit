import { useState } from "react";
import { ToolTemplate } from "@/components/ui/tool-template";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Upload, FileDown, Settings, RotateCcw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function AudioEqualizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [frequencies, setFrequencies] = useState({
    '32': [0],
    '64': [0],
    '125': [0],
    '250': [0],
    '500': [0],
    '1k': [0],
    '2k': [0],
    '4k': [0],
    '8k': [0],
    '16k': [0]
  });

  const presets = {
    flat: { '32': 0, '64': 0, '125': 0, '250': 0, '500': 0, '1k': 0, '2k': 0, '4k': 0, '8k': 0, '16k': 0 },
    bass: { '32': 6, '64': 4, '125': 2, '250': 0, '500': -1, '1k': -2, '2k': -1, '4k': 0, '8k': 1, '16k': 2 },
    treble: { '32': -2, '64': -1, '125': 0, '250': 1, '500': 2, '1k': 3, '2k': 4, '4k': 5, '8k': 6, '16k': 6 },
    voice: { '32': -3, '64': -2, '125': 1, '250': 3, '500': 4, '1k': 4, '2k': 3, '4k': 1, '8k': 0, '16k': -1 }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const applyPreset = (preset: keyof typeof presets) => {
    const newFreq = { ...frequencies };
    Object.entries(presets[preset]).forEach(([freq, value]) => {
      newFreq[freq as keyof typeof frequencies] = [value];
    });
    setFrequencies(newFreq);
  };

  const resetEQ = () => {
    applyPreset('flat');
  };

  const processFile = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('eq_settings', JSON.stringify(frequencies));

      const response = await apiRequest('/api/tools/audio-equalizer', {
        method: 'POST',
        body: formData,
      });

      setResult(response.downloadUrl || '/placeholder-result.mp3');
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolTemplate
      toolId="audio-equalizer"
      toolName="Audio Equalizer"
      endpoint="/api/tools/audio-equalizer"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <input
            type="file"
            accept=".mp3,.wav,.m4a,.flac,.ogg"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-400 hover:text-blue-300"
          >
            Choose audio file
          </label>
          {file && (
            <p className="mt-2 text-sm text-gray-300">
              Selected: {file.name}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Equalizer</h3>
            <Button onClick={resetEQ} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {Object.entries(frequencies).map(([freq, value]) => (
              <div key={freq} className="space-y-2">
                <div className="text-xs text-center text-gray-400">{freq}Hz</div>
                <div className="h-32 flex items-center justify-center">
                  <Slider
                    value={value}
                    onValueChange={(newValue) => setFrequencies(prev => ({ ...prev, [freq]: newValue }))}
                    max={12}
                    min={-12}
                    step={0.5}
                    orientation="vertical"
                    className="h-full"
                  />
                </div>
                <div className="text-xs text-center text-gray-300">{value[0]}dB</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(presets).map((preset) => (
              <Button
                key={preset}
                variant="outline"
                onClick={() => applyPreset(preset as keyof typeof presets)}
                className="capitalize"
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={processFile}
          disabled={!file || processing}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {processing ? 'Applying EQ...' : 'Apply Equalizer'}
        </Button>

        {result && (
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <h3 className="font-semibold text-green-400 mb-2">Equalization Applied Successfully!</h3>
            <Button
              onClick={() => window.open(result, '_blank')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <FileDown className="w-4 h-4" />
              Download Equalized Audio
            </Button>
          </div>
        )}
      </div>
    </ToolTemplate>
  );
}