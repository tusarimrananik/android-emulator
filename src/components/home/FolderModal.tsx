'use client';

import React, { useState } from 'react';
import { useLawnchair } from '@/context/LawnchairContext';
import { AppIcon } from '@/components/home/AppIcon';
import { X, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FolderModal: React.FC = () => {
  const {
    activeFolder,
    closeFolder,
    apps,
    settings,
    renameFolder,
  } = useLawnchair();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [folderTitle, setFolderTitle] = useState(activeFolder?.name || '');

  if (!activeFolder) return null;

  const folderApps = activeFolder.appIds
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean);

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderTitle.trim()) {
      renameFolder(activeFolder.id, folderTitle.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <div
      onClick={closeFolder}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[340px] rounded-[36px] p-5 shadow-2xl overflow-hidden text-white flex flex-col items-center"
        style={{
          backgroundColor: settings.isDarkMode
            ? 'rgba(28, 30, 34, 0.94)'
            : 'rgba(255, 255, 255, 0.95)',
          border: settings.isDarkMode
            ? '1px solid rgba(255,255,255,0.12)'
            : '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header / Folder Name */}
        <div className="w-full flex items-center justify-between mb-5 px-2">
          {isEditingTitle ? (
            <form onSubmit={handleTitleSubmit} className="flex-1 mr-2">
              <input
                type="text"
                autoFocus
                value={folderTitle}
                onChange={(e) => setFolderTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                className="w-full bg-white/10 text-white font-bold text-[18px] px-3 py-1 rounded-xl outline-none border border-emerald-400"
              />
            </form>
          ) : (
            <div
              onClick={() => setIsEditingTitle(true)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <h3 className="text-[19px] font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                {activeFolder.name}
              </h3>
              <Edit2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-white/60 transition-opacity" />
            </div>
          )}

          <button
            onClick={closeFolder}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Apps Grid (3 or 4 columns) */}
        <div className="w-full grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center mb-2">
          {folderApps.map((app) => (
            <AppIcon key={app!.id} app={app!} size={54} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
