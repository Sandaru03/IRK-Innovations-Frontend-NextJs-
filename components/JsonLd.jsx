export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IRK Innovations",
    "url": "https://irkinnovations.com",
    "logo": "https://irkinnovations.com/IRK-Logo.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94-76-537-6106",
      "contactType": "customer service",
      "email": "irkinnovations2022@gmail.com",
      "areaServed": "Global"
    },
    "sameAs": [
      "https://facebook.com/irkinnovations",
      "https://linkedin.com/company/irkinnovations"
    ],
    "description": "Leading electronics product design and manufacturing company specializing in custom PCB design and embedded systems."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
