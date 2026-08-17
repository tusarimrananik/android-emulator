import { MonetPalette } from '@/types/launcher';

export const DEFAULT_LIGHT_PALETTE: MonetPalette = {
  id: 'ocean_blue_light',
  name: 'Pixel Ocean',
  primary: '#1a73e8',
  onPrimary: '#ffffff',
  primaryContainer: '#d2e3fc',
  onPrimaryContainer: '#041e49',
  secondary: '#5f6368',
  onSecondary: '#ffffff',
  secondaryContainer: '#e8eaed',
  onSecondaryContainer: '#202124',
  tertiary: '#0d652d',
  surface: '#f8f9fa',
  onSurface: '#1f1f1f',
  surfaceVariant: '#e1e3e1',
  onSurfaceVariant: '#444746',
  outline: '#747775',
  surfaceContainer: '#f0f4f9',
  surfaceContainerHigh: '#e9eef6',
  surfaceContainerHighest: '#e3e8ef',
  surfaceContainerLow: '#f7f9fc',
  isDarkPalette: false,
};

export const DEFAULT_DARK_PALETTE: MonetPalette = {
  id: 'ocean_blue_dark',
  name: 'Pixel Ocean Dark',
  primary: '#a8c7fa',
  onPrimary: '#041e49',
  primaryContainer: '#0842a0',
  onPrimaryContainer: '#d2e3fc',
  secondary: '#c4c7c5',
  onSecondary: '#2e3130',
  secondaryContainer: '#444746',
  onSecondaryContainer: '#e1e3e1',
  tertiary: '#6dd58c',
  surface: '#131314',
  onSurface: '#e3e3e3',
  surfaceVariant: '#444746',
  onSurfaceVariant: '#c4c7c5',
  outline: '#8e918f',
  surfaceContainer: '#1e1f20',
  surfaceContainerHigh: '#282a2c',
  surfaceContainerHighest: '#333537',
  surfaceContainerLow: '#181a1b',
  isDarkPalette: true,
};

export function applyMonetPaletteToElement(palette: MonetPalette, element: HTMLElement) {
  element.style.setProperty('--md-primary', palette.primary);
  element.style.setProperty('--md-on-primary', palette.onPrimary);
  element.style.setProperty('--md-primary-container', palette.primaryContainer);
  element.style.setProperty('--md-on-primary-container', palette.onPrimaryContainer);
  element.style.setProperty('--md-secondary', palette.secondary);
  element.style.setProperty('--md-on-secondary', palette.onSecondary);
  element.style.setProperty('--md-secondary-container', palette.secondaryContainer);
  element.style.setProperty('--md-on-secondary-container', palette.onSecondaryContainer);
  element.style.setProperty('--md-tertiary', palette.tertiary);
  element.style.setProperty('--md-surface', palette.surface);
  element.style.setProperty('--md-on-surface', palette.onSurface);
  element.style.setProperty('--md-surface-variant', palette.surfaceVariant);
  element.style.setProperty('--md-on-surface-variant', palette.onSurfaceVariant);
  element.style.setProperty('--md-outline', palette.outline);
  element.style.setProperty('--md-surface-container', palette.surfaceContainer);
  element.style.setProperty('--md-surface-container-high', palette.surfaceContainerHigh);
  element.style.setProperty('--md-surface-container-highest', palette.surfaceContainerHighest);
  element.style.setProperty('--md-surface-container-low', palette.surfaceContainerLow);
}
