import { Switch, Route } from "wouter";
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
import ImageResizer from "@/pages/tool/image-resizer";
import AudioConverter from "@/pages/tool/audio-converter";
import PANValidator from "@/pages/tool/pan-validator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      
      {/* Toolkit pages */}
      <Route path="/toolkit/pdf" component={PDFToolkit} />
      <Route path="/toolkit/image" component={ImageToolkit} />
      <Route path="/toolkit/media" component={MediaToolkit} />
      <Route path="/toolkit/government" component={GovernmentToolkit} />
      
      {/* Individual tool pages */}
      <Route path="/tool/pdf-merger" component={PDFMerger} />
      <Route path="/tool/image-resizer" component={ImageResizer} />
      <Route path="/tool/audio-converter" component={AudioConverter} />
      <Route path="/tool/pan-validator" component={PANValidator} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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
