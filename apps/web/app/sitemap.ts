import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://arcanea.com';

    return [
        // Core Pages
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/luminors`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },

        // Luminor Intelligence System
        {
            url: `${baseUrl}/luminor-intelligence`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.95,
        },
        // Individual Luminors
        ...(['logicus','synthra','debugon','nexus','prismatic','melodia','motio','formis',
            'chronica','veritas','lexicon','poetica','oracle','analytica','memoria','futura'] as const).map(id => ({
            url: `${baseUrl}/luminors/${id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),

        // Main Sections
        {
            url: `${baseUrl}/library`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/library/codex`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/library/graph`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/academy`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/skills`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/bestiary`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },

        // Interactive
        {
            url: `${baseUrl}/chat`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/studio`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },

        // Resources
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];
}
