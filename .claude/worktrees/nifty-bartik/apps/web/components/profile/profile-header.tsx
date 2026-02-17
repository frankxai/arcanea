'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/lib/arcanea-ui';
import { Share2, UserPlus, UserCheck, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Profile } from '@/lib/types/profile';
import { useState } from 'react';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
}

export function ProfileHeader({
  profile,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onUnfollow,
  onMessage,
  onShare,
}: ProfileHeaderProps) {
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const handleFollowClick = async () => {
    setIsFollowLoading(true);
    try {
      if (isFollowing && onUnfollow) {
        await onUnfollow();
      } else if (onFollow) {
        await onFollow();
      }
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleShareProfile = () => {
    if (onShare) {
      onShare();
    } else {
      // Default share behavior
      const url = `${window.location.origin}/profile/${profile.username}`;
      if (navigator.share) {
        navigator.share({
          title: `${profile.display_name} on Arcanea`,
          text: profile.bio || `Check out ${profile.display_name}'s creations!`,
          url,
        });
      } else {
        navigator.clipboard.writeText(url);
        // You could show a toast here
      }
    }
  };

  const getInitials = () => {
    return profile.display_name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      {/* Cosmic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 rounded-3xl blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500">
                <Avatar className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                  <AvatarImage
                    src={profile.avatar_url}
                    alt={profile.display_name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl font-bold flex items-center justify-center">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            {/* Name and Username */}
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                {profile.display_name}
              </h1>
              <p className="text-slate-400 text-lg">@{profile.username}</p>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                {profile.bio}
              </p>
            )}

            {/* Academy Affiliations */}
            {profile.stats.academy_affiliations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.stats.academy_affiliations.map((academy) => (
                  <motion.div
                    key={academy}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 font-medium">{academy}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Stats Bar */}
            <div className="flex flex-wrap gap-8 pt-4">
              <StatItem
                label="Creations"
                value={profile.stats.total_creations}
                gradient="from-purple-400 to-pink-400"
              />
              <StatItem
                label="Followers"
                value={profile.stats.total_followers}
                gradient="from-blue-400 to-cyan-400"
              />
              <StatItem
                label="Following"
                value={profile.stats.total_following}
                gradient="from-indigo-400 to-purple-400"
              />
              <StatItem
                label="Likes"
                value={profile.stats.total_likes_received}
                gradient="from-pink-400 to-rose-400"
              />
              {profile.stats.active_days_streak > 0 && (
                <StatItem
                  label="Streak"
                  value={`${profile.stats.active_days_streak}d`}
                  gradient="from-orange-400 to-yellow-400"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {!isOwnProfile && (
                <>
                  <Button
                    onClick={handleFollowClick}
                    disabled={isFollowLoading}
                    className={`${
                      isFollowing
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'
                    } px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow
                      </>
                    )}
                  </Button>

                  {onMessage && (
                    <Button
                      onClick={onMessage}
                      className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  )}
                </>
              )}

              <Button
                onClick={handleShareProfile}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              {isOwnProfile && (
                <Button
                  onClick={() => (window.location.href = '/profile/edit')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number | string;
  gradient: string;
}

function StatItem({ label, value, gradient }: StatItemProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="text-center">
      <div
        className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-slate-400 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}
