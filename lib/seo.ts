import { Metadata } from "next";
import { profileData } from "@/data/profile";

export const siteConfig = {
  name: profileData.name,
  title: "Nikhil Singh — Backend / Full-Stack Developer",
  description:
    "Personal engineering portfolio of Nikhil Singh. Scalable backend architectures, real-time distributed applications, and full-stack systems bridging into AI/ML.",
  url: "https://nikhilsingh.dev",
  ogImage: "https://nikhilsingh.dev/og.png",
};

export function constructMetadata({
  title,
  description,
}: {
  title?: string;
  description?: string;
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: siteConfig.url,
      siteName: `${siteConfig.name} Portfolio`,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profileData.name,
    jobTitle: profileData.roles,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profileData.education.institution,
    },
    knowsAbout: [
      "Backend Engineering",
      "Full-Stack Web Development",
      "Distributed Systems",
      "Real-Time Applications",
      "WebSockets",
      "WebRTC",
      "Node.js",
      "React",
      "MongoDB",
      "Redis",
      "Machine Learning Integration",
    ],
    url: siteConfig.url,
    email: profileData.email,
  };
}
