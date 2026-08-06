import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tracks",
        destination: "/labs",
        permanent: true,
      },
      {
        source: "/tracks/:lab/learn",
        destination: "/:lab/learn",
        permanent: true,
      },
      {
        source: "/tracks/:lab",
        destination: "/:lab",
        permanent: true,
      },
      {
        source: "/labs/:lab/learn",
        destination: "/:lab/learn",
        permanent: true,
      },
      {
        source: "/labs/:lab",
        destination: "/:lab",
        permanent: true,
      },
      {
        source: "/js/learn",
        destination: "/javascript/learn",
        permanent: true,
      },
      {
        source: "/js",
        destination: "/javascript",
        permanent: true,
      },
      {
        source: "/learn",
        destination: "/html/learn",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
