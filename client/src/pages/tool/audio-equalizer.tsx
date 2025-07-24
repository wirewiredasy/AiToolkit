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
      description="Adjust audio frequencies with a 10-band equalizer"
      icon={<Settings className="w-8 h-8" />}
      endpoint="/api/tools/audio-equalizer"
      acceptedFiles={{ "audio/*": [".mp3", ".wav", ".m4a", ".flac", ".ogg"] }}
    />
  );
}