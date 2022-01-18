import { useState } from 'react';
import Link from 'next/link';

import { styled } from '../stitches.config';

import AddToCart from '../components/AddToCart';
import ProductItemSkeleton from '../components/ProductItemSkeleton';
import Quickview from '../components/Quickview';


function ProductItem (props) {
  const [imgLoading, setImgLoading] = useState(true);

  return <>
          {!imgLoading ?
            <ProductCard>
              <ProductImage>
                <img src={props.product.images[0].src}/>
                <div>
                  <IconsMenu>
                    <Quickview 
                      addVariantToCart={props.addVariantToCart}
                      product={props.product}
                      openCart={props.openCart}
                    />
                    <AddToCart
                      addVariantToCart={props.addVariantToCart}
                      checkout={props.checkout}
                      checkoutLoading={props.checkoutLoading}
                      openCart={props.openCart}
                      openCheckout={props.openCheckout}
                      product={props.product}
                      products={props.products}
                      total={props.total}
                    />
                  </IconsMenu>
                </div>
              </ProductImage>
                <Link href={`/products/${props.product.handle}`}>
                  <ProductName>
                    {props.product.title}
                  </ProductName>
                </Link>
              <span>{props.product.variants[0].price.slice(0,-3) + ' \u20BD'}</span>
            </ProductCard> : 
            <>
              <ProductItemSkeleton/>
              <HiddenImg
                src={props.product.images[0].src}
                onLoad={() => setImgLoading(false)}
              />
            </>
            }
          </>
}

export default ProductItem

const HiddenImg = styled('img', {
  display: 'none',
});

const IconsMenu = styled('div', {
  display: 'flex',
  gap: 40,
  '@bp2': {
    gap: '$6',
  },
});

const ProductCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '$3',
  position: 'relative',
  gap: '$2',
  '& img': {
    maxWidth: '100%',
    height: '100%',
  },
  '& span': {
    color: '$link',
  },
});

const ProductImage = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  aspectRatio: '1 / 1',
  width: '100%',
  minHeight: 0,
  '& > div': {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 0,
    transition: 'all 300ms',
    zIndex: '1',
  },
  '&:hover > div': {
    opacity: 1,
  },
});

const ProductName = styled('a', {
  '&:hover': {
    color: '$link',
  },
});