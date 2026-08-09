import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/labs",
        destination: "/tracks",
        permanent: true,
      },
      {
        source: "/crafts",
        destination: "/tracks",
        permanent: true,
      },
      {
        source: "/labs/:track/learn",
        destination: "/:track/learn",
        permanent: true,
      },
      {
        source: "/labs/:track",
        destination: "/:track",
        permanent: true,
      },
      {
        source: "/crafts/:track/learn",
        destination: "/:track/learn",
        permanent: true,
      },
      {
        source: "/crafts/:track",
        destination: "/:track",
        permanent: true,
      },
      {
        source: "/tracks/:track/learn",
        destination: "/:track/learn",
        permanent: true,
      },
      {
        source: "/tracks/:track",
        destination: "/:track",
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
