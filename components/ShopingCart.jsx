import {useState} from 'react'

import Link from 'next/link'

import { styled } from '../stitches.config'
import * as Dialog from '@radix-ui/react-dialog';

import { useTransition, animated, config } from 'react-spring';
import { 
  Basket,
  FormClose,
  Shop,
} from 'grommet-icons';
import { client } from '../utils/shopify-client'
import { SpinnerCircular } from 'spinners-react';

import Button from '../components/Button'
import IconButton from '../components/IconButton'


/*Shoping Cart*/
export default function ShopingCart(props) {
  let [open, setOpen] = useState(false);

  if (props.cartOpen !== open) {
    setOpen(props.cartOpen);
  }

  const openCheckout = () => {
    window.open(props.checkout.webUrl);
  }

  function handleOpenChange(open) {
    setOpen(open);
    props.setCartOpen(open);
  }

  const transitions = useTransition(open, {
    from: { opacity: 0, x: 380 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 380 },
    config: config.default,
  });

  const cartItems = props.checkout.lineItems.map((item) =>
    <CartItem key={item.id} {...props} item={item}/>)

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <IconButton func='cart'>
          <Shop/>
          {props.total? <span/> : null}
          {props.total? <span>{props.total}</span> : null}
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
      {transitions((styles, item) =>
        item ? (
          <Overlay forceMount asChild>
            <animated.div
              style={{
                opacity: styles.opacity,
              }}>
              <Content forceMount asChild>
                <animated.div style={styles}>

                <Cart>
                  <CartHeader>
                    <Dialog.Close asChild>
                      <CloseButton>
                        <FormClose/>
                      </CloseButton>
                    </Dialog.Close>
                    <h2>Корзина</h2>
                    <Counter>
                      {props.checkoutLoading ?  <SpinnerLarge/> :
                      (props.total? props.total : null)}
                    </Counter>
                  </CartHeader>

                  <ItemsHolder>
                    {cartItems}
                  </ItemsHolder>

                  <CartFooter>
                    <CartTotal>
                      <span>Сумма:</span>
                      <span>
                        {props.checkoutLoading ?  <SpinnerLarge/> :
                        (props.checkout.subtotalPrice.slice(0,-3) + ' \u20BD')}
                      </span>
                    </CartTotal>    
                    <div>
                      <Button mode='checkout' onClick={openCheckout}>
                          ОФОРМИТЬ ЗАКАЗ
                      </Button>
                    </div>
                  </CartFooter>

                  </Cart>

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

/*Line Item*/
function CartItem (props) {
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [cartItemUpdating, setCartItemUpdating] = useState(false);

  const closeWithDelay = () => {
    let timer = setTimeout(() => {
      props.setCartOpen(false);
      clearTimeout(timer);
    }, 200)
  };

  const updateQuantityInCart = (lineItemId, quantity) => {
    const lineItemsToUpdate = [{id: lineItemId, quantity: quantity}]
    const fetchData = async () => {
      setCartItemUpdating(true);
      props.setCheckoutLoading(true);
      const res = await client.checkout.updateLineItems(props.checkout.id, lineItemsToUpdate);
      props.setCheckout(JSON.parse(JSON.stringify(res)));
      setCartItemUpdating(false);
      props.setCheckoutLoading(false);
    };
    fetchData();
  };

  const increment = () => {
    updateQuantityInCart(props.item.id, quantity + 1)
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    if (quantity > 1) {
      updateQuantityInCart(props.item.id, quantity - 1)
      setQuantity(quantity - 1);
    }
  }

  return (
    <CartItemStyled>
      <div>
        <img src={props.item.variant.image.src}/>
      </div>
      <ItemText>
        <Link href={`/products/${props.item.variant.product.handle}`}>
          <ProductName onClick={closeWithDelay}>
            {props.item.title}
          </ProductName>
        </Link>
        <ItemQuantity>
          <span>Кол-во:</span>
          <button onClick={decrement}>-</button>
          <span>
            {cartItemUpdating ?  <SpinnerSmall/> : props.item.quantity}
          </span>
          <button onClick={increment}>+</button>
        </ItemQuantity>
        <span>
          {props.item.variant.price.slice(0,-3) * props.item.quantity + ' \u20BD'}
        </span>
      </ItemText>
      <IconButton size="small" onClick={() => props.removeLineItemInCart(props.item.id)}>
        <Basket/>
      </IconButton>
    </CartItemStyled>)
}


const SpinnerLarge = () => <SpinnerCircular size={18} thickness={100} speed={100} color='#B8784E' secondaryColor="rgba(0, 0, 0, 0)" />
const SpinnerSmall = () => <SpinnerCircular size={16} thickness={100} speed={100} color='#B8784E' secondaryColor="rgba(0, 0, 0, 0)" />

const ItemQuantity = styled('div', {
  display: 'inline-flex',
  gap: '$1',
  alignItems: 'center',
  '& span:first-child': {
    marginRight: 2,
  },
  '& span:nth-child(3)': {
    textAlign: 'center',
    width: 15,
  },
  '& button': {
    all: 'unset',
    backgroundColor: 'white',
    width: 19,
    borderRadius: '50%',
    border: '1px solid $border',
    textAlign: 'center',
    cursor: 'pointer',
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
  justifyContent: 'right',
});

const Content = styled(Dialog.Content, {
  minWidth: 380,
  outline: 'none',
  background: 'white',
});

const Cart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  backgroundColor: '$cart',
});

const CartHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid $border', 
  height: 45, 
  justifyContent: 'space-between',
});

const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 45,
  height: 45,
  borderRight: '1px solid $border',
  '& svg': {
    width: '34px',
    height: '34px',
    transform: 'translate(0, -2px)',
  },
  '& svg path': {
    stroke: '#222 !important',
  },
  '&:hover svg path': {
    stroke: '$link !important',
  },
});

const Counter = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 45,
  height: 45,
  borderLeft: '1px solid $border',
});

const ItemsHolder = styled('div', {
  paddingX: 20,
  marginBottom: 'auto',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ddd',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white'
  },
});

const CartItemStyled = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingY: 20,
  borderBottom: '1px solid $border',
  '& > div:first-child': {
    display: 'flex',
    justifyContent: 'center',
    width: 95,
  },
  '& img': {
    maxWidth: 95,
    maxHeight: 95,
  },
});

const ItemText = styled('div', {
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  paddingLeft: 16,
  width: 200,
  '& span:nth-child(2)': {
    fontWeight: 500,
    fontSize: '$3',
  },
  '& span:last-child': {
    color: '$link',
    fontSize: '$3',
  },
});

const ProductName = styled('a', {
  fontSize: '$3',
  lineHeight: 1.6,
});

const CartFooter = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const CartTotal = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  paddingX: 40,
  backgroundColor: 'white',
  '& span:nth-child(2)': {
    color: '$link'
  },
});