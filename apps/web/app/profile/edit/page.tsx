'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, X } from 'lucide-react';
import { Button } from '@arcanea/ui';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    display_name: 'John Doe',
    username: 'johndoe',
    bio: 'AI artist and creator exploring the boundaries of imagination',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe',
    twitter: 'https://twitter.com/johndoe',
    instagram: '',
    website: 'https://johndoe.com',
    show_email: false,
    show_creations: true,
    allow_follows: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload to storage and get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar_url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Submit to API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    window.location.href = `/profile/${formData.username}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Edit Profile
          </h1>
          <p className="text-slate-400">Customize your public profile and settings</p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Avatar Section */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-xl font-bold text-white mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-purple-500 to-blue-500">
                  <Avatar className="w-full h-full rounded-full overflow-hidden bg-slate-800">
                    <AvatarImage src={formData.avatar_url} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-3xl font-bold flex items-center justify-center">
                      {formData.display_name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Upload Overlay */}
                <label
                  htmlFor="avatar-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>

              <div className="flex-1">
                <p className="text-slate-300 mb-2">
                  Click on the avatar to upload a new picture
                </p>
                <p className="text-slate-500 text-sm">
                  JPG, PNG or GIF. Max size 5MB. Recommended: 400x400px
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Display Name</label>
              <input
                type="text"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                required
              />
              <p className="text-slate-500 text-sm mt-1">
                arcanea.com/profile/{formData.username}
              </p>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                maxLength={200}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none transition-colors resize-none"
              />
              <p className="text-slate-500 text-sm mt-1">
                {formData.bio.length}/200 characters
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Social Links</h2>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Twitter</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Instagram</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://your-website.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-purple-500 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="show_email"
                checked={formData.show_email}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <div className="text-slate-300 font-medium">Show Email</div>
                <div className="text-slate-500 text-sm">
                  Display your email on your public profile
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="show_creations"
                checked={formData.show_creations}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <div className="text-slate-300 font-medium">Show Creations</div>
                <div className="text-slate-500 text-sm">
                  Allow others to see your creations
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="allow_follows"
                checked={formData.allow_follows}
                onChange={handleChange}
                className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <div className="text-slate-300 font-medium">Allow Follows</div>
                <div className="text-slate-500 text-sm">Let people follow your profile</div>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : isSaved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
