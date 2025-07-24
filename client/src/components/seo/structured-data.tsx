import { useMemo } from 'react';

interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'SoftwareApplication' | 'Tool';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = useMemo(() => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'WebSite':
        return {
          ...baseData,
          name: 'Suntyn AI',
          url: 'https://suntyn-ai.com',
          description: 'Professional AI-powered intelligence platform with 108+ tools for PDF, Image, Audio/Video processing and Government document validation.',
          publisher: {
            '@type': 'Organization',
            name: 'Suntyn AI',
            logo: {
              '@type': 'ImageObject',
              url: 'https://suntyn-ai.com/favicon.svg'
            }
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://suntyn-ai.com/all-tools?search={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          ...data
        };

      case 'Organization':
        return {
          ...baseData,
          name: 'Suntyn AI',
          url: 'https://suntyn-ai.com',
          logo: 'https://suntyn-ai.com/favicon.svg',
          description: 'Leading provider of AI-powered document processing and validation tools.',
          sameAs: [
            'https://twitter.com/SuntynAI',
            'https://github.com/suntyn-ai'
          ],
          ...data
        };

      case 'SoftwareApplication':
        return {
          ...baseData,
          name: 'Suntyn AI Platform',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web Browser',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          description: 'Comprehensive AI-powered toolkit with 108+ tools for document processing, image editing, and media conversion.',
          featureList: [
            'PDF Processing Tools',
            'Image Editing Tools',
            'Audio/Video Conversion',
            'Government Document Validation',
            'Developer Utilities'
          ],
          ...data
        };

      case 'Tool':
        return {
          ...baseData,
          '@type': 'SoftwareApplication',
          name: data.name,
          description: data.description,
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web Browser',
          url: data.url,
          isPartOf: {
            '@type': 'WebSite',
            name: 'Suntyn AI',
            url: 'https://suntyn-ai.com'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock'
          },
          ...data
        };

      default:
        return { ...baseData, ...data };
    }
  }, [type, data]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Hook for generating tool-specific structured data
export function useToolStructuredData(toolName: string, toolDescription: string, toolPath: string) {
  return useMemo(() => ({
    name: toolName,
    description: toolDescription,
    url: `https://suntyn-ai.com${toolPath}`,
    category: toolPath.includes('/pdf') ? 'PDF Tools' :
              toolPath.includes('/image') ? 'Image Tools' :
              toolPath.includes('/audio') || toolPath.includes('/video') ? 'Media Tools' :
              toolPath.includes('/government') ? 'Government Tools' : 'Developer Tools',
    publisher: {
      '@type': 'Organization',
      name: 'Suntyn AI'
    }
  }), [toolName, toolDescription, toolPath]);
}