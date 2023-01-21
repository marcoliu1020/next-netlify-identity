import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthContextProvider } from "@/stores/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
