declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    whileFocus?: any;
    drag?: any;
    dragConstraints?: any;
    dragElastic?: any;
    dragMomentum?: any;
    dragPropagation?: any;
    dragSnapToOrigin?: any;
    dragTransition?: any;
    onDrag?: any;
    onDragStart?: any;
    onDragEnd?: any;
    onAnimationStart?: any;
    onAnimationComplete?: any;
    onUpdate?: any;
    onHoverStart?: any;
    onHoverEnd?: any;
    onTap?: any;
    onTapStart?: any;
    onTapCancel?: any;
    onFocus?: any;
    onBlur?: any;
    onViewportEnter?: any;
    onViewportLeave?: any;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    key?: string | number;
    [key: string]: any;
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
    h1: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    h2: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    h3: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
    p: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
    span: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
    button: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
    input: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>>;
    img: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLImageElement> & React.RefAttributes<HTMLImageElement>>;
    video: React.ForwardRefExoticComponent<MotionProps & React.HTMLAttributes<HTMLVideoElement> & React.RefAttributes<HTMLVideoElement>>;
    [key: string]: React.ForwardRefExoticComponent<any>;
  };
  
  export const AnimatePresence: React.FC<{
    children: React.ReactNode;
    mode?: "wait" | "sync" | "popLayout";
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
}
