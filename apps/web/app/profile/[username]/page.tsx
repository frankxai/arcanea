import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfileView } from './profile-view';

// Mock data - replace with actual database calls
async function getProfile(username: string) {
  // TODO: Fetch from Supabase
  return {
    id: '1',
    username,
    display_name: username.charAt(0).toUpperCase() + username.slice(1),
    bio: 'AI artist and creator exploring the boundaries of imagination with Luminors',
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    created_at: '2024-01-01',
    updated_at: '2024-01-15',
    stats: {
      total_creations: 42,
      total_followers: 1234,
      total_following: 567,
      total_likes_received: 5678,
      active_days_streak: 14,
      academy_affiliations: ['Lumina', 'Aether'],
    },
    social_links: {
      twitter: 'https://twitter.com/example',
      website: 'https://example.com',
    },
    privacy_settings: {
      show_email: false,
      show_creations: true,
      allow_follows: true,
    },
  };
}

async function getCreations(userId: string) {
  // TODO: Fetch from Supabase
  return Array.from({ length: 12 }, (_, i) => ({
    id: `creation-${i}`,
    user_id: userId,
    title: `Amazing Creation ${i + 1}`,
    description: 'A beautiful piece created with AI',
    type: ['image', 'video', 'project'][i % 3] as 'image' | 'video' | 'project',
    media_url: `https://picsum.photos/seed/${i}/800/800`,
    thumbnail_url: `https://picsum.photos/seed/${i}/400/400`,
    prompt: 'A mystical landscape with floating islands and cosmic energy',
    luminor_id: ['Aria', 'Luna', 'Nova'][i % 3],
    academy: ['Lumina', 'Umbra', 'Aether'][i % 3],
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    updated_at: new Date(Date.now() - i * 86400000).toISOString(),
    stats: {
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      views: Math.floor(Math.random() * 5000),
      shares: Math.floor(Math.random() * 50),
    },
    metadata: {
      width: 800,
      height: 800,
      style: ['cosmic', 'ethereal', 'mystical'][i % 3],
      tags: ['ai-art', 'creative', 'luminor'],
    },
  }));
}

async function getLuminorBonds(userId: string) {
  // TODO: Fetch from Supabase
  return [
    {
      id: 'bond-1',
      user_id: userId,
      luminor_id: 'aria',
      luminor_name: 'Aria',
      luminor_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aria',
      academy: 'Lumina',
      bond_level: 85,
      total_conversations: 142,
      personality_compatibility: 92,
      last_interaction: new Date(Date.now() - 3600000).toISOString(),
      created_at: '2024-01-01',
    },
    {
      id: 'bond-2',
      user_id: userId,
      luminor_id: 'nova',
      luminor_name: 'Nova',
      luminor_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nova',
      academy: 'Aether',
      bond_level: 62,
      total_conversations: 78,
      personality_compatibility: 78,
      last_interaction: new Date(Date.now() - 86400000).toISOString(),
      created_at: '2024-01-05',
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    return {
      title: 'Profile Not Found',
    };
  }

  return {
    title: `${profile.display_name} (@${profile.username}) | Arcanea`,
    description: profile.bio || `View ${profile.display_name}'s creations on Arcanea`,
    openGraph: {
      title: `${profile.display_name} on Arcanea`,
      description: profile.bio || `Check out ${profile.display_name}'s AI creations`,
      images: [profile.avatar_url || '/og-image.png'],
      type: 'profile',
      username: profile.username,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.display_name} on Arcanea`,
      description: profile.bio || `Check out ${profile.display_name}'s AI creations`,
      images: [profile.avatar_url || '/og-image.png'],
    },
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const profile = await getProfile(username);

  if (!profile) {
    notFound();
  }

  const creations = await getCreations(profile.id);
  const luminorBonds = await getLuminorBonds(profile.id);

  return (
    <ProfileView
      profile={profile}
      creations={creations}
      luminorBonds={luminorBonds}
      isOwnProfile={false} // TODO: Check against current user
    />
  );
}
