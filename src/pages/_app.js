import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  }
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider  client={queryClient}>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </QueryClientProvider  >
  );
}
