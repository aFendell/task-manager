import { cn } from 'lib/utils';

export const H3 = ({
  children,
  className,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-center text-xl font-medium sm:text-start',
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const BoardCardTitle = ({
  children,
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className={'text-sm text-neutral-100'}>{children}</h3>;
};
