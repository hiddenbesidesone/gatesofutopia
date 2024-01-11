import clsx from 'clsx';

/**
 * @param {{
 *   as?: React.ElementType;
 *   className?: string;
 *   flow?: 'row' | 'col';
 *   gap?: 'default' | 'blog';
 *   items?: number;
 *   layout?: 'default' | 'products' | 'auto' | 'blog';
 *   [key: string]: any;
 * }}
 */
export function Grid({
  as: Component = 'div',
  className,
  flow = 'row',
  gap = 'default',
  items = 4,
  layout = 'default',
  ...props
}) {
  const layouts = {
    default: `grid-cols-1 ${items === 2 && 'md:grid-cols-3'}  ${
      items === 3 && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      } ${items > 3 && 'md:grid-cols-3'} ${items >= 4 && 'lg:grid-cols-3'}`,
    products: `grid-cols-1 ${items >= 3 && 'md:grid-cols-3'} ${
      items >= 4 && 'lg:grid-cols-2'
      }`,
    auto: 'auto-cols-auto',
    blog: 'grid-cols-1 md:grid-cols-2',
  };

  const gaps = {
    default: 'grid border-t border-gray-400',
    blog: 'grid gap-6',
  };

  const flows = {
    row: 'grid-flow-row',
    col: 'grid-flow-col',
  };

  const styles = clsx(flows[flow], gaps[gap], layouts[layout], className);

  return <Component {...props} className={styles} />;
}
