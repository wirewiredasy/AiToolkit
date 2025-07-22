import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FileUpload from '@/components/ui/file-upload';
import ProgressIndicator from '@/components/ui/progress-indicator';
import BreadcrumbNav from '@/components/ui/breadcrumb-nav';
import { authService } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface ProcessedFile {
  name: string;
  size: number;
}

interface MergeResult {
  success: boolean;
  message: string;
  downloadUrl: string;
  processingTime: number;
}

export default function PDFMerger() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [result, setResult] = useState<MergeResult | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const mergeMutation = useMutation({
    mutationFn: async (files: File[]) => {
      if (!isAuthenticated) {
        throw new Error('Please sign in to use this tool');
      }

      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files`, file);
      });
      formData.append('filesCount', files.length.toString());

      const response = await fetch('/api/tools/pdf/merge', {
        method: 'POST',
        headers: authService.getAuthHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'PDF merge failed');
      }

      return response.json();
    },
    onSuccess: (data: MergeResult) => {
      setResult(data);
      toast({
        title: 'Success!',
        description: 'Your PDFs have been merged successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Merge Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleFileSelect = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length !== files.length) {
      toast({
        title: 'Invalid Files',
        description: 'Please select only PDF files.',
        variant: 'destructive',
      });
    }
    setSelectedFiles(pdfFiles);
    setResult(null);
  };

  const handleMerge = () => {
    if (selectedFiles.length < 2) {
      toast({
        title: 'Not Enough Files',
        description: 'Please select at least 2 PDF files to merge.',
        variant: 'destructive',
      });
      return;
    }
    mergeMutation.mutate(selectedFiles);
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    const newFiles = [...selectedFiles];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setSelectedFiles(newFiles);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      const link = document.createElement('a');
      link.href = result.downloadUrl;
      link.download = 'merged.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (navigator.share && result?.downloadUrl) {
      try {
        await navigator.share({
          title: 'Merged PDF - Suntyn AI',
          text: 'I merged my PDFs using Suntyn AI',
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
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
    { label: 'PDF Toolkit', href: '/toolkit/pdf' },
    { label: 'PDF Merger' },
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
              <p className="text-neutral-600 mb-6">Please sign in to use the PDF Merger tool.</p>
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
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-compress-alt text-3xl text-red-600"></i>
          </div>
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Merge PDF Files</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Combine multiple PDF documents into one file. Drag and drop your PDFs below to get started.
          </p>
        </div>

        {/* File Upload */}
        <FileUpload
          onFileSelect={handleFileSelect}
          accept=".pdf"
          multiple={true}
          maxSize={25}
          className="mb-8"
        />

        {/* File List */}
        {selectedFiles.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-800">
                  Selected Files ({selectedFiles.length})
                </h3>
                <p className="text-sm text-neutral-500">
                  Drag to reorder • Click × to remove
                </p>
              </div>
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-file-pdf text-red-600 text-xl"></i>
                      <div>
                        <div className="font-medium text-neutral-800">{file.name}</div>
                        <div className="text-sm text-neutral-500">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFile(index, Math.max(0, index - 1))}
                        disabled={index === 0}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        <i className="fas fa-arrow-up"></i>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveFile(index, Math.min(selectedFiles.length - 1, index + 1))}
                        disabled={index === selectedFiles.length - 1}
                        className="text-neutral-400 hover:text-neutral-600"
                      >
                        <i className="fas fa-arrow-down"></i>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-times"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button 
                  onClick={handleMerge} 
                  disabled={selectedFiles.length < 2 || mergeMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {mergeMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Merging PDFs...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-compress-alt mr-2"></i>
                      Merge {selectedFiles.length} PDFs
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Indicator */}
        {mergeMutation.isPending && (
          <ProgressIndicator
            message="Merging your PDFs..."
            description="This may take a few moments depending on file sizes"
            className="mb-8"
          />
        )}

        {/* Result Section */}
        {result && (
          <Card className="mb-8">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-2xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                PDF Merged Successfully!
              </h3>
              <p className="text-neutral-600 mb-6">
                Your files have been combined into a single PDF document.
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                Processing time: {(result.processingTime / 1000).toFixed(1)}s
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleDownload} size="lg">
                  <i className="fas fa-download mr-2"></i>
                  Download Merged PDF
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Upload Files</h4>
              <p className="text-neutral-600">
                Select or drag and drop your PDF files to upload them securely.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Arrange & Merge</h4>
              <p className="text-neutral-600">
                Reorder your files if needed and click merge to combine them.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="font-semibold text-neutral-800 mb-2">Download Result</h4>
              <p className="text-neutral-600">
                Download your merged PDF file or share it with others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
