import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error handling for better stability
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default browser behavior
});

// Performance monitoring
if (typeof performance !== 'undefined' && typeof performance.mark === 'function') {
  performance.mark('app-start');
  window.addEventListener('load', () => {
    performance.mark('app-loaded');
    performance.measure('app-load-time', 'app-start', 'app-loaded');
    console.log('App loaded successfully');
  });
}

createRoot(document.getElementById("root")!).render(<App />);
