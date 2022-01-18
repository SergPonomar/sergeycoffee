import Head from 'next/head'
import Link from 'next/link'

import { styled } from '../stitches.config'
import { keyframes } from '@stitches/react'

import Button from '../components/Button'
import ImageGalleryNoThumbs2 from '../components/ImageGalleryNoThumbs2'
import ProductItem from '../components/ProductItem'
import ProductItemSkeleton from '../components/ProductItemSkeleton'


export default function Home(props) {

  if (props.collections.length) {
    gridItems = props.collections[18].products.map((product) =>
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
  }

  return (
    <>
    <Head>
      <title>Coffee Shop - продажа кофе с доставкой по России</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <MainSection>
      <img src='backdrop1.jpg'/>
      <MainTitle>
        <span>Всегда в продаже</span>
        <h1>Свежий Органический<br/>Кофе</h1>
        <h3>Ручной обжарки</h3>
        <Link href="/products">
          <Button as="a" mode="secondary">СМОТРЕТЬ</Button>
        </Link>
      </MainTitle>
    </MainSection>

    <Banners>
      <Banner>
        <ImgContainer>
          <img src='backdrop2.jpg'/>
        </ImgContainer>
        <BannerTitle>
          <span>Кофе Арабика</span>
          <Link href="/products?tag=арабика">
            <NavLink>СМОТРЕТЬ</NavLink>
          </Link>
        </BannerTitle>
      </Banner>
      <Banner>
        <ImgContainer>
          <img src='backdrop3.jpg'/>
        </ImgContainer>
        <BannerTitle>
          <span>Кофе Робуста</span>
          <Link href="/products?tag=робуста">
            <NavLink>СМОТРЕТЬ</NavLink>
          </Link>
        </BannerTitle>
      </Banner>
    </Banners>

    <h1 style={{textAlign: 'center', marginBottom: '30px'}}>Новые поступления</h1>
    <ProductGrid>
      {gridItems}
    </ProductGrid>

    <Clearance>
      <ImageContainer>
        <div>
          <div>
            <img src='backdrop4.jpg'/>
          </div>
        </div>
        <div></div>
      </ImageContainer>
      <ClearanceTitle>
        <h1>Элитная арабика из Эфиопии</h1>
        <p>Количество ограничено. Успейте насладиться непревзойденным вкусом.</p>
        <Link href="/products?country=эфиопия">
          <Button as="a" mode="primary">СМОТРЕТЬ</Button>
        </Link>
      </ClearanceTitle>
    </Clearance>

    <div style={{textAlign: 'center', marginBottom: '30px'}}>
      <h1>Кофе ALTA ROMA</h1>
      <span>Итальянский бренд №1 в России</span>
    </div>
    <GalleryContainer>
      {!props.collectionsLoading &&
      <ImageGalleryNoThumbs2
        addVariantToCart={props.addVariantToCart}
        checkout={props.checkout}
        checkoutLoading={props.checkoutLoading}
        openCart={props.openCart}
        openCheckout={props.openCheckout}
        products={props.collections[1].products}
        total={props.total}
      />}
    </GalleryContainer>

    <SubscribeSection>
      <h2>Подписка на новости сайта</h2>
      <p>Присоединитесь к нам и получите скидку 5% на любой товар в нашем каталоге.</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Введите свой email..."/>
        <input type="submit" value="ПОДПИСАТЬСЯ"/>
      </form>
    </SubscribeSection>
    </>
  )
}

const skeletonItems = Array(8).fill(0).map((item, index) => 
  (<ProductItemSkeleton key={'Skeleton' + index}/>));

let gridItems = skeletonItems;

const SubscribeSection = styled('div', {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 40,
  marginTop: '$5',
  '& h2': {
    marginBottom: '$1',
  },
  '& form': {
    display: 'flex',
    justifyContent: 'space-between',
    width: 690,
    maxWidth: '100%',
    marginTop: '$2',
    paddingBottom: '$2',
    borderBottom: `2px solid black`,
  },
  '& form input:first-child': {
    width: '100%',
    border: 'none',
    outline: 'none',
  },
  '& form input:last-child': {
    unset: 'all',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  '& form input:last-child:hover': {
    color: '$link',
  },
});

const ImageContainer = styled('div', {
  display: 'flex',
  position: 'relative',
  justifyContent: 'end',
  alignItems: 'center',
  width: '50%',
  height: '100%',
  '& > div:nth-child(1)': {
    maxWidth: 570,
    paddingY: '15%',
    display: 'flex',
    width: '80%',
  },
  '& > div:nth-child(1) div': {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
  },
  '& img': {
    width: '100%',
    height: '100%',
    transition: 'all 300ms',
  },
  '& img:hover': {
    transform: 'scale(1.1)',
    cursor: 'pointer',
  },

  '& > div:nth-child(2)': {
    position: 'absolute',
    left: 0,
    backgroundColor: '$border',
    width: '60%',
    height: '100%',
    boxSizing: 'content-box',
  },
});

const ClearanceTitle = styled('div', {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  height: '130%',
  '& :last-child': {
    marginTop: '$6',
  },
  '& h1': {
    maxWidth: 270,
    '@bp0': {
      fontSize: 20,
    },
  },
  '& p': {
    maxWidth: 360,
  },
});

const Clearance = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
});

const ProductGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  maxWidth: 1670,
  marginX: 'auto',
  '@bp1': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@bp01': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

const slideIn = keyframes({
  '0%': { transform: 'translate3d(-100%, 0, 0)' },
  '100%': { transform: 'translate3d(0, 0, 0)' },
});

const NavLink = styled('a', {
  color: 'white',
  position: 'relative',
  textDecoration: 'none',
  paddingX: '$2',
  paddingBottom: '$2',
  fontSize: '$4',
  overflow: 'hidden',
  opacity: '0',
  transition: 'color 300ms',
  '&::before': {
    content: '',
    position: 'absolute',
    bottom: '0.05em',
    left: 0,
    width: '100%',
    height: '0.1em',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  '&::after': {
    content: '',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '0.2em',
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
});

const Banners = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '$4',
  maxWidth: 1670,
  marginX: 'auto',
  '@bp01': {
    flexDirection: 'column',
  },
});

const Banner = styled('div', {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  width: '50%',
  border: '15px solid white',
  aspectRatio: '810 / 550',
  position: 'relative',
  overflow: 'hidden',
  '&:hover img': {
    transform: 'scale(1.05)',
  },
  '&:hover a': {
    opacity: 1,
  },
  '&:hover div:nth-child(2)': {
    height: 100,
  },
  '@bp01': {
    width: '100%',
  },
});

const ImgContainer = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    transition: 'transform 300ms',
  },
});

const BannerTitle = styled('div', {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 50,
  transition: 'height 450ms linear',
  '& span': {
    color: 'white',
    fontSize: 36,
  },
});

const MainSection = styled('div', {
  position: 'relative',
  '@bp3': {
    height: 700,
  },
  '@bp2': {
    height: 640,
  },
  '@bp1': {
    height: 500,
  },
  '@bp01': {
    height: 450,
  },  
  '& img': {
    marginTop: 0,
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: '-1',
    objectFit: 'cover',
    objectPosition: 'right center',
    '@bp2': {
      marginTop: 50,
    },
  }
});

const GalleryContainer = styled('div', {
  maxWidth: 1670,
  marginX: 'auto',
});

const MainTitle = styled('div', {
  position: 'absolute',
  transform: 'translate(-50%, 50%)',
  right: '8%',
  bottom: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  'h1': {
    marginBottom: '$2',
  },
  'h3': {
    color: '$link',
  },
  'span:': {
    marginBottom: '$2',
  },
  '@bp3': {
    right: '2%',
  },
  '@bp1': {
    right: '-10%',
  },
  '@bp01': {
    right: '-19%',
  }, 
});