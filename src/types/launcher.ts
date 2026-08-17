export type IconShape = 'circle' | 'squircle' | 'rounded_square' | 'teardrop' | 'pebble';

export interface AppItem {
  id: string;
  name: string;
  packageName: string;
  category: 'google' | 'social' | 'system' | 'media' | 'tools' | 'productivity';
  iconColor: string;
  iconBg: string;
  iconType: 'svg';
  notificationCount?: number;
  isFavorite?: boolean;
  dockPosition?: number;
  homePosition?: { page: number; row: number; col: number };
  shortcuts?: { id: string; label: string; icon: string }[];
}

export interface FolderItem {
  id: string;
  name: string;
  color?: string;
  appIds: string[];
  homePosition: { page: number; row: number; col: number };
}

export interface WidgetItem {
  id: string;
  type: 'clock_analog' | 'clock_digital' | 'weather' | 'spotify' | 'smartspacer_battery' | 'photos';
  size: '2x1' | '2x2' | '3x2' | '4x2' | '4x3';
  homePosition: { page: number; row: number; col: number };
  data?: any;
}

export interface MonetPalette {
  id: string;
  name: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  surfaceContainerLow: string;
  isDarkPalette?: boolean;
}

export interface Wallpaper {
  id: string;
  name: string;
  category: 'Pixel 9' | 'Pixel 8' | 'Material You' | 'Minimal' | 'Lawnchair';
  url: string;
  thumbnail: string;
  blurHash?: string;
  palette: MonetPalette;
  darkPalette: MonetPalette;
}

export interface LawnchairSettingsState {
  // Theme
  isDarkMode: boolean;
  themedIcons: boolean;
  iconShape: IconShape;
  accentPaletteId: string;
  iconPack: 'lawnicons' | 'system' | 'pixel';
  iconSizePercent: number; // 80 - 130
  showIconLabels: boolean;
  fontFamily: 'Google Sans' | 'Roboto' | 'System';

  // Home Screen
  gridColumns: number; // 4, 5, 6
  gridRows: number; // 4, 5, 6
  showAtAGlance: boolean;
  atAGlanceWeather: boolean;
  atAGlanceBattery: boolean;
  atAGlanceEvents: boolean;
  showSearchBarOnHome: boolean;
  homeSearchProvider: 'google' | 'lawnchair' | 'duckduckgo';

  // Dock
  showDock: boolean;
  dockIconCount: number; // 4, 5, 6
  showDockSearchBar: boolean;
  dockSearchBarPosition: 'bottom' | 'top';
  dockOpacity: number; // 0 - 100

  // App Drawer
  drawerColumns: number; // 4, 5
  showRecentApps: boolean;
  showAZIndex: boolean;
  drawerSearchAutoKeyboard: boolean;
  drawerBackgroundOpacity: number;

  // Gestures
  doubleTapToSleep: boolean;
  swipeDownAction: 'notifications' | 'search' | 'quick_settings' | 'none';
  swipeUpAction: 'app_drawer' | 'search' | 'none';

  // Sounds / Haptics
  enableHaptics: boolean;
  enableSounds: boolean;
}

export type ActiveOverlay = 
  | null
  | 'app_drawer'
  | 'quick_settings'
  | 'wallpaper_picker'
  | 'widget_picker'
  | 'lawnchair_settings'
  | 'running_app'
  | 'context_menu'
  | 'folder_modal';
