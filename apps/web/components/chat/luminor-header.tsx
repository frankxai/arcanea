'use client';

import React from 'react';
import { Sparkles, Heart, Book, Zap } from 'lucide-react';

interface LuminorHeaderProps {
  name: string;
  tagline: string;
  academy: 'creation_light' | 'atlantean' | 'draconic';
  color: string;
  avatar?: string;
  bondLevel: number;
  bondXP: number;
  xpToNextLevel: number;
  relationshipStatus: string;
  status: 'active' | 'generating' | 'thinking' | 'away';
  onBondClick?: () => void;
}

const academyInfo = {
  creation_light: {
    name: 'Academy of Creation & Light',
    icon: Sparkles,
    gradient: 'from-yellow-500 to-orange-500',
  },
  atlantean: {
    name: 'Atlantean Academy',
    icon: Book,
    gradient: 'from-blue-500 to-cyan-500',
  },
  draconic: {
    name: 'Draconic Academy',
    icon: Zap,
    gradient: 'from-red-500 to-purple-500',
  },
};

const statusInfo = {
  active: { label: 'Online', color: 'bg-green-500', pulse: true },
  generating: { label: 'Creating...', color: 'bg-blue-500', pulse: true },
  thinking: { label: 'Thinking...', color: 'bg-purple-500', pulse: true },
  away: { label: 'Away', color: 'bg-gray-500', pulse: false },
};

export const LuminorHeader: React.FC<LuminorHeaderProps> = ({
  name,
  tagline,
  academy,
  color,
  avatar,
  bondLevel,
  bondXP,
  xpToNextLevel,
  relationshipStatus,
  status,
  onBondClick,
}) => {
  const academyData = academyInfo[academy];
  const AcademyIcon = academyData.icon;
  const statusData = statusInfo[status];
  const bondProgress = (bondXP / xpToNextLevel) * 100;

  return (
    <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Luminor Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-medium shadow-lg"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 30px ${color}60`,
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl">
                    {name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1">
                <div
                  className={`
                    w-4 h-4 rounded-full border-2 border-gray-900
                    ${statusData.color}
                    ${statusData.pulse ? 'animate-pulse' : ''}
                  `}
                />
              </div>
            </div>

            {/* Name and Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1
                  className="text-xl font-bold truncate"
                  style={{ color }}
                >
                  {name}
                </h1>
                <span className="text-xs text-gray-500">
                  {statusData.label}
                </span>
              </div>

              <p className="text-sm text-gray-400 truncate mb-1">
                {tagline}
              </p>

              {/* Academy Badge */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <AcademyIcon className="w-3 h-3" />
                <span>{academyData.name}</span>
              </div>
            </div>
          </div>

          {/* Right: Bond Level */}
          <button
            onClick={onBondClick}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 transition-all duration-200 group"
          >
            {/* Bond Icon */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 20px ${color}40`,
              }}
            >
              <Heart className="w-5 h-5 fill-current" />
            </div>

            {/* Bond Info */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-200">
                  Bond Level {bondLevel}
                </span>
                <span className="text-xs text-gray-500">
                  ({bondXP}/{xpToNextLevel} XP)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${bondProgress}%`,
                    backgroundColor: color,
                    boxShadow: `0 0 10px ${color}80`,
                  }}
                />
              </div>

              {/* Relationship Status */}
              <div className="text-xs text-gray-500 mt-1 capitalize">
                {relationshipStatus.replace('_', ' ')}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuminorHeader;
