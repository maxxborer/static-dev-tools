import { useState, useEffect } from 'react';
import { Spinner } from '@nextui-org/react';
import clsx from 'clsx';

const DELAY = 300;

export function SmartSpinner({ className, size = 'lg', ...props }: React.ComponentProps<typeof Spinner>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), DELAY);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Spinner
      className={clsx(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-opacity duration-300',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      size={size}
      {...props}
    />
  );
}
