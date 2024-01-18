import clsx from 'clsx';

import {missingClass, formatText} from '~/lib/utils';

/**
 * @param {{
 *   as?: React.ElementType;
 *   className?: string;
 *   color?: 'default' | 'primary' | 'subtle' | 'notice' | 'contrast';
 *   format?: boolean;
 *   size?: 'lead' | 'copy' | 'fine';
 *   width?: 'default' | 'narrow' | 'wide';
 *   children: React.ReactNode;
 *   [key: string]: any;
 * }}
 */
export function Text({
  as: Component = 'span',
  className,
  color = 'default',
  format,
  size = 'copy',
  width = 'default',
  children,
  ...props
}) {
  const colors = {
    default: 'inherit',
    primary: 'text-primary/90',
    subtle: 'text-primary/50',
    notice: 'text-notice',
    contrast: 'text-contrast/90',
  };

  const sizes = {
    lead: 'text-lead uppercase',
    copy: 'text-copy uppercase',
    fine: 'text-fine subpixel-antialiased',
  };

  const widths = {
    default: 'max-w-prose',
    narrow: 'max-w-prose-narrow',
    wide: 'max-w-prose-wide',
  };

  const styles = clsx(
    missingClass(className, 'max-w-') && widths[width],
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    missingClass(className, 'text-') && colors[color],
    sizes[size],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}

/**
 * @param {{
 *   as?: React.ElementType;
 *   children: React.ReactNode;
 *   format?: boolean;
 *   size?: 'display' | 'heading' | 'lead' | 'copy';
 *   width?: 'default' | 'narrow' | 'wide';
 * } & React.HTMLAttributes<HTMLHeadingElement>}
 */
export function Heading({
  as: Component = 'h2',
  children,
  className = '',
  format,
  size = 'heading',
  width = 'default',
  ...props
}) {
  const sizes = {
    display: 'text-display', // HB1_ display: 'font-bold text-display',
    heading: 'text-heading', // HB1_ heading: 'font-bold text-heading',
    lead: 'text-lead uppercase pb-3 px-3 py-3', // HB1_ lead: 'font-bold text-lead uppercase',
    copy: 'text-copy', // HB1_ copy: 'font-medium text-copy',
  };

  const widths = {
    default: 'max-w-prose',
    narrow: 'max-w-prose-narrow',
    wide: 'max-w-prose-wide',
  };

  const styles = clsx(
    missingClass(className, 'whitespace-') && 'whitespace-pre-wrap',
    missingClass(className, 'max-w-') && widths[width],
    missingClass(className, 'font-') && sizes[size],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {format ? formatText(children) : children}
    </Component>
  );
}

/**
 * @param {{
 *   as?: React.ElementType;
 *   children?: React.ReactNode;
 *   className?: string;
 *   divider?: 'none' | 'top' | 'bottom' | 'both';
 *   display?: 'grid' | 'flex';
 *   heading?: string;
 *   padding?: 'x' | 'y' | 'swimlane' | 'all';
 *   [key: string]: any;
 * }}
 */
export function Section({
  as: Component = 'section',
  children,
  className,
  divider = 'none',
  display = 'grid',
  heading,
  padding = 'all',
  ...props
}) {
  const paddings = {
    x: 'px-3 md:px-3 lg:px-3 py-3 md:py-3 lg:py-3',
    y: 'py-3 md:py-3 lg:py-3 lg:pb-8',
    swimlane: 'pt-4 md:pt-8 lg:pt-12 md:pb-4 lg:pb-8',
    all: 'p-0 md:p-0 md:pt-0 lg:p-0 lg:pt-0',
  };

  const dividers = {
    none: '',
    top: 'border-t border-primary/05',
    bottom: 'border-b border-primary/05',
    both: 'border-y border-primary/05',
  };

  const displays = {
    flex: 'flex',
    grid: 'grid',
  };

  const styles = clsx(
    'w-full',
    displays[display],
    missingClass(className, '\\mp[xy]?-') && paddings[padding],
    dividers[divider],
    className,
  );

  return (
    <Component {...props} className={styles}>
      {heading && (
        <Heading size="lead" className={padding === 'y' ? paddings['x'] : ''}>
          {heading}
        </Heading>
      )}
      {children}
    </Component>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   className?: string;
 *   heading?: string;
 *   variant?: 'default' | 'blogPost' | 'allCollections';
 *   [key: string]: any;
 * }}
 */
export function PageHeader({
  children,
  className,
  heading,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'grid w-full gap-8 p-3 pb-0 md:p-3 md:pb-0 lg:p-3 lg:pb-0 justify-items-start border-solid border-gray-400 border-b',
    blogPost:
      'grid md:text-center w-full gap-4 p-6 py-8 md:p-8 lg:p-12 md:justify-items-center',
    allCollections:
      'flex justify-between items-baseline gap-8 p-3 pb-0 md:p-3 md:pb-0 lg:p-3 lg:pb-0',
  };

  const styles = clsx(variants[variant], className);

  return (
    <header {...props} className={styles}>
      {heading && (
        <Heading as="h1" width="narrow" size="heading" className="inline-block pb-3">
          {heading}
        </Heading>
      )}
      {children}
    </header>
  );
}
