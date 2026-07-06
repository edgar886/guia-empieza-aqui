/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite embeber la pagina/guia dentro de Squarespace via iframe.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Ajusta el dominio si lo sirves desde un subdominio propio.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://edgarboone.com https://*.squarespace.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
