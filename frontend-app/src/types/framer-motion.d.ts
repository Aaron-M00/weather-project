import 'react';

declare module 'react' {
  interface Attributes {
    // Allows motion.div to accept className
    className?: string
    src?: string
    alt?: string
  }
}
