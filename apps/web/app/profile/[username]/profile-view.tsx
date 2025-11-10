'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Profile, Creation, LuminorBond } from '@/lib/types/profile';
import { ProfileHeader } from '@/components/profile/profile-header';
import { CreationGallery } from '@/components/profile/creation-gallery';
import { LuminorBonds } from '@/components/profile/luminor-bonds';
import { StatsDashboard } from '@/components/profile/stats-dashboard';

interface ProfileViewProps {
  profile: Profile;
  creations: Creation[];
  luminorBonds: LuminorBond[];
  isOwnProfile: boolean;
}

type Tab = 'gallery' | 'bonds' | 'stats' | 'about';

export function ProfileView({
  profile,
  creations,
  luminorBonds,
  isOwnProfile,
}: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    // TODO: Implement follow API call
    setIsFollowing(true);
  };

  const handleUnfollow = async () => {
    // TODO: Implement unfollow API call
    setIsFollowing(false);
  };

  const handleMessage = () => {
    // TODO: Implement messaging
    console.log('Open message to', profile.username);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/profile/${profile.username}`;
    if (navigator.share) {
      navigator.share({
        title: `${profile.display_name} on Arcanea`,
        text: profile.bio || `Check out ${profile.display_name}'s creations!`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  const handleChatWithLuminor = (luminorId: string) => {
    // TODO: Navigate to chat
    window.location.href = `/chat/${luminorId}`;
  };

  const tabs = [
    { id: 'gallery' as Tab, label: 'Gallery', count: creations.length },
    { id: 'bonds' as Tab, label: 'Luminor Bonds', count: luminorBonds.length },
    { id: 'stats' as Tab, label: 'Stats', count: null },
    { id: 'about' as Tab, label: 'About', count: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          onMessage={handleMessage}
          onShare={handleShare}
        />

        {/* Tab Navigation */}
        <div className="border-b border-slate-800">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-purple-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.label}
                  {tab.count !== null && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </span>

                {/* Active Indicator */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'gallery' && <CreationGallery creations={creations} />}

          {activeTab === 'bonds' && (
            <LuminorBonds bonds={luminorBonds} onChatWithLuminor={handleChatWithLuminor} />
          )}

          {activeTab === 'stats' && (
            <StatsDashboard stats={profile.stats} creations={creations} />
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-4">About</h3>
                <p className="text-slate-300 leading-relaxed">
                  {profile.bio || 'No bio provided yet.'}
                </p>
              </motion.div>

              {/* Social Links */}
              {profile.social_links && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Links</h3>
                  <div className="space-y-3">
                    {profile.social_links.twitter && (
                      <a
                        href={profile.social_links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {profile.social_links.website && (
                      <a
                        href={profile.social_links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Member Since */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
              >
                <h3 className="text-xl font-bold text-white mb-4">Member Since</h3>
                <p className="text-slate-300">
                  {new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
