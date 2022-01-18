import { useState } from 'react'

import { styled } from '../stitches.config'
import { keyframes } from '@stitches/react'

import * as Dialog from '@radix-ui/react-dialog';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as Tooltip from '@radix-ui/react-tooltip';

import { useTransition, animated, config } from 'react-spring';
import { FormClose, Search } from 'grommet-icons';

import Button from '../components/Button';
import IconButton from '../components/IconButton';
import ImageGallery from '../components/ImageGallery';


export default function Quickview(props) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
  });

  const addToCart = () => {
    let variant = props.product.variants[0];
    let variantQuantity = quantity;
    props.addVariantToCart(variant.id, variantQuantity);
    setQuantity(1);
    props.openCart();
  }

  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    function boundQuantity () {
      if (quantity > 1) return quantity - 1
        else return 1
    };
    setQuantity(boundQuantity());
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>
              <IconButton size='middle' func='quickview'>
                <Search/>
              </IconButton>
            </Dialog.Trigger>
          </Tooltip.Trigger>
          <TooltipContent sideOffset={5}>
            Быстрый просмотр
            <TooltipArrow />
          </TooltipContent>
        </Tooltip.Root>
      <Dialog.Portal forceMount>
      {transitions((styles, item) =>
        item ? (
          <Overlay forceMount asChild>
            <animated.div
              style={{
                opacity: styles.opacity,
              }}>
              <Content
                onCloseAutoFocus={(e) => e.preventDefault()}
                forceMount
                asChild
              >
                <animated.div style={styles}>
                  <Dialog.Close asChild>
                    <CloseButton>
                      <FormClose/>
                    </CloseButton>
                  </Dialog.Close>
                  <GalleryContainer>
                    <ImageGallery product={props.product}/>
                  </GalleryContainer>
                  <Description>
                    <h3>{props.product.title}</h3>
                    <span>{props.product.variants[0].price.slice(0,-3) + ' \u20BD'}</span>
                    <Separator />
                    <p>{props.product.description}</p>
                    <ButtonBlock>
                      <Adder>
                        <span>{quantity}</span>
                        <div>
                          <button onClick={increment}>+</button>
                          <button onClick={decrement}>-</button>
                        </div>
                      </Adder>
                      <Dialog.Close asChild>
                        <Button mode="inverse" onClick={addToCart}>В КОРЗИНУ</Button> 
                      </Dialog.Close>
                    </ButtonBlock>
                  </Description>

                </animated.div>
              </Content>
            </animated.div>
          </Overlay>
        ) : null
      )}
      </Dialog.Portal>
    </Dialog.Root>
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

const GalleryContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  height: '100%',
  padding: '$3',
  gap: '$2',
  '& > div:first-child': {
    marginY: 'auto',
  },
});

const ButtonBlock = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$5',
  width: '100%',
});

const Adder = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid black',
  height: 55,
  width: 85,
  textAlign: 'center',
  fontWeight: '600',
  '& span': {
    width: '50%',
  },
  '& div': {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderLeft: '1px solid black',
    height: '100%',
  },
  '& button': {
    all: 'unset',
    cursor: 'pointer',
    fontSize: '$5',
    transition: 'color 300ms',
    height: '50%',
  },
  '& button:hover': {
    color: '$link',
  },
  '& button:not(:last-child)': {
    borderBottom: '1px solid black',
  },
});

const Overlay = styled(Dialog.Overlay, {
  background: 'rgba(0 0 0 / 0.7)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled(Dialog.Content, {
  zIndex: '0',
  outline: 'none',
  background: 'white',
  position: 'relative',
  display: 'flex',
  width: 760,
  aspectRatio: '1.27',
  '@bp2': {
    width: 660,
  },
  '@bp1': {
    width: 610,
  },
  '@bp0': {
    width: '100%',
  },
});

const Description = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  gap: 15,
  paddingTop: '$2',
  paddingLeft: '$2',
  paddingRight: '$6',
  '& > span': {
    color: '$link',
    fontSize: '$4',
  },
  '& p': {
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const Separator = styled(SeparatorPrimitive.Root, {
  height: 1, 
  width: '100%',
  backgroundColor: '$border',
});

const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 45,
  height: 45,
  position: 'absolute',
  top: -45,
  right: -15,
  '& svg': {
    width: '34px',
    height: '34px',
    transform: 'translate(0, -2px)',
  },
  '& svg path': {
    stroke: 'white !important',
  },
  '&:hover svg path': {
    stroke: '$link !important',
  },
});