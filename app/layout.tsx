import './globals.css'

export const metadata = {
  title: 'Order Website',
  description: 'Place your order here',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}

