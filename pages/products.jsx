import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { styled } from '../stitches.config'

import FilterPanel from '../components/FilterPanel'
import ProductItem from '../components/ProductItem'
import ProductItemSkeleton from '../components/ProductItemSkeleton'
import SortSelect from '../components/SortSelect'
import { useRouter } from 'next/router'


export default function Products(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState();
  const [filter, setFilter] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!filter) setProducts(JSON.parse(JSON.stringify(props.products)));
  }, [props.products, filter]);

  useEffect(() => {
    if (router) {
      let newFilter = Object.keys(router.query).map((key) => 
        (router.query)[key].split("_").map((val) => 
        key + ": " + val
      ));
      setFilter(newFilter.flat());
    }
  }, [router])

  useEffect(() => {
    if (!props.productsLoading && !props.collectionsLoading) {
      setProducts(JSON.parse(JSON.stringify(
        filterByCollection(filter, props.products, props.collections))));
    };
  }, [props.productsLoading, props.collectionsLoading, filter, 
        props.products, props.collections])
    
  const filterHandle = (filters) => {
    let keys = new Set();
    filters.forEach(filter => 
      keys.add(filter.substring(0, filter.indexOf(":")))
    );
    const uri = [...keys].map(key => 
      key + `=${
      filters
        .filter(f => f.substring(0, f.indexOf(":")) == key)
        .map(f => encodeURIComponent(f.substring(f.indexOf(":") + 2)))
        .join("_")}`
      ).join("&");
    router.push(`/products${uri ? "?" + uri : ""}`, undefined, { shallow: true });
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const sortProducts = (sorting) => {
    const productsArr = JSON.parse(JSON.stringify(products));
    switch (sorting) {
      case "По умолчанию":
        setProducts(productsArr);
        break;
      case "Дешевле":
        setProducts(productsArr.sort((a, b) => 
          parseInt(a.variants[0].price) - parseInt(b.variants[0].price)));
        break;
      case "Дороже":
        setProducts(productsArr.sort((a, b) => 
          parseInt(b.variants[0].price) - parseInt(a.variants[0].price)));
        break;
      case "По дaте":
        setProducts(productsArr.sort((a, b) => 
          (b.updatedAt < a.updatedAt) ? -1 : ((b.updatedAt > a.updatedAt) ? 1 : 0)));
        break;
      case "Date, old to new":
        setProducts(productsArr.sort((a, b) => 
          (a.updatedAt < b.updatedAt) ? -1 : ((a.updatedAt > b.updatedAt) ? 1 : 0)));
        break;
      default:
        console.log("Err, no such filter: " + filter + ".");
      };
    };

  if (!props.productsLoading && products){
    if (products.length) {
      gridItems = products.map((product) =>
        <ProductItem 
          key={product.id}
          addVariantToCart={props.addVariantToCart}
          checkout={props.checkout}
          checkoutLoading={props.checkoutLoading}
          openCart={props.openCart}
          openCheckout={props.openCheckout}
          product={product}
          products={props.products}
          total={props.total}
        />
      );
    } else {
      gridItems = <Nothing>Ничего не найдено...</Nothing>;
    }
  }
 
  return (
    <>
      <Head>
        <title>Coffee Shop - продажа кофе с доставкой по России</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <MainSection>
        <div>
          <h1>Натуральный Кофе</h1>
          <Breadcrumbs>
            <Link href="/">
              <a>Главная</a>
            </Link>
            <span>Каталог</span>
          </Breadcrumbs>
        </div>
      </MainSection>

      <Filters>
        <FilterPanel
          filter={filter}
          filterHandle={filterHandle}
        />
        <SortSelect sortProducts={sortProducts} />
      </Filters>

      <ProductGrid>
        {gridItems}
      </ProductGrid>
    </>
  )
}

const filterByCollection = (filters, products, collections) => {
  const rightKeys = new Set(['price', 'tag', 'vendor', 'country']);
  let keys = new Set();
  filters.forEach(filter => 
    keys.add(filter.substring(0, filter.indexOf(":")))
  );
  keys = intersection(rightKeys, keys);

  const arrByFilterTypes = [...keys].map(key => 
      filters
        .filter(f => f.substring(0, f.indexOf(":")) == key)
        .map(f => f.substring(f.indexOf(":") + 2))
      );

  //Filter him-self
  const outSet = new Set();
  products.forEach(item => outSet.add(item.id));
  arrByFilterTypes.map(type => {
    let productsByFilterType = new Set();
    type.map(f => {
      let collection = collections.find((item) => item.handle == f);
      collection.products.forEach(item => productsByFilterType.add(item.id));
    })
    outSet = intersection(outSet, productsByFilterType);
  });

  let outArr = Array.from(outSet);
  return outArr.map(id => products.find((item) => item.id == id));
};

function intersection(setA, setB) {
    var _intersection = new Set();
    for (var elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

const skeletonItems = Array(8).fill(0).map((item, index) => 
  (<ProductItemSkeleton key={'Skeleton' + index}/>));

let gridItems = skeletonItems;

const Nothing = styled('span', {
  height: 400,
  paddingLeft: '$3',
});

const ProductGrid = styled('div', {
  display: 'grid',
  maxWidth: 1670,
  marginX: 'auto',
  marginBottom: '$5',
  gridTemplateColumns: 'repeat(4, 1fr)',
  '@bp1': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@bp01': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const MainSection = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 400,
  color: 'white',
  backgroundImage: 'url(backdrop5.jpg)',
  objectFit: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  marginTop: 104,
  textAlign: 'center',
  '@bp2': {
    marginTop: 0,
    '& > div': {
      marginTop: 64,
    },
  },
  '@bp1': {
    height: 350,
  },
  '@bp01': {
    height: 240,
  },
});

const Breadcrumbs = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$3',
  '& span': {
    cursor: 'default',
  },
  '& a': {
    color: 'white',
    textDecoration: 'none',
    '&::after': {
      content: '>',
      marginLeft: '$2'
    },
  },
});

const Filters = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  paddingX: '$3',
  paddingY: '$5',
  maxWidth: 1670,
  marginX: 'auto',
  '& select': {
    outline: 'none',
  },
});