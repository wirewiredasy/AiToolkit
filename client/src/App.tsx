import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import Layout from "@/components/layout/layout";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/auth/login";
import Signup from "@/pages/auth/signup";
import PDFToolkit from "@/pages/toolkit/pdf";
import ImageToolkit from "@/pages/toolkit/image";
import MediaToolkit from "@/pages/toolkit/media";
import GovernmentToolkit from "@/pages/toolkit/government";
import PDFMerger from "@/pages/tool/pdf-merger";
import PDFToWord from "@/pages/tool/pdf-to-word";
import PDFSplitter from "@/pages/tool/pdf-splitter";
import PDFCompressor from "@/pages/tool/pdf-compressor";
import WordToPDF from "@/pages/tool/word-to-pdf";
import ExcelToPDF from "@/pages/tool/excel-to-pdf";
import PPTToPDF from "@/pages/tool/ppt-to-pdf";
import ImageResizer from "@/pages/tool/image-resizer";
import BackgroundRemover from "@/pages/tool/bg-remover";
import ImageCompressor from "@/pages/tool/image-compressor";
import ImageFormatConverter from "@/pages/tool/image-format-converter";
import AudioConverter from "@/pages/tool/audio-converter";
import AudioTrimmer from "@/pages/tool/audio-trimmer";
import VideoConverter from "@/pages/tool/video-converter";
import VideoToAudio from "@/pages/tool/video-to-audio";
import WatermarkRemover from "@/pages/tool/watermark-remover";
import PhotoEnhancer from "@/pages/tool/photo-enhancer";
import PDFToExcel from "@/pages/tool/pdf-to-excel";
import QRGenerator from "@/pages/tool/qr-generator";
import BarcodeGenerator from "@/pages/tool/barcode-generator";
import PANValidator from "@/pages/tool/pan-validator";
import GSTValidator from "@/pages/tool/gst-validator";
import AadhaarValidator from "@/pages/tool/aadhaar-validator";
import NotFound from "@/pages/not-found";
import HelpCenter from "@/pages/help";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import AllTools from "@/pages/all-tools";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/all-tools" component={AllTools} />

      {/* Toolkit pages */}
      <Route path="/toolkit/pdf" component={PDFToolkit} />
      <Route path="/toolkit/image" component={ImageToolkit} />
      <Route path="/toolkit/media" component={MediaToolkit} />
      <Route path="/toolkit/government" component={GovernmentToolkit} />

      {/* Individual tool pages */}
      {/* PDF Tools */}
      <Route path="/tool/pdf-merger" component={PDFMerger} />
      <Route path="/tool/pdf-to-word" component={PDFToWord} />
      <Route path="/tool/pdf-splitter" component={PDFSplitter} />
      <Route path="/tool/pdf-compressor" component={PDFCompressor} />
      <Route path="/tool/word-to-pdf" component={WordToPDF} />
      <Route path="/tool/excel-to-pdf" component={ExcelToPDF} />
      <Route path="/tool/ppt-to-pdf" component={PPTToPDF} />
      <Route path="/tool/pdf-to-excel" component={PDFToExcel} />

      {/* Image Tools */}
      <Route path="/tool/image-resizer" component={ImageResizer} />
      <Route path="/tool/bg-remover" component={BackgroundRemover} />
      <Route path="/tool/image-compressor" component={ImageCompressor} />
      <Route path="/tool/image-format-converter" component={ImageFormatConverter} />
      <Route path="/tool/watermark-remover" component={WatermarkRemover} />
      <Route path="/tool/photo-enhancer" component={PhotoEnhancer} />

      {/* Audio/Video Tools */}
      <Route path="/tool/audio-converter" component={AudioConverter} />
      <Route path="/tool/audio-trimmer" component={AudioTrimmer} />
      <Route path="/tool/video-converter" component={VideoConverter} />
      <Route path="/tool/video-to-audio" component={VideoToAudio} />

      {/* Utilities */}
      <Route path="/tool/qr-generator" component={QRGenerator} />
      <Route path="/tool/barcode-generator" component={BarcodeGenerator} />

      {/* Government Validators */}
      <Route path="/tool/pan-validator" component={PANValidator} />
      <Route path="/tool/gst-validator" component={GSTValidator} />
      <Route path="/tool/aadhaar-validator" component={AadhaarValidator} />

      {/* Footer Pages */}
      <Route path="/help" component={HelpCenter} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />

      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;