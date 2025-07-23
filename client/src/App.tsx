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
import DeveloperToolkit from "@/pages/toolkit/developer";
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

// New tool imports
import PDFToPowerPointPage from "@/pages/tool/pdf-to-powerpoint";
import PDFPageExtractorPage from "@/pages/tool/pdf-page-extractor";
import PDFPageNumbererPage from "@/pages/tool/pdf-page-numberer";
import ImageConverterPage from "@/pages/tool/image-converter";
import ImageCropperPage from "@/pages/tool/image-cropper";
import ImageRotatorPage from "@/pages/tool/image-rotator";
import ImageColorizerPage from "@/pages/tool/image-colorizer";
import ImageFlipperPage from "@/pages/tool/image-flipper";
import ImageFilterPage from "@/pages/tool/image-filter";
import WatermarkAddPage from "@/pages/tool/watermark-add";
import ImageBlurPage from "@/pages/tool/image-blur";
import MemeGeneratorPage from "@/pages/tool/meme-generator";
import AudioCompressorPage from "@/pages/tool/audio-compressor";
import AudioMergerPage from "@/pages/tool/audio-merger";
import AudioExtractorPage from "@/pages/tool/audio-extractor";
import VolumeChangerPage from "@/pages/tool/volume-changer";
import SpeedChangerPage from "@/pages/tool/speed-changer";
import VideoCompressorPage from "@/pages/tool/video-compressor";
import VideoMergerPage from "@/pages/tool/video-merger";
import VideoToGifPage from "@/pages/tool/video-to-gif";
import GifToVideoPage from "@/pages/tool/gif-to-video";
import AadhaarMaskerPage from "@/pages/tool/aadhaar-masker";
import IncomeCertificatePage from "@/pages/tool/income-certificate";
import AudioNormalizerPage from "@/pages/tool/audio-normalizer";
import ImageSharpenPage from "@/pages/tool/image-sharpen";
import VideoResizerPage from "@/pages/tool/video-resizer";
import NoiseReducerPage from "@/pages/tool/noise-reducer";

// Additional Developer and Utility Tools
import TextToSpeechPage from "@/pages/tool/text-to-speech";
import SpeechToTextPage from "@/pages/tool/speech-to-text";
import PasswordGeneratorPage from "@/pages/tool/password-generator";
import Base64EncoderPage from "@/pages/tool/base64-encoder";
import HashGeneratorPage from "@/pages/tool/hash-generator";
import JSONFormatterPage from "@/pages/tool/json-formatter";
import XMLFormatterPage from "@/pages/tool/xml-formatter";
import MarkdownToHTMLPage from "@/pages/tool/markdown-to-html";
import HTMLToPDFPage from "@/pages/tool/html-to-pdf";
import CSVToJSONPage from "@/pages/tool/csv-to-json";
import URLShortenerPage from "@/pages/tool/url-shortener";
import RegexTesterPage from "@/pages/tool/regex-tester";
import ColorPickerPage from "@/pages/tool/color-picker";
import ColorPaletteGeneratorPage from "@/pages/tool/color-palette-generator";
import LogoGeneratorPage from "@/pages/tool/logo-generator";
import FaviconGeneratorPage from "@/pages/tool/favicon-generator";
import MetaTagGeneratorPage from "@/pages/tool/meta-tag-generator";
import CSSMinifierPage from "@/pages/tool/css-minifier";
import JSMinifierPage from "@/pages/tool/js-minifier";
import LoremIpsumGeneratorPage from "@/pages/tool/lorem-ipsum-generator";
import TimestampConverterPage from "@/pages/tool/timestamp-converter";
import UnicodeConverterPage from "@/pages/tool/unicode-converter";
import UnitConverterPage from "@/pages/tool/unit-converter";
import GradientGeneratorPage from "@/pages/tool/gradient-generator";
import ThumbnailGeneratorPage from "@/pages/tool/thumbnail-generator";

// Additional PDF Tools
// HTMLToPDFPage already imported above

// Additional Image Tools  
import ImageBorderAdderPage from "@/pages/tool/image-border-adder";
import ImageMergePage from "@/pages/tool/image-merge";
import ImageSplitPage from "@/pages/tool/image-split";
import ImageMetadataExtractorPage from "@/pages/tool/image-metadata-extractor";
import ImageEnhancePage from "@/pages/tool/image-enhance";
import ImageUpscalePage from "@/pages/tool/image-upscale";
import ImageFilterEffectsPage from "@/pages/tool/image-filter-effects";
import WatermarkRemovePage from "@/pages/tool/watermark-remove";
import PassportPhotoPage from "@/pages/tool/passport-photo";

// Additional Audio/Video Tools
import AudioReverserPage from "@/pages/tool/audio-reverser";
import VocalRemoverPage from "@/pages/tool/vocal-remover";
import PitchChangerPage from "@/pages/tool/pitch-changer";
import SubtitleExtractorPage from "@/pages/tool/subtitle-extractor";
import VideoRotatorPage from "@/pages/tool/video-rotator";
import VideoSpeedChangerPage from "@/pages/tool/video-speed-changer";

// Additional Government Tools
import BirthCertificatePage from "@/pages/tool/birth-certificate";
import DeathCertificatePage from "@/pages/tool/death-certificate";
import CasteCertificatePage from "@/pages/tool/caste-certificate";
import AffidavitGeneratorPage from "@/pages/tool/affidavit-generator";
import RentAgreementPage from "@/pages/tool/rent-agreement";
import RationCardStatusPage from "@/pages/tool/ration-card-status";

import NotFound from "@/pages/not-found";
import HelpCenter from "@/pages/help";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import AllTools from "@/pages/all-tools";
import AnimatedIconsDemo from "@/pages/animated-icons-demo";




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
      <Route path="/toolkit/developer" component={DeveloperToolkit} />

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
      <Route path="/tool/pdf-to-powerpoint" component={PDFToPowerPointPage} />
      <Route path="/tool/pdf-page-extractor" component={PDFPageExtractorPage} />
      <Route path="/tool/pdf-page-numberer" component={PDFPageNumbererPage} />

      {/* Image Tools */}
      <Route path="/tool/image-resizer" component={ImageResizerPage} />
      <Route path="/tool/bg-remover" component={BackgroundRemoverPage} />
      <Route path="/tool/image-compressor" component={ImageCompressorPage} />
      <Route path="/tool/image-format-converter" component={ImageFormatConverterPage} />
      <Route path="/tool/watermark-remover" component={WatermarkRemoverPage} />
      <Route path="/tool/photo-enhancer" component={PhotoEnhancerPage} />
      <Route path="/tool/image-enhancer" component={ImageEnhancerPage} />
      <Route path="/tool/image-upscaler" component={ImageUpscalerPage} />
      <Route path="/tool/image-converter" component={ImageConverterPage} />
      <Route path="/tool/image-cropper" component={ImageCropperPage} />
      <Route path="/tool/image-rotator" component={ImageRotatorPage} />
      <Route path="/tool/image-colorizer" component={ImageColorizerPage} />
      <Route path="/tool/image-flipper" component={ImageFlipperPage} />
      <Route path="/tool/image-filter" component={ImageFilterPage} />
      <Route path="/tool/watermark-add" component={WatermarkAddPage} />
      <Route path="/tool/image-blur" component={ImageBlurPage} />
      <Route path="/tool/image-sharpen" component={ImageSharpenPage} />
      <Route path="/tool/meme-generator" component={MemeGeneratorPage} />

      {/* Audio/Video Tools */}
      <Route path="/tool/audio-converter" component={AudioConverterPage} />
      <Route path="/tool/audio-trimmer" component={AudioTrimmerPage} />
      <Route path="/tool/video-converter" component={VideoConverterPage} />
      <Route path="/tool/video-to-audio" component={VideoToAudioPage} />
      <Route path="/tool/video-trimmer" component={VideoTrimmerPage} />
      <Route path="/tool/audio-compressor" component={AudioCompressorPage} />
      <Route path="/tool/audio-merger" component={AudioMergerPage} />
      <Route path="/tool/audio-extractor" component={AudioExtractorPage} />
      <Route path="/tool/volume-changer" component={VolumeChangerPage} />
      <Route path="/tool/speed-changer" component={SpeedChangerPage} />
      <Route path="/tool/audio-normalizer" component={AudioNormalizerPage} />
      <Route path="/tool/noise-reducer" component={NoiseReducerPage} />

      <Route path="/tool/video-compressor" component={VideoCompressorPage} />
      <Route path="/tool/video-merger" component={VideoMergerPage} />
      <Route path="/tool/video-resizer" component={VideoResizerPage} />
      <Route path="/tool/video-to-gif" component={VideoToGifPage} />
      <Route path="/tool/gif-to-video" component={GifToVideoPage} />


      {/* Utilities */}
      <Route path="/tool/qr-generator" component={QRGeneratorPage} />
      <Route path="/tool/barcode-generator" component={BarcodeGeneratorPage} />

      {/* Government Validators */}
      <Route path="/tool/pan-validator" component={PANValidator} />
      <Route path="/tool/gst-validator" component={GSTValidator} />
      <Route path="/tool/aadhaar-validator" component={AadhaarValidator} />
      <Route path="/tool/voter-id-validator" component={VoterIDValidatorPage} />
      <Route path="/tool/passport-validator" component={PassportValidatorPage} />
      <Route path="/tool/aadhaar-masker" component={AadhaarMaskerPage} />
      <Route path="/tool/income-certificate" component={IncomeCertificatePage} />

      <Route path="/tool/driving-license-validator" component={DrivingLicenseValidatorPage} />
      <Route path="/tool/ifsc-validator" component={IFSCValidatorPage} />

      {/* Developer Tools */}
      <Route path="/tool/text-to-speech" component={TextToSpeechPage} />
      <Route path="/tool/speech-to-text" component={SpeechToTextPage} />
      <Route path="/tool/password-generator" component={PasswordGeneratorPage} />
      <Route path="/tool/base64-encoder" component={Base64EncoderPage} />
      <Route path="/tool/hash-generator" component={HashGeneratorPage} />
      <Route path="/tool/json-formatter" component={JSONFormatterPage} />
      <Route path="/tool/xml-formatter" component={XMLFormatterPage} />
      <Route path="/tool/markdown-to-html" component={MarkdownToHTMLPage} />
      <Route path="/tool/html-to-pdf" component={HTMLToPDFPage} />
      <Route path="/tool/csv-to-json" component={CSVToJSONPage} />
      <Route path="/tool/url-shortener" component={URLShortenerPage} />
      <Route path="/tool/regex-tester" component={RegexTesterPage} />
      <Route path="/tool/color-picker" component={ColorPickerPage} />
      <Route path="/tool/color-palette-generator" component={ColorPaletteGeneratorPage} />
      <Route path="/tool/logo-generator" component={LogoGeneratorPage} />
      <Route path="/tool/favicon-generator" component={FaviconGeneratorPage} />
      <Route path="/tool/meta-tag-generator" component={MetaTagGeneratorPage} />
      <Route path="/tool/css-minifier" component={CSSMinifierPage} />
      <Route path="/tool/js-minifier" component={JSMinifierPage} />
      <Route path="/tool/lorem-ipsum-generator" component={LoremIpsumGeneratorPage} />
      <Route path="/tool/timestamp-converter" component={TimestampConverterPage} />
      <Route path="/tool/unicode-converter" component={UnicodeConverterPage} />
      <Route path="/tool/unit-converter" component={UnitConverterPage} />
      <Route path="/tool/gradient-generator" component={GradientGeneratorPage} />
      <Route path="/tool/thumbnail-generator" component={ThumbnailGeneratorPage} />

      {/* Additional Image Tools */}
      <Route path="/tool/image-border-adder" component={ImageBorderAdderPage} />
      <Route path="/tool/image-merge" component={ImageMergePage} />
      <Route path="/tool/image-split" component={ImageSplitPage} />
      <Route path="/tool/image-metadata-extractor" component={ImageMetadataExtractorPage} />
      <Route path="/tool/image-enhance" component={ImageEnhancePage} />
      <Route path="/tool/image-upscale" component={ImageUpscalePage} />
      <Route path="/tool/image-filter-effects" component={ImageFilterEffectsPage} />
      <Route path="/tool/watermark-remove" component={WatermarkRemovePage} />
      <Route path="/tool/passport-photo" component={PassportPhotoPage} />

      {/* Additional Audio/Video Tools */}
      <Route path="/tool/audio-reverser" component={AudioReverserPage} />
      <Route path="/tool/vocal-remover" component={VocalRemoverPage} />
      <Route path="/tool/pitch-changer" component={PitchChangerPage} />
      <Route path="/tool/subtitle-extractor" component={SubtitleExtractorPage} />
      <Route path="/tool/video-rotator" component={VideoRotatorPage} />
      <Route path="/tool/video-speed-changer" component={VideoSpeedChangerPage} />

      {/* Additional Government Tools */}
      <Route path="/tool/birth-certificate" component={BirthCertificatePage} />
      <Route path="/tool/death-certificate" component={DeathCertificatePage} />
      <Route path="/tool/caste-certificate" component={CasteCertificatePage} />
      <Route path="/tool/affidavit-generator" component={AffidavitGeneratorPage} />
      <Route path="/tool/rent-agreement" component={RentAgreementPage} />
      <Route path="/tool/ration-card-status" component={RationCardStatusPage} />

      {/* Footer Pages */}
      <Route path="/help" component={HelpCenter} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/animated-icons-demo" component={AnimatedIconsDemo} />

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