import Link from 'next/link';

import { styled } from '../stitches.config';
import { keyframes } from '@stitches/react';

import LeftPanel from '../components/LeftPanel';
import Searchbar from '../components/Searchbar';
import ShopingCart from '../components/ShopingCart';


export default function Header(props) {
  return (
    <Menu>
      <LeftPanel/>
      <Link href="/">
        <a>
          <img
            src="/logo.svg"
            alt="Логотип Coffee Shop"
          />
        </a>
      </Link>
      <Links as="nav" css={{ gap: '$6'}}>
        <Link href="/products">
          <NavLink>Каталог</NavLink>
        </Link>
        <Link href="/products?vendor=alta-roma">
          <NavLink>Alta Roma</NavLink>
        </Link>
        <Link href="/products?vendor=jardin">
          <NavLink>Jardin</NavLink>
        </Link>
        <Link href="/products?vendor=julius-meinl">
          <NavLink>Julius Meinl</NavLink>
        </Link>
      </Links>
      <IconMenu>
        <Searchbar products={props.products}/>
        <ShopingCart
          cartItemUpdating={props.cartItemUpdating}
          cartOpen={props.cartOpen}
          checkout={props.checkout}
          checkoutLoading={props.checkoutLoading}
          updateQuantityInCart={props.updateQuantityInCart}
          removeLineItemInCart={props.removeLineItemInCart}
          setCartOpen={props.setCartOpen}
          setCheckout={props.setCheckout}
          setCheckoutLoading={props.setCheckoutLoading}
          total={props.total}
        />
      </IconMenu>
    </Menu>
  )
}

const Menu = styled('div', {
  position: 'fixed',
  width: '100%',
  top: 0,
  display: 'flex',
  overflow: 'hidden',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 20,
  backgroundColor: 'hsl(0, 0%, 100%, .8)',
  boxShadow: '0 1px 5px hsl(0, 1%, 90%)',
  zIndex: '2',
  '& a:nth-child(2) img': {
    aspectRatio: '1 / 1',
    width: 60,
    '@bp2': {
      width: 50,
    },
  },
  '@bp2': {
    backgroundColor: 'hsl(0, 0%, 100%, 1.0)',
    paddingY: 0,
    boxShadow: 'none',
  },
});

const slideIn = keyframes({
  '0%': { transform: 'translate3d(-100%, 0, 0)' },
  '100%': { transform: 'translate3d(0, 0, 0)' },
})

const NavLink = styled('a', {
  position: 'relative',
  textDecoration: 'none',
  paddingX: '$2',
  paddingY: '$1',
  fontSize: '$4',
  overflow: 'hidden',
  transition: 'color 300ms',
  '&:hover': {
    color: '$link',
  },
  '&::after': {
    content: '',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '0.1em',
    backgroundColor: '$link',
    opacity: 0,
    transition: 'opacity 300ms, transform 500ms',
    transform: 'translate3d(100%, 0, 0)',
  },
  '&:hover::after, &:focus::after': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    animation: `${slideIn} 500ms`,
  }
})

const Links = styled('nav', {
  display: 'flex',
  gap: '$6',
  '@bp2': {
    display: 'none',
  }
});

const IconMenu = styled('div', {
  display: 'flex',
  overflow: 'hidden',
  gap: '$3',
  paddingY: 20,
  paddingRight: 20,
  marginRight: -20,
  '& svg': {
    width: '24px',
    height: '24px',
  },
  '& svg path': {
    stroke: '#555 !important',
  },
  '@bp2': {
    '& svg:nth-child(2), svg:nth-child(3)': {
      display: 'none',
    }
  }
});