'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AppItem,
  FolderItem,
  WidgetItem,
  Wallpaper,
  MonetPalette,
  LawnchairSettingsState,
  ActiveOverlay,
  IconShape,
} from '@/types/launcher';
import { INITIAL_APPS, INITIAL_FOLDERS } from '@/lib/apps-data';
import { WALLPAPERS } from '@/lib/wallpapers-data';
import { applyMonetPaletteToElement, DEFAULT_DARK_PALETTE, DEFAULT_LIGHT_PALETTE } from '@/lib/monet-engine';
import { playTapSound, playOpenAppSound, playDrawerSound } from '@/lib/sound-effects';

interface ContextMenuData {
  appId?: string;
  isDesktop?: boolean;
  position: { x: number; y: number };
}

interface LawnchairContextType {
  // Apps & Folders & Widgets
  apps: AppItem[];
  folders: FolderItem[];
  widgets: WidgetItem[];
  activeFolder: FolderItem | null;
  runningApp: AppItem | null;
  currentPage: number;
  totalPages: number;

  // Wallpaper & Theme
  currentWallpaper: Wallpaper;
  activePalette: MonetPalette;
  settings: LawnchairSettingsState;

  // Overlays & Navigation
  activeOverlay: ActiveOverlay;
  contextMenu: ContextMenuData | null;
  drawerSearchQuery: string;
  isPhoneFrameMode: boolean; // true = Pixel 9 frame, false = pure recording screen
  recordingZoom: number; // 0.8 to 1.25

  // Actions
  setCurrentPage: (page: number) => void;
  setWallpaper: (wallpaper: Wallpaper) => void;
  setPalette: (palette: MonetPalette) => void;
  updateSettings: (partial: Partial<LawnchairSettingsState>) => void;
  openOverlay: (overlay: ActiveOverlay) => void;
  closeOverlay: () => void;
  openFolder: (folder: FolderItem) => void;
  closeFolder: () => void;
  launchApp: (app: AppItem | string) => void;
  closeRunningApp: () => void;
  openContextMenu: (data: ContextMenuData) => void;
  closeContextMenu: () => void;
  setDrawerSearchQuery: (query: string) => void;
  togglePhoneFrameMode: () => void;
  setRecordingZoom: (zoom: number) => void;
  renameFolder: (folderId: string, newName: string) => void;
  addAppToFavorites: (appId: string) => void;
  removeAppFromFavorites: (appId: string) => void;
  goToHome: () => void;
}

const DEFAULT_SETTINGS: LawnchairSettingsState = {
  isDarkMode: true,
  themedIcons: true,
  iconShape: 'circle',
  accentPaletteId: 'obsidian_dark',
  iconPack: 'lawnicons',
  iconSizePercent: 100,
  showIconLabels: true,
  fontFamily: 'Google Sans',

  gridColumns: 4,
  gridRows: 5,
  showAtAGlance: true,
  atAGlanceWeather: true,
  atAGlanceBattery: true,
  atAGlanceEvents: true,
  showSearchBarOnHome: false,
  homeSearchProvider: 'google',

  showDock: true,
  dockIconCount: 5,
  showDockSearchBar: true,
  dockSearchBarPosition: 'bottom',
  dockOpacity: 100,

  drawerColumns: 4,
  showRecentApps: true,
  showAZIndex: true,
  drawerSearchAutoKeyboard: true,
  drawerBackgroundOpacity: 90,

  doubleTapToSleep: true,
  swipeDownAction: 'notifications',
  swipeUpAction: 'app_drawer',

  enableHaptics: true,
  enableSounds: true,
};

const LawnchairContext = createContext<LawnchairContextType | undefined>(undefined);

export const LawnchairProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apps, setApps] = useState<AppItem[]>(INITIAL_APPS);
  const [folders, setFolders] = useState<FolderItem[]>(INITIAL_FOLDERS);
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    {
      id: 'clock_digital_1',
      type: 'clock_digital',
      size: '4x2',
      homePosition: { page: 1, row: 0, col: 0 },
    },
    {
      id: 'spotify_widget_1',
      type: 'spotify',
      size: '4x2',
      homePosition: { page: 1, row: 2, col: 0 },
    }
  ]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = 2;

  const [currentWallpaper, setCurrentWallpaper] = useState<Wallpaper>(WALLPAPERS[0]);
  const [settings, setSettings] = useState<LawnchairSettingsState>(DEFAULT_SETTINGS);

  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);
  const [activeFolder, setActiveFolder] = useState<FolderItem | null>(null);
  const [runningApp, setRunningApp] = useState<AppItem | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuData | null>(null);
  const [drawerSearchQuery, setDrawerSearchQuery] = useState<string>('');

  const [isPhoneFrameMode, setIsPhoneFrameMode] = useState<boolean>(true);
  const [recordingZoom, setRecordingZoom] = useState<number>(1.0);

  // Active Monet Palette based on wallpaper and dark mode
  const activePalette = settings.isDarkMode
    ? currentWallpaper.darkPalette
    : currentWallpaper.palette;

  // Apply Monet palette to launcher container dynamically
  useEffect(() => {
    const root = document.documentElement;
    applyMonetPaletteToElement(activePalette, root);
    if (settings.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [activePalette, settings.isDarkMode]);

  const updateSettings = (partial: Partial<LawnchairSettingsState>) => {
    if (settings.enableSounds) playTapSound();
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  const setWallpaper = (wallpaper: Wallpaper) => {
    if (settings.enableSounds) playTapSound();
    setCurrentWallpaper(wallpaper);
  };

  const setPalette = (palette: MonetPalette) => {
    if (settings.enableSounds) playTapSound();
    // Update active palette
    const updated = {
      ...currentWallpaper,
      palette: palette.isDarkPalette ? currentWallpaper.palette : palette,
      darkPalette: palette.isDarkPalette ? palette : currentWallpaper.darkPalette,
    };
    setCurrentWallpaper(updated);
  };

  const openOverlay = (overlay: ActiveOverlay) => {
    if (settings.enableSounds) {
      if (overlay === 'app_drawer') playDrawerSound();
      else playTapSound();
    }
    setActiveOverlay(overlay);
    setContextMenu(null);
  };

  const closeOverlay = () => {
    if (settings.enableSounds) playTapSound();
    setActiveOverlay(null);
    setDrawerSearchQuery('');
    setContextMenu(null);
  };

  const openFolder = (folder: FolderItem) => {
    if (settings.enableSounds) playTapSound();
    setActiveFolder(folder);
    setActiveOverlay('folder_modal');
    setContextMenu(null);
  };

  const closeFolder = () => {
    if (settings.enableSounds) playTapSound();
    setActiveFolder(null);
    if (activeOverlay === 'folder_modal') {
      setActiveOverlay(null);
    }
  };

  const launchApp = (appOrId: AppItem | string) => {
    if (settings.enableSounds) playOpenAppSound();
    const app = typeof appOrId === 'string'
      ? apps.find((a) => a.id === appOrId)
      : appOrId;

    if (!app) return;

    if (app.id === 'lawnchair_settings') {
      setActiveOverlay('lawnchair_settings');
      setActiveFolder(null);
      setContextMenu(null);
      return;
    }

    setRunningApp(app);
    setActiveOverlay('running_app');
    setActiveFolder(null);
    setContextMenu(null);
  };

  const closeRunningApp = () => {
    if (settings.enableSounds) playTapSound();
    setRunningApp(null);
    setActiveOverlay(null);
  };

  const openContextMenu = (data: ContextMenuData) => {
    if (settings.enableSounds) playTapSound();
    setContextMenu(data);
    setActiveOverlay('context_menu');
  };

  const closeContextMenu = () => {
    setContextMenu(null);
    if (activeOverlay === 'context_menu') {
      setActiveOverlay(null);
    }
  };

  const togglePhoneFrameMode = () => {
    if (settings.enableSounds) playTapSound();
    setIsPhoneFrameMode((prev) => !prev);
  };

  const renameFolder = (folderId: string, newName: string) => {
    setFolders((prev) =>
      prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
    );
  };

  const addAppToFavorites = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, isFavorite: true } : a))
    );
  };

  const removeAppFromFavorites = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, isFavorite: false } : a))
    );
  };

  const goToHome = () => {
    if (settings.enableSounds) playTapSound();
    setActiveOverlay(null);
    setActiveFolder(null);
    setRunningApp(null);
    setContextMenu(null);
    setDrawerSearchQuery('');
    setCurrentPage(0);
  };

  return (
    <LawnchairContext.Provider
      value={{
        apps,
        folders,
        widgets,
        activeFolder,
        runningApp,
        currentPage,
        totalPages,
        currentWallpaper,
        activePalette,
        settings,
        activeOverlay,
        contextMenu,
        drawerSearchQuery,
        isPhoneFrameMode,
        recordingZoom,
        setCurrentPage,
        setWallpaper,
        setPalette,
        updateSettings,
        openOverlay,
        closeOverlay,
        openFolder,
        closeFolder,
        launchApp,
        closeRunningApp,
        openContextMenu,
        closeContextMenu,
        setDrawerSearchQuery,
        togglePhoneFrameMode,
        setRecordingZoom,
        renameFolder,
        addAppToFavorites,
        removeAppFromFavorites,
        goToHome,
      }}
    >
      {children}
    </LawnchairContext.Provider>
  );
};

export const useLawnchair = (): LawnchairContextType => {
  const context = useContext(LawnchairContext);
  if (!context) {
    throw new Error('useLawnchair must be used within a LawnchairProvider');
  }
  return context;
};
