import React from 'react';
import officialSystemIcons from '@/lib/official-system-icons.json';

interface SystemSvgIconProps {
  name: keyof typeof officialSystemIcons | string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const SystemSvgIcon: React.FC<SystemSvgIconProps> = ({
  name,
  size = 18,
  className = '',
  style,
}) => {
  const rawSvg = (officialSystemIcons as Record<string, string>)[name];

  if (!rawSvg) {
    return <div className={`inline-block ${className}`} style={{ width: size, height: size, ...style }} />;
  }

  // Sanitize and adapt SVG to currentColor
  const viewBoxMatch = rawSvg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 192 192';

  let cleaned = rawSvg
    .replace(/stroke="#[0-9a-fA-F]+"/gi, 'stroke="currentColor"')
    .replace(/stroke="black"/gi, 'stroke="currentColor"')
    .replace(/stroke="#000"/gi, 'stroke="currentColor"')
    .replace(/fill="#[0-9a-fA-F]+"/gi, 'fill="currentColor"')
    .replace(/fill="black"/gi, 'fill="currentColor"')
    .replace(/fill="#000"/gi, 'fill="currentColor"');

  const innerContent = cleaned
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '');

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: innerContent }}
    />
  );
};
