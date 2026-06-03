export const metadata = {
  title: "Meddoq",
  description: "Clinical tools for modern physicians",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
