import { Switch, Route, useLocation } from "wouter";
import { useEffect, Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { LoadingScreen, useAppLoading } from "@/components/ui/loading-screen";
import { PageLoadingFallback } from "@/components/ui/loading-fallback";
import Layout from "@/components/layout/layout";
import ErrorBoundary from "@/components/ui/error-boundary";
import { ThemeProvider } from "@/hooks/use-theme";

// Lazy load components for better performance
const Home = lazy(() => import("@/pages/home"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Login = lazy(() => import("@/pages/auth/login"));
const Signup = lazy(() => import("@/pages/auth/signup"));
const PDFToolkit = lazy(() => import("@/pages/toolkit/pdf"));
const ImageToolkit = lazy(() => import("@/pages/toolkit/image"));
const MediaToolkit = lazy(() => import("@/pages/toolkit/media"));
const GovernmentToolkit = lazy(() => import("@/pages/toolkit/government"));
const DeveloperToolkit = lazy(() => import("@/pages/toolkit/developer"));
const PDFMerger = lazy(() => import("@/pages/tool/pdf-merger"));
const PDFToWordPage = lazy(() => import("@/pages/tool/pdf-to-word"));
const PDFSplitterAlternate = lazy(() => import("@/pages/tool/pdf-splitter"));
const WordToPDFPage = lazy(() => import("@/pages/tool/word-to-pdf"));
const ExcelToPDFPage = lazy(() => import("@/pages/tool/excel-to-pdf"));
const PPTToPDFPage = lazy(() => import("@/pages/tool/ppt-to-pdf"));
const PDFToExcelPage = lazy(() => import("@/pages/tool/pdf-to-excel"));
const QRGeneratorPage = lazy(() => import("@/pages/tool/qr-generator"));
const BarcodeGeneratorPage = lazy(() => import("@/pages/tool/barcode-generator"));
const ImageCompressorPage = lazy(() => import("@/pages/tool/image-compressor"));
const ImageFormatConverterPage = lazy(() => import("@/pages/tool/image-format-converter"));
const AudioTrimmerPage = lazy(() => import("@/pages/tool/audio-trimmer"));
const VideoToAudioPage = lazy(() => import("@/pages/tool/video-to-audio"));
const WatermarkRemoverPage = lazy(() => import("@/pages/tool/watermark-remover"));
const PhotoEnhancerPage = lazy(() => import("@/pages/tool/photo-enhancer"));
const PDFCompressorPage = lazy(() => import("@/pages/tool/pdf-compressor"));

const PANValidator = lazy(() => import("@/pages/tool/pan-validator"));
const GSTValidator = lazy(() => import("@/pages/tool/gst-validator"));
const AadhaarValidator = lazy(() => import("@/pages/tool/aadhaar-validator"));
const PDFOCRPage = lazy(() => import("@/pages/tool/pdf-ocr"));
const PDFWatermarkPage = lazy(() => import("@/pages/tool/pdf-watermark"));
const PDFPasswordRemoverPage = lazy(() => import("@/pages/tool/pdf-password-remover"));
const PDFPasswordProtectorPage = lazy(() => import("@/pages/tool/pdf-password-protector"));
const PDFRotatorPage = lazy(() => import("@/pages/tool/pdf-rotator"));
const PDFCropperPage = lazy(() => import("@/pages/tool/pdf-cropper"));
const PDFMergerPage = lazy(() => import("@/pages/tool/pdf-merger"));
const PDFSplitterPage = lazy(() => import("@/pages/tool/pdf-splitter"));
const ImageEnhancerPage = lazy(() => import("@/pages/tool/image-enhancer"));
const ImageUpscalerPage = lazy(() => import("@/pages/tool/image-upscaler"));
const ImageResizerPage = lazy(() => import("@/pages/tool/image-resizer"));
const BackgroundRemoverPage = lazy(() => import("@/pages/tool/bg-remover"));
const VideoTrimmerPage = lazy(() => import("@/pages/tool/video-trimmer"));
const AudioConverterPage = lazy(() => import("@/pages/tool/audio-converter"));
const VideoConverterPage = lazy(() => import("@/pages/tool/video-converter"));
const VoterIDValidatorPage = lazy(() => import("@/pages/tool/voter-id-validator"));
const PassportValidatorPage = lazy(() => import("@/pages/tool/passport-validator"));
const DrivingLicenseValidatorPage = lazy(() => import("@/pages/tool/driving-license-validator"));
const IFSCValidatorPage = lazy(() => import("@/pages/tool/ifsc-validator"));

// New tool imports - lazy loaded
const PDFToPowerPointPage = lazy(() => import("@/pages/tool/pdf-to-powerpoint"));
const PDFPageExtractorPage = lazy(() => import("@/pages/tool/pdf-page-extractor"));
const PDFPageNumbererPage = lazy(() => import("@/pages/tool/pdf-page-numberer"));
const ImageConverterPage = lazy(() => import("@/pages/tool/image-converter"));
const ImageCropperPage = lazy(() => import("@/pages/tool/image-cropper"));
const ImageRotatorPage = lazy(() => import("@/pages/tool/image-rotator"));
const ImageColorizerPage = lazy(() => import("@/pages/tool/image-colorizer"));
const ImageFlipperPage = lazy(() => import("@/pages/tool/image-flipper"));
const ImageFilterPage = lazy(() => import("@/pages/tool/image-filter"));
const WatermarkAddPage = lazy(() => import("@/pages/tool/watermark-add"));
const ImageBlurPage = lazy(() => import("@/pages/tool/image-blur"));
const MemeGeneratorPage = lazy(() => import("@/pages/tool/meme-generator"));
const AudioCompressorPage = lazy(() => import("@/pages/tool/audio-compressor"));
const AudioMergerPage = lazy(() => import("@/pages/tool/audio-merger"));
const AudioExtractorPage = lazy(() => import("@/pages/tool/audio-extractor"));
const VolumeChangerPage = lazy(() => import("@/pages/tool/volume-changer"));
const SpeedChangerPage = lazy(() => import("@/pages/tool/speed-changer"));
const VideoCompressorPage = lazy(() => import("@/pages/tool/video-compressor"));
const VideoMergerPage = lazy(() => import("@/pages/tool/video-merger"));
const VideoToGifPage = lazy(() => import("@/pages/tool/video-to-gif"));
const GifToVideoPage = lazy(() => import("@/pages/tool/gif-to-video"));
const AadhaarMaskerPage = lazy(() => import("@/pages/tool/aadhaar-masker"));
const IncomeCertificatePage = lazy(() => import("@/pages/tool/income-certificate"));
const AudioNormalizerPage = lazy(() => import("@/pages/tool/audio-normalizer"));
const ImageSharpenPage = lazy(() => import("@/pages/tool/image-sharpen"));
const VideoResizerPage = lazy(() => import("@/pages/tool/video-resizer"));
const NoiseReducerPage = lazy(() => import("@/pages/tool/noise-reducer"));

// Additional Developer and Utility Tools - lazy loaded
const TextToSpeechPage = lazy(() => import("@/pages/tool/text-to-speech"));
const SpeechToTextPage = lazy(() => import("@/pages/tool/speech-to-text"));
const PasswordGeneratorPage = lazy(() => import("@/pages/tool/password-generator"));
const Base64EncoderPage = lazy(() => import("@/pages/tool/base64-encoder"));
const HashGeneratorPage = lazy(() => import("@/pages/tool/hash-generator"));
const JSONFormatterPage = lazy(() => import("@/pages/tool/json-formatter"));
const XMLFormatterPage = lazy(() => import("@/pages/tool/xml-formatter"));
const MarkdownToHTMLPage = lazy(() => import("@/pages/tool/markdown-to-html"));
const HTMLToPDFPage = lazy(() => import("@/pages/tool/html-to-pdf"));
const CSVToJSONPage = lazy(() => import("@/pages/tool/csv-to-json"));
const URLShortenerPage = lazy(() => import("@/pages/tool/url-shortener"));
const RegexTesterPage = lazy(() => import("@/pages/tool/regex-tester"));
const ColorPickerPage = lazy(() => import("@/pages/tool/color-picker"));
const ColorPaletteGeneratorPage = lazy(() => import("@/pages/tool/color-palette-generator"));
const LogoGeneratorPage = lazy(() => import("@/pages/tool/logo-generator"));
const FaviconGeneratorPage = lazy(() => import("@/pages/tool/favicon-generator"));
const MetaTagGeneratorPage = lazy(() => import("@/pages/tool/meta-tag-generator"));
const CSSMinifierPage = lazy(() => import("@/pages/tool/css-minifier"));
const JSMinifierPage = lazy(() => import("@/pages/tool/js-minifier"));
const LoremIpsumGeneratorPage = lazy(() => import("@/pages/tool/lorem-ipsum-generator"));
const TimestampConverterPage = lazy(() => import("@/pages/tool/timestamp-converter"));
const UnicodeConverterPage = lazy(() => import("@/pages/tool/unicode-converter"));
const UnitConverterPage = lazy(() => import("@/pages/tool/unit-converter"));
const GradientGeneratorPage = lazy(() => import("@/pages/tool/gradient-generator"));
const ThumbnailGeneratorPage = lazy(() => import("@/pages/tool/thumbnail-generator"));

// Additional PDF Tools
// HTMLToPDFPage already imported above

// Additional Image Tools - lazy loaded
const ImageBorderAdderPage = lazy(() => import("@/pages/tool/image-border-adder"));
const ImageMergePage = lazy(() => import("@/pages/tool/image-merge"));
const ImageSplitPage = lazy(() => import("@/pages/tool/image-split"));
const ImageMetadataExtractorPage = lazy(() => import("@/pages/tool/image-metadata-extractor"));
const ImageEnhancePage = lazy(() => import("@/pages/tool/image-enhance"));
const ImageUpscalePage = lazy(() => import("@/pages/tool/image-upscale"));
const ImageFilterEffectsPage = lazy(() => import("@/pages/tool/image-filter-effects"));
const WatermarkRemovePage = lazy(() => import("@/pages/tool/watermark-remove"));
const PassportPhotoPage = lazy(() => import("@/pages/tool/passport-photo"));

// Additional Audio/Video Tools - lazy loaded
const AudioReverserPage = lazy(() => import("@/pages/tool/audio-reverser"));
const VocalRemoverPage = lazy(() => import("@/pages/tool/vocal-remover"));
const PitchChangerPage = lazy(() => import("@/pages/tool/pitch-changer"));
const SubtitleExtractorPage = lazy(() => import("@/pages/tool/subtitle-extractor"));
const VideoRotatorPage = lazy(() => import("@/pages/tool/video-rotator"));
const VideoSpeedChangerPage = lazy(() => import("@/pages/tool/video-speed-changer"));

// Additional Government Tools - lazy loaded
const BirthCertificatePage = lazy(() => import("@/pages/tool/birth-certificate"));
const DeathCertificatePage = lazy(() => import("@/pages/tool/death-certificate"));
const CasteCertificatePage = lazy(() => import("@/pages/tool/caste-certificate"));
const AffidavitGeneratorPage = lazy(() => import("@/pages/tool/affidavit-generator"));
const RentAgreementPage = lazy(() => import("@/pages/tool/rent-agreement"));
const RationCardStatusPage = lazy(() => import("@/pages/tool/ration-card-status"));

// Missing Tools - lazy loaded
const PowerPointToPDFPage = lazy(() => import("@/pages/tool/powerpoint-to-pdf"));
const PDFBookmarkManagerPage = lazy(() => import("@/pages/tool/pdf-bookmark-manager"));
const PDFFormFillerPage = lazy(() => import("@/pages/tool/pdf-form-filler"));
const PDFSignatureAdderPage = lazy(() => import("@/pages/tool/pdf-signature-adder"));
const PDFVersionConverterPage = lazy(() => import("@/pages/tool/pdf-version-converter"));
const CollageMakerPage = lazy(() => import("@/pages/tool/collage-maker"));
const BatchProcessorPage = lazy(() => import("@/pages/tool/batch-processor"));
const AudioEqualizerPage = lazy(() => import("@/pages/tool/audio-equalizer"));
const VolumeAdjusterPage = lazy(() => import("@/pages/tool/volume-adjuster"));
const SubtitleAdderPage = lazy(() => import("@/pages/tool/subtitle-adder"));
const VideoWatermarkPage = lazy(() => import("@/pages/tool/video-watermark"));
const FormatInfoPage = lazy(() => import("@/pages/tool/format-info"));
const UANValidatorPage = lazy(() => import("@/pages/tool/uan-validator"));
const VSSAULicenceValidatorPage = lazy(() => import("@/pages/tool/vs-sau-licence-validator"));
const ShopActLicenceValidatorPage = lazy(() => import("@/pages/tool/shop-act-licence-validator"));

const NotFound = lazy(() => import("@/pages/not-found"));
const HelpCenter = lazy(() => import("@/pages/help"));
const Contact = lazy(() => import("@/pages/contact"));
const About = lazy(() => import("@/pages/about"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Terms = lazy(() => import("@/pages/terms"));
const AllTools = lazy(() => import("@/pages/all-tools"));
const AnimatedIconsDemo = lazy(() => import("@/pages/animated-icons-demo"));




function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
}

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/signup" component={Signup} />
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
      
      {/* Missing PDF Tools */}
      <Route path="/tool/powerpoint-to-pdf" component={PowerPointToPDFPage} />
      <Route path="/tool/pdf-bookmark-manager" component={PDFBookmarkManagerPage} />
      <Route path="/tool/pdf-form-filler" component={PDFFormFillerPage} />
      <Route path="/tool/pdf-signature-adder" component={PDFSignatureAdderPage} />
      <Route path="/tool/pdf-version-converter" component={PDFVersionConverterPage} />

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
      
      {/* Missing Image Tools */}
      <Route path="/tool/collage-maker" component={CollageMakerPage} />

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
      
      {/* Missing Audio Tools */}
      <Route path="/tool/volume-adjuster" component={VolumeAdjusterPage} />
      <Route path="/tool/audio-equalizer" component={AudioEqualizerPage} />

      <Route path="/tool/video-compressor" component={VideoCompressorPage} />
      <Route path="/tool/video-merger" component={VideoMergerPage} />
      <Route path="/tool/video-resizer" component={VideoResizerPage} />
      <Route path="/tool/video-to-gif" component={VideoToGifPage} />
      <Route path="/tool/gif-to-video" component={GifToVideoPage} />
      
      {/* Missing Video Tools */}
      <Route path="/tool/subtitle-adder" component={SubtitleAdderPage} />
      <Route path="/tool/video-watermark" component={VideoWatermarkPage} />


      {/* Utilities */}
      <Route path="/tool/qr-generator" component={QRGeneratorPage} />
      <Route path="/tool/barcode-generator" component={BarcodeGeneratorPage} />
      <Route path="/tool/batch-processor" component={BatchProcessorPage} />
      <Route path="/tool/format-info" component={FormatInfoPage} />

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
      
      {/* Missing Government Validators */}
      <Route path="/tool/uan-validator" component={UANValidatorPage} />
      <Route path="/tool/vs-sau-licence-validator" component={VSSAULicenceValidatorPage} />
      <Route path="/tool/shop-act-licence-validator" component={ShopActLicenceValidatorPage} />

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
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;