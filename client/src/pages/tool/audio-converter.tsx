import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import FileUpload from '@/components/ui/file-upload';
import ProgressIndicator from '@/components/ui/progress-indicator';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { authService } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const convertSchema = z.object({
  format: z.enum(['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac']),
  quality: z.number().min(0).max(100),
  bitrate: z.enum(['128', '192', '256', '320']),
});

type ConvertInput = z.infer<typeof convertSchema>;

interface ConvertResult {
  success: boolean;
  message: string;
  downloadUrl: string;
  processingTime: number;
  originalFormat: string;
  newFormat: string;
  fileSize: number;
}

export default function AudioConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm<ConvertInput>({
    resolver: zodResolver(convertSchema),
    defaultValues: {
      format: 'mp3',
      quality: 80,
      bitrate: '192',
    },
  });

  const convertMutation = useMutation({
    mutationFn: async (data: { file: File; options: ConvertInput }) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in to use this tool');
      }

      const formData = new FormData();
      formData.append('audio', data.file);
      formData.append('format', data.options.format);
      formData.append('quality', data.options.quality.toString());
      formData.append('bitrate', data.options.bitrate);

      const response = await fetch('/api/tools/audio/convert', {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Audio conversion failed');
      }

      return response.json();
    },
    onSuccess: (data: ConvertResult) => {
      setResult(data);
      toast({
        title: 'Success!',
        description: 'Your audio has been converted successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Conversion Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const audioTypes = [
      'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 
      'audio/aac', 'audio/m4a', 'audio/flac', 'audio/x-wav'
    ];
    
    if (!audioTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|aac|m4a|flac)$/i)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a valid audio file (MP3, WAV, OGG, AAC, M4A, or FLAC).',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);
  };

  const onSubmit = (data: ConvertInput) => {
    if (!selectedFile) {
      toast({
        title: 'No File Selected',
        description: 'Please select an audio file first.',
        variant: 'destructive',
      });
      return;
    }
    convertMutation.mutate({ file: selectedFile, options: data });
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      const extension = form.getValues('format');
      const baseName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'converted';
      link.download = `${baseName}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && result?.downloadUrl) {
      try {
        await navigator.share({
          title: 'Converted Audio - Suntyn AI',
          text: 'I converted my audio file using Suntyn AI',
          url: window.location.href,
        });
      } catch (error) {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link Copied',
          description: 'Page link copied to clipboard',
        });
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Page link copied to clipboard',
      });
    }
  };

  const formatDescriptions = {
    mp3: 'Most popular format, good compression',
    wav: 'Uncompressed, highest quality',
    ogg: 'Open source, good compression',
    aac: 'Advanced compression, Apple/iTunes',
    m4a: 'Apple format, good for podcasts',
    flac: 'Lossless compression, audiophile quality',
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Media Toolkit', href: '/toolkit/media' },
    { label: 'Audio Converter' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="py-8 bg-neutral-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav items={breadcrumbItems} />
          
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <i className="fas fa-lock text-4xl text-neutral-300 mb-4"></i>
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-neutral-600 mb-6">Please sign in to use the Audio Converter tool.</p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BreadcrumbNav items={breadcrumbItems} />

        {/* Tool Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-music text-3xl text-green-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Convert Audio Files</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Convert your audio files between different formats with customizable quality settings. 
            Perfect for compatibility across different platforms and devices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <FileUpload
              onFileSelect={handleFileSelect}
              accept="audio/*,.mp3,.wav,.ogg,.aac,.m4a,.flac"
              multiple={false}
              maxSize={50}
              className="mb-6"
            />

            {/* File Info */}
            {selectedFile && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-neutral-800 mb-3">Selected Audio File</h3>
                  <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
                    <i className="fas fa-music text-green-600 text-xl"></i>
                    <div className="flex-1">
                      <div className="font-medium text-neutral-800">{selectedFile.name}</div>
                      <div className="text-sm text-neutral-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Conversion Options */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-800 mb-4">Conversion Settings</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="format"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Output Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select output format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(formatDescriptions).map(([format, description]) => (
                                <SelectItem key={format} value={format}>
                                  <div className="flex flex-col">
                                    <span className="font-medium">{format.toUpperCase()}</span>
                                    <span className="text-sm text-neutral-500">{description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bitrate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bitrate (kbps)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select bitrate" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="128">128 kbps (Standard)</SelectItem>
                              <SelectItem value="192">192 kbps (Good)</SelectItem>
                              <SelectItem value="256">256 kbps (High)</SelectItem>
                              <SelectItem value="320">320 kbps (Maximum)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="quality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quality: {field.value}%</FormLabel>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={10}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="w-full"
                            />
                          </FormControl>
                          <div className="flex justify-between text-sm text-neutral-500">
                            <span>Smaller file</span>
                            <span>Better quality</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={!selectedFile || convertMutation.isPending}
                      className="w-full"
                      size="lg"
                    >
                      {convertMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Converting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-exchange-alt mr-2"></i>
                          Convert Audio
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Format Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-800 mb-4">Supported Formats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Input:</span>
                    <span className="text-neutral-600">MP3, WAV, OGG, AAC, M4A, FLAC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Output:</span>
                    <span className="text-neutral-600">MP3, WAV, OGG, AAC, M4A, FLAC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Max size:</span>
                    <span className="text-neutral-600">50 MB per file</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Indicator */}
        {convertMutation.isPending && (
          <ProgressIndicator
            message="Converting your audio file..."
            description={`Converting to ${form.getValues('format').toUpperCase()} format`}
            className="mt-8"
          />
        )}

        {/* Result Section */}
        {result && (
          <Card className="mt-8">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Audio Converted Successfully!
              </h3>
              <p className="text-neutral-600 mb-4">
                Your audio has been converted from {result.originalFormat?.toUpperCase()} to {result.newFormat?.toUpperCase()} format.
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                Processing time: {(result.processingTime / 1000).toFixed(1)}s • File size: {(result.fileSize / (1024 * 1024)).toFixed(2)} MB
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownload} size="lg">
                  <i className="fas fa-download mr-2"></i>
                  Download Converted Audio
                </Button>
                <Button variant="outline" onClick={handleShare} size="lg">
                  <i className="fas fa-share mr-2"></i>
                  Share Result
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-neutral-800 mb-8 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Upload Audio</h4>
              <p className="text-neutral-600">
                Select your audio file. We support all major audio formats.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Choose Settings</h4>
              <p className="text-neutral-600">
                Select output format, bitrate, and quality based on your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Download Result</h4>
              <p className="text-neutral-600">
                Get your converted audio file optimized for your target platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
