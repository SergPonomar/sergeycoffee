import { useState } from 'react'

import { styled } from '../stitches.config'
import { keyframes } from '@stitches/react'

import * as Tooltip from '@radix-ui/react-tooltip';

import { Favorite } from 'grommet-icons';

import IconButton from '../components/IconButton'

export default function AddToCart(props) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <IconButton size='middle' func='quickview'>
          <Favorite/>
        </IconButton>
      </Tooltip.Trigger>
      <TooltipContent sideOffset={5}>
        В избранное
        <TooltipArrow />
      </TooltipContent>
    </Tooltip.Root>
  )
}

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const TooltipContent = styled(Tooltip.Content, {
  color: 'white',
  borderRadius: 4,
  padding: '10px 15px',
  fontSize: 15,
  lineHeight: 1,
  backgroundColor: 'black',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

const TooltipArrow = styled(Tooltip.Arrow, {
  fill: 'black',
});