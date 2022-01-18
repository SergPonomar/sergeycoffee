import { useState, useEffect } from 'react'

import { styled, css } from '../stitches.config'
import { keyframes } from '@stitches/react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';

import { useTransition, animated, config } from 'react-spring';
import { SpinnerCircular } from 'spinners-react';
import { 
  FormClose,
  Shop,
  Checkmark
} from 'grommet-icons';

import Button from '../components/Button'
import IconButton from '../components/IconButton'
import ImageGalleryNoThumbs from '../components/ImageGalleryNoThumbs'


export default function AddToCart(props) {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    function findLineItem (item) {
      return item.variant.id == props.product.variants[0].id
    }
    if (props.checkout) {
      let index = props.checkout.lineItems.findIndex(findLineItem)
      if (index != -1) {
        setQuantity(props.checkout.lineItems[index].quantity)
      }
    }
  }, [props.checkout]);

  useEffect(() => {
    if (props.product) {
      setPrice(props.product.variants[0].price.slice(0,-3))
    }
  }, [props.product]);

  useEffect(() => {
    function findProduct (item) {
      return item.variants[0].id == props.product.variants[0].id
    }
    let similarProducts = [];
    if (props.product) {
      let index = props.products.findIndex(findProduct)
      if (index != -1) {
        props.products.map((product, i) => {
          if (i != index) similarProducts.push(product);
        })
        for (let i = similarProducts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [similarProducts[i], similarProducts[j]] = [similarProducts[j], similarProducts[i]];
        }
      }
    }
    setSimilarProducts(similarProducts.slice(0, 5));
  }, [props.product]);

  const addToCart = (e) => {
    let variant = props.product.variants[0];
    let variantQuantity = 1;
    props.addVariantToCart(variant.id, variantQuantity);
  }
  
  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Root delayDuration={0}>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>
              <IconButton
                size='middle'
                func='quickview'
                onClick={addToCart}
              >
                <Shop/>
              </IconButton>
            </Dialog.Trigger>
          </Tooltip.Trigger>
          <TooltipContent sideOffset={5}>
            В корзину
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
                    <Container>
                      <AddedProduct>
                        <h3>
                          {props.checkoutLoading ?  <SpinnerLarge/> :
                          <><Checkmark /> Добавлено в корзину!</>}
                        </h3>
                        <img src={props.product.images[0].src}/>
                        <h3>{props.product.title}</h3>  
                        <span>ЦЕНА: {price + ' \u20BD'}</span>
                        <span>
                          {'Кол-во: '} 
                          {props.checkoutLoading ?  <SpinnerSmall/> : quantity}
                        </span>
                        <span>
                          {'СУММА: '} 
                          {props.checkoutLoading ?  <SpinnerSmall/> : price*quantity + ' \u20BD'}
                        </span>
                      </AddedProduct>
                      <Controls>
                        <p>Всего {props.checkoutLoading ?  <SpinnerSmall/> : props.total} 
                        {props.total == 1? " товар" : " товаров"}<br/>в Вашей корзине</p>
                        <span>
                          {'ОБЩАЯ СУММА: '} 
                          {props.checkoutLoading ?  <SpinnerSmall/> : props.checkout.subtotalPrice.slice(0,-3) + ' \u20BD'}
                        </span>
                        <Dialog.Close asChild>
                          <Button mode="controls">ПРОДОЛЖИТЬ ПОКУПКИ</Button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <Button mode="controlsGreen" onClick={props.openCart}>
                            ПЕРЕЙТИ В КОРЗИНУ
                          </Button>
                        </Dialog.Close>
                          <form>
                            <Terms>
                              <Checkbox id="c1" checked={checked} onCheckedChange={setChecked}>
                                <CheckboxPrimitive.Indicator>
                                  <Checkmark />
                                </CheckboxPrimitive.Indicator>
                              </Checkbox>
                              <Label css={{ paddingLeft: 15, textAlign: 'left' }} htmlFor="c1">
                                Принимаю условия пользования.
                              </Label>
                            </Terms>
                          </form>
                        {checked ?
                          <Dialog.Close asChild>
                            <Button mode="controlsGreen" onClick={props.openCheckout}>
                              ОФОРМИТЬ ЗАКАЗ
                            </Button>
                          </Dialog.Close> :
                          <Button mode="disabled">
                            ОФОРМИТЬ ЗАКАЗ
                          </Button>
                        }
                      </Controls>
                    </Container>
                    <GalleryContainer>
                      <ImageGalleryNoThumbs products={similarProducts}/>
                    </GalleryContainer>
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

const SpinnerLarge = () => <SpinnerCircular size={18} thickness={100} speed={100} color='#B8784E' secondaryColor="rgba(0, 0, 0, 0)" />
const SpinnerSmall = () => <SpinnerCircular size={16} thickness={100} speed={100} color='#B8784E' secondaryColor="rgba(0, 0, 0, 0)" />

const Terms = styled('div', {
 display: 'flex',
 alignItems: 'start',
});

const Label = styled('label', {
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
});

const Checkbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 12,
  height: 12,
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid black',
  '& svg': {
    width: 10,
    height: 10,
    stroke: 'white !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& svg path': {
    strokeWidth: '6 !important'
  },
  '&[data-state="checked"]': { 
    backgroundColor: '$blue',
    border: '1px solid $blue',
  },
});

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
  height: '45%',
  '& div:nth-child(4)': {
    gap: '$2',
  },
  '& div:nth-child(4)~div': {
    alignItems: 'start',
  },
  '& img': {
    minHeight: 0,
    minWidth: 0,
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
  position: 'relative',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  width: 800,
  height: 800,
  padding: '$3',
  '@bp3': {
    width: 700,
  },
  '@bp1': {
    width: 650,
  },
  '@bp0': {
    width: '100%',
  },
});

const Container = styled('div', {
  display: 'flex',
  alignItems: 'start',
  width: '100%',
  height: '55%',
  position: 'relative',
  borderBottom: '1px solid $border',
});

const AddedProduct = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
  gap: '$2',
  height: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRight: '1px solid $border',
  paddingBottom: '$5',
  textAlign: 'center', 
  '& h3:nth-child(1)': {
    color: 'red',
    '& svg': {
      width: '20px',
      height: '20px',
      transform: 'translate(-2px, -2px)',
    },
    '& svg path': {
      stroke: 'red !important',
    },
  },
  '& img': {
    minHeight: 0,
    height: '100%',
  },
  '& svg': {
    display: 'inline',
    marginLeft: '5px',
  },
});

const Controls = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'center',
  width: '50%',
  height: '100%',
  gap: '$2',
  paddingLeft: '$5',
  paddingRight: '$2',
  paddingBottom: '$5',
  '& p': {
    padding: 0,
    lineHeight: 1.4,
  },
  '& svg': {
    display: 'inline',
    marginX: '5px',
  },
  '& > a:last-child': {
    marginTop: '-$1',
  },
  '& label': {
    paddingLeft: 15,
    textAlign: 'left',
  },  
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