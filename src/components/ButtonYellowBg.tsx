import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';

// Props
interface IButtonYellowBgProps {
  context?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
}

export const ButtonYellowBg = forwardRef<
  HTMLButtonElement,
  IButtonYellowBgProps
>(({ context, type = undefined, className ,...props}, ref) => {
  return (
    <Button
      ref={ref}
      type={type}
      className={`${className} inset-1 border-[1px] border-custom-yellow bg-custom-yellow px-6 text-custom-black hover:border-white hover:bg-transparent hover:text-white`}
      {...props}
    >
      {context}
    </Button>
  );
});
