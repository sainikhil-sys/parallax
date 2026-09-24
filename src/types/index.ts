export interface NavSection {
  id: string;
  number: string;
  label: string;
  href: string;
}

export interface ParallaxLayerProps {
  children?: React.ReactNode;
  speed?: number; // Parallax multiplier e.g. 0.1 to 1.5
  horizontalSpeed?: number;
  scale?: number;
  rotate?: number;
  opacity?: [number, number]; // [startOpacity, endOpacity]
  className?: string;
  zIndex?: number;
  triggerRef?: React.RefObject<HTMLElement | null>;
  disabledOnMobile?: boolean;
}

export type CursorMode = 'default' | 'hover' | 'magnetic' | 'explore' | 'drag' | 'text';

export interface CursorContextType {
  cursorMode: CursorMode;
  cursorText: string;
  setCursorState: (mode: CursorMode, text?: string) => void;
  resetCursor: () => void;
}
