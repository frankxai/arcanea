'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Loader2, X, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string, attachments?: File[]) => void;
  onImageUpload?: (file: File) => Promise<string>;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  luminorColor?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onImageUpload,
  disabled = false,
  placeholder = 'Share your thoughts...',
  maxLength = 4000,
  luminorColor = '#8b5cf6',
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && attachments.length === 0) return;
    if (disabled) return;

    onSend(message.trim(), attachments);
    setMessage('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter for images only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    if (onImageUpload) {
      setUploadingImage(true);
      try {
        // Upload images and get URLs
        const uploadPromises = imageFiles.map(file => onImageUpload(file));
        await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Failed to upload images:', error);
      } finally {
        setUploadingImage(false);
      }
    } else {
      // Just add to attachments
      setAttachments(prev => [...prev, ...imageFiles]);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const canSend = (message.trim() || attachments.length > 0) && !disabled;
  const charCount = message.length;
  const isNearLimit = charCount > maxLength * 0.9;

  return (
    <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden border border-gray-700"
              >
                <div className="w-20 h-20 bg-gray-800 flex items-center justify-center">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Paperclip className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div
            className="relative rounded-2xl overflow-hidden border-2 transition-all duration-200"
            style={{
              borderColor: message.trim() ? luminorColor : '#374151',
            }}
          >
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={e => setMessage(e.target.value.slice(0, maxLength))}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 pr-24 bg-gray-800 text-gray-100 placeholder-gray-500 resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                minHeight: '52px',
                maxHeight: '200px',
              }}
            />

            {/* Action Buttons */}
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              {/* Image Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || uploadingImage}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Attach image"
              >
                {uploadingImage ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Image className="w-5 h-5" />
                )}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!canSend}
                className="p-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: canSend ? luminorColor : '#374151',
                  boxShadow: canSend ? `0 0 20px ${luminorColor}40` : 'none',
                }}
                title="Send message (Enter)"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Character Count */}
          <div className="flex items-center justify-between mt-2 px-2">
            <div className="text-xs text-gray-500">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">
                Enter
              </kbd>{' '}
              to send,{' '}
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700">
                Shift + Enter
              </kbd>{' '}
              for new line
            </div>
            {charCount > 0 && (
              <div
                className={`text-xs ${
                  isNearLimit ? 'text-orange-400' : 'text-gray-500'
                }`}
              >
                {charCount} / {maxLength}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
