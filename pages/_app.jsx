import { useState, useEffect, useCallback } from 'react';

import cookieCutter from 'cookie-cutter'
import { client } from '../utils/shopify-client'
import { globalCss } from '../stitches.config'

import Footer from '../components/Footer'
import Header from '../components/Header'


function MyApp({ Component, pageProps }) {
  
  globalStyles();

  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState({ lineItems: [] });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  /*create||fetch checkout*/
  useEffect(() => {
    const createCheckout = async () => {
      const today = new Date();
      const date = new Date();
      date.setDate(today.getDate() + 7);
      const res = await client.checkout.create();
      setCheckout(JSON.parse(JSON.stringify(res)));
      cookieCutter.set('checkoutCookie', (JSON.parse(JSON.stringify(res.id))), { expires: date });
    }; 
    const fetchCheckout = async () => {
      setCheckoutLoading(true);
      const res = await client.checkout.fetch(cookieCutter.get('checkoutCookie'));
      setCheckout(JSON.parse(JSON.stringify(res)));
      setCheckoutLoading(false);
    }; 
    if (!cookieCutter.get('checkoutCookie')) {
      createCheckout();   
    } else {
      fetchCheckout();
    }
  }, []);

  /*fetch products*/
  useEffect(() => {
    const fetchData = async () => {
      setProductsLoading(true);
      const res = await client.product.fetchAll();
      setProducts(JSON.parse(JSON.stringify(res)));
      setProductsLoading(false);
    }; 
    fetchData();   
  }, []);

  /*fetch collections*/
  useEffect(() => {
    const fetchData = async () => {
      setCollectionsLoading(true);
      const res = await client.collection.fetchAllWithProducts();
      setCollections(JSON.parse(JSON.stringify(res)));
      setCollectionsLoading(false);
    }; 
    fetchData();   
  }, []);

  const openCart = () => {
    setCartOpen(true);
  }

  const openCheckout = () => {
    window.open(checkout.webUrl);
  }

  const addVariantToCart = (variantId, quantity) => {
    const lineItemsToAdd = [{variantId, quantity: quantity}]

    const fetchData = async () => {
      setCheckoutLoading(true);
      const res = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
      setCheckout(JSON.parse(JSON.stringify(res)));
      setCheckoutLoading(false);
    };
    fetchData();
  };

  const removeLineItemInCart = (lineItemId) => {
    const fetchData = async () => {
      setCheckoutLoading(true);
      const res = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
      setCheckout(JSON.parse(JSON.stringify(res)));
      setCheckoutLoading(false);
    }
    fetchData();
  };

  const totalQuantity = () => {
    function getSum(total, item) {
      return total + item.quantity;
    }
    if (checkout) {
      return checkout.lineItems.reduce(getSum, 0);
    }
  };

  const total = totalQuantity();

  return (
    <>
      <Header 
        cartOpen={cartOpen}
        checkout={checkout}
        checkoutLoading={checkoutLoading}
        products={products}
        removeLineItemInCart={removeLineItemInCart}
        setCartOpen={setCartOpen}
        setCheckout={setCheckout}
        setCheckoutLoading={setCheckoutLoading}
        total={total}
      />
      <Component
        {...pageProps}
        addVariantToCart={addVariantToCart}
        checkout={checkout}
        checkoutLoading={checkoutLoading}
        collections={collections}
        collectionsLoading={collectionsLoading}
        openCart={openCart}
        openCheckout={openCheckout}
        products={products}
        productsLoading={productsLoading}
        total={total}
      />
      <Footer/>
    </>

  );
}


const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },

  body: {
    margin: 0,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTextSizeAdjust: '100%',
    fontFamily: '$roboto',
  },

  svg: {
    display: 'block',
    verticalAlign: 'middle',
  },

  'pre, code': { margin: 0, fontFamily: '$mono' },

  '::selection': {
    backgroundColor: '$violetA5',
    color: '$violet12',
  },

  '#__next': {
    position: 'relative',
    zIndex: 0,
  },

  'h1, h2, h3, h4, h5': { fontWeight: 500 },

  a: {
    cursor: 'pointer',
    color: 'black',
  }
});

export default MyApp