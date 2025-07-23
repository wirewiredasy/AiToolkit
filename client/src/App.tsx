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
import PDFToWordPage from "@/pages/tool/pdf-to-word";
import PDFSplitterAlternate from "@/pages/tool/pdf-splitter";
import WordToPDFPage from "@/pages/tool/word-to-pdf";
import ExcelToPDFPage from "@/pages/tool/excel-to-pdf";
import PPTToPDFPage from "@/pages/tool/ppt-to-pdf";
import PDFToExcelPage from "@/pages/tool/pdf-to-excel";
import QRGeneratorPage from "@/pages/tool/qr-generator";
import BarcodeGeneratorPage from "@/pages/tool/barcode-generator";
import ImageCompressorPage from "@/pages/tool/image-compressor";
import ImageFormatConverterPage from "@/pages/tool/image-format-converter";
import AudioTrimmerPage from "@/pages/tool/audio-trimmer";
import VideoToAudioPage from "@/pages/tool/video-to-audio";
import WatermarkRemoverPage from "@/pages/tool/watermark-remover";
import PhotoEnhancerPage from "@/pages/tool/photo-enhancer";
import PDFCompressorPage from "@/pages/tool/pdf-compressor";

import PANValidator from "@/pages/tool/pan-validator";
import GSTValidator from "@/pages/tool/gst-validator";
import AadhaarValidator from "@/pages/tool/aadhaar-validator";
import PDFOCRPage from "@/pages/tool/pdf-ocr";
import PDFWatermarkPage from "@/pages/tool/pdf-watermark";
import PDFPasswordRemoverPage from "@/pages/tool/pdf-password-remover";
import PDFPasswordProtectorPage from "@/pages/tool/pdf-password-protector";
import PDFRotatorPage from "@/pages/tool/pdf-rotator";
import PDFCropperPage from "@/pages/tool/pdf-cropper";
import PDFMergerPage from "@/pages/tool/pdf-merger";
import PDFSplitterPage from "@/pages/tool/pdf-splitter";
import ImageEnhancerPage from "@/pages/tool/image-enhancer";
import ImageUpscalerPage from "@/pages/tool/image-upscaler";
import ImageResizerPage from "@/pages/tool/image-resizer";
import BackgroundRemoverPage from "@/pages/tool/bg-remover";
import VideoTrimmerPage from "@/pages/tool/video-trimmer";
import AudioConverterPage from "@/pages/tool/audio-converter";
import VideoConverterPage from "@/pages/tool/video-converter";
import VoterIDValidatorPage from "@/pages/tool/voter-id-validator";
import PassportValidatorPage from "@/pages/tool/passport-validator";
import DrivingLicenseValidatorPage from "@/pages/tool/driving-license-validator";
import IFSCValidatorPage from "@/pages/tool/ifsc-validator";
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
      <Route path="/tool/pdf-to-word" component={PDFToWordPage} />
      <Route path="/tool/pdf-splitter" component={PDFSplitterAlternate} />
      <Route path="/tool/pdf-compressor" component={PDFCompressorPage} />
      <Route path="/tool/word-to-pdf" component={WordToPDFPage} />
      <Route path="/tool/excel-to-pdf" component={ExcelToPDFPage} />
      <Route path="/tool/ppt-to-pdf" component={PPTToPDFPage} />
      <Route path="/tool/pdf-to-excel" component={PDFToExcelPage} />
      <Route path="/tool/pdf-ocr" component={PDFOCRPage} />
      <Route path="/tool/pdf-watermark" component={PDFWatermarkPage} />
      <Route path="/tool/pdf-password-remover" component={PDFPasswordRemoverPage} />
      <Route path="/tool/pdf-password-protector" component={PDFPasswordProtectorPage} />
      <Route path="/tool/pdf-rotator" component={PDFRotatorPage} />
      <Route path="/tool/pdf-cropper" component={PDFCropperPage} />

      {/* Image Tools */}
      <Route path="/tool/image-resizer" component={ImageResizerPage} />
      <Route path="/tool/bg-remover" component={BackgroundRemoverPage} />
      <Route path="/tool/image-compressor" component={ImageCompressorPage} />
      <Route path="/tool/image-format-converter" component={ImageFormatConverterPage} />
      <Route path="/tool/watermark-remover" component={WatermarkRemoverPage} />
      <Route path="/tool/photo-enhancer" component={PhotoEnhancerPage} />
      <Route path="/tool/image-enhancer" component={ImageEnhancerPage} />
      <Route path="/tool/image-upscaler" component={ImageUpscalerPage} />

      {/* Audio/Video Tools */}
      <Route path="/tool/audio-converter" component={AudioConverterPage} />
      <Route path="/tool/audio-trimmer" component={AudioTrimmerPage} />
      <Route path="/tool/video-converter" component={VideoConverterPage} />
      <Route path="/tool/video-to-audio" component={VideoToAudioPage} />
      <Route path="/tool/video-trimmer" component={VideoTrimmerPage} />

      {/* Utilities */}
      <Route path="/tool/qr-generator" component={QRGeneratorPage} />
      <Route path="/tool/barcode-generator" component={BarcodeGeneratorPage} />

      {/* Government Validators */}
      <Route path="/tool/pan-validator" component={PANValidator} />
      <Route path="/tool/gst-validator" component={GSTValidator} />
      <Route path="/tool/aadhaar-validator" component={AadhaarValidator} />
      <Route path="/tool/voter-id-validator" component={VoterIDValidatorPage} />
      <Route path="/tool/passport-validator" component={PassportValidatorPage} />
      <Route path="/tool/driving-license-validator" component={DrivingLicenseValidatorPage} />
      <Route path="/tool/ifsc-validator" component={IFSCValidatorPage} />

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