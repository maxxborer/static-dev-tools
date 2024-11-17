import dynamic from 'next/dynamic';
import { type FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RHFDevTool = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool as FC<any>), {
  ssr: false,
});
