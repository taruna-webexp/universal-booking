import Navbar from "@/component/common/Navbar";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ThemeProvider from "@/component/theme/ThemeProvider";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <ThemeProvider>
          <NextAuthProvider>
            <ToastContainer />
            <Navbar />
            {children}   </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
