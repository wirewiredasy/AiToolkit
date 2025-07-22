import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FileUpload from '@/components/ui/file-upload';
import ProgressIndicator from '@/components/ui/progress-indicator';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { authService } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const resizeSchema = z.object({
  width: z.number().min(1, 'Width must be at least 1px').max(10000, 'Width cannot exceed 10,000px'),
  height: z.number().min(1, 'Height must be at least 1px').max(10000, 'Height cannot exceed 10,000px'),
  maintainAspectRatio: z.boolean(),
  resizeMode: z.enum(['exact', 'fit', 'fill']),
});

type ResizeInput = z.infer<typeof resizeSchema>;

interface ResizeResult {
  success: boolean;
  message: string;
  downloadUrl: string;
  processingTime: number;
  originalSize: { width: number; height: number };
  newSize: { width: number; height: number };
}

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<ResizeResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const form = useForm<ResizeInput>({
    resolver: zodResolver(resizeSchema),
    defaultValues: {
      width: 800,
      height: 600,
      maintainAspectRatio: true,
      resizeMode: 'fit',
    },
  });

  const resizeMutation = useMutation({
    mutationFn: async (data: { file: File; options: ResizeInput }) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in to use this tool');
      }

      const formData = new FormData();
      formData.append('image', data.file);
      formData.append('width', data.options.width.toString());
      formData.append('height', data.options.height.toString());
      formData.append('maintainAspectRatio', data.options.maintainAspectRatio.toString());
      formData.append('resizeMode', data.options.resizeMode);

      const response = await fetch('/api/tools/image/resize', {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Image resize failed');
      }

      return response.json();
    },
    onSuccess: (data: ResizeResult) => {
      setResult(data);
      toast({
        title: 'Success!',
        description: 'Your image has been resized successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Resize Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!imageTypes.includes(file.type)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a valid image file (JPEG, PNG, WebP, or GIF).',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Get image dimensions for form defaults
    const img = new Image();
    img.onload = () => {
      form.setValue('width', img.width);
      form.setValue('height', img.height);
    };
    img.src = URL.createObjectURL(file);
  };

  const onSubmit = (data: ResizeInput) => {
    if (!selectedFile) {
      toast({
        title: 'No File Selected',
        description: 'Please select an image file first.',
        variant: 'destructive',
      });
      return;
    }
    resizeMutation.mutate({ file: selectedFile, options: data });
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = `resized-${selectedFile?.name || 'image.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && result?.downloadUrl) {
      try {
        await navigator.share({
          title: 'Resized Image - Suntyn AI',
          text: 'I resized my image using Suntyn AI',
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

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Image Toolkit', href: '/toolkit/image' },
    { label: 'Image Resizer' },
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
              <p className="text-neutral-600 mb-6">Please sign in to use the Image Resizer tool.</p>
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
          <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-expand-arrows-alt text-3xl text-purple-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Resize Images</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Resize your images to any dimension while maintaining quality. Perfect for web optimization, social media, or printing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <FileUpload
              onFileSelect={handleFileSelect}
              accept="image/*"
              multiple={false}
              maxSize={10}
              className="mb-6"
            />

            {/* Image Preview */}
            {imagePreview && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-neutral-800 mb-3">Original Image</h3>
                  <div className="max-w-full overflow-hidden rounded-lg">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-full h-auto"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                  {selectedFile && (
                    <div className="mt-3 text-sm text-neutral-600">
                      <p>{selectedFile.name}</p>
                      <p>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Resize Options */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-800 mb-4">Resize Settings</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="width"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Width (px)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height (px)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="number"
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="resizeMode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resize Mode</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select resize mode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fit">Fit (maintain aspect ratio)</SelectItem>
                              <SelectItem value="fill">Fill (crop if needed)</SelectItem>
                              <SelectItem value="exact">Exact (ignore aspect ratio)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={!selectedFile || resizeMutation.isPending}
                      className="w-full"
                      size="lg"
                    >
                      {resizeMutation.isPending ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Resizing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-expand-arrows-alt mr-2"></i>
                          Resize Image
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Quick Presets */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-neutral-800 mb-4">Quick Presets</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.setValue('width', 1920);
                      form.setValue('height', 1080);
                    }}
                  >
                    HD (1920×1080)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.setValue('width', 1200);
                      form.setValue('height', 630);
                    }}
                  >
                    Facebook Cover
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.setValue('width', 1080);
                      form.setValue('height', 1080);
                    }}
                  >
                    Instagram Post
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.setValue('width', 800);
                      form.setValue('height', 600);
                    }}
                  >
                    Web Standard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Indicator */}
        {resizeMutation.isPending && (
          <ProgressIndicator
            message="Resizing your image..."
            description="Processing your image with the specified dimensions"
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
                Image Resized Successfully!
              </h3>
              <p className="text-neutral-600 mb-4">
                Your image has been resized to {result.newSize?.width}×{result.newSize?.height} pixels.
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                Processing time: {(result.processingTime / 1000).toFixed(1)}s
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownload} size="lg">
                  <i className="fas fa-download mr-2"></i>
                  Download Resized Image
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Upload Image</h4>
              <p className="text-neutral-600">
                Select your image file. We support JPEG, PNG, WebP, and GIF formats.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Set Dimensions</h4>
              <p className="text-neutral-600">
                Enter your desired width and height, or choose from our quick presets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Download Result</h4>
              <p className="text-neutral-600">
                Get your perfectly resized image while maintaining optimal quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
