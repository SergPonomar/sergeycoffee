import { useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { styled } from '/stitches.config';

import ContentLoader from "react-content-loader";
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { SpinnerCircular } from 'spinners-react';
import { Star } from 'grommet-icons';
import * as Tabs from '@radix-ui/react-tabs';

import Button from '/components/Button';
import ImageGallery from '/components/ImageGallery';
import ImageGalleryNoThumbs2 from '/components/ImageGalleryNoThumbs2';


export default function Product(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter()
  const { productSlug } = router.query

  let product = props.products.find((item) => item.handle == productSlug)

  function openCart() {
    setCartOpen(true);
  }

  const addToCart = () => {
    let variant = product.variants[0];
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
    <>
    <Head>
      <title>{!props.productsLoading ? product.title : "Coffee Shop - продажа кофе с доставкой по России"}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Breadcrumbs>
      <Link href="/">
        <a>Главная</a>
      </Link>
      <Link href="/products">
        <a>Каталог</a>
      </Link>
      {!props.productsLoading ? <a>{product.title}</a> : <SpinnerSmall/> }
    </Breadcrumbs>
    <MainSection>
      <GalleryContainer>
        <ImageGallery product={product} productsLoading={props.productsLoading}/>
      </GalleryContainer>

      <Description>
        <DescriptionHeader>
          <div>
            <h3>
              {!props.productsLoading ? product.title : <SpinnerLarge/> }
            </h3>
            <span>
              {!props.productsLoading ? product.variants[0].price.slice(0,-3) + ' \u20BD' : <SpinnerSmall/> }
            </span>
            <RatingBlock>
              <Star/>
              <Star color="white"/>
              <Star/>
              <Star/>
              <Star/>
              <span>Нет отзывов</span>
            </RatingBlock>
          </div>
        </DescriptionHeader>
        <Separator />
          {!props.productsLoading ? <p>{product.description}</p> : <Skeleton/>}
        <Buttons>
          <ButtonBlock>
            <Adder>
              <span>{quantity}</span>
              <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
              </div>
            </Adder>
            <Button mode="inverse" onClick={addToCart}>В КОРЗИНУ</Button>
          </ButtonBlock>
          <Button mode="buyItNow" onClick={props.openCheckout}>ОФОРМИТЬ ЗАКАЗ</Button>
        </Buttons>
      </Description>
      <Benefits>
        <Benefit>
          <h3>Почему выбирают нас?</h3>
          <Separator/>
          <p>Официальный представитель Кофейных домов в России, гарантийная помощь и поддержка, доставка и возврат в России. Клиент - ориентированная компания, заботящаяся об окружающей среде.</p>
        </Benefit>
        <Benefit>
          <h3>Возврат</h3>
          <Separator/>
          <p>Верните этот товар в течение 14 дней, если передумаете. Получите возврат/замену и бесплатную доставку, если товар поврежден или не соответствует описанию.</p>
        </Benefit>
        <Benefit>
          <h3>Доставка</h3>
          <Separator/>
          <p>Бесплатно во все регионы России, если сумма заказа превыщает 5000 руб.</p>
        </Benefit>
      </Benefits>
    </MainSection>    

    <Tabs.Root defaultValue="description" orientation="vertical">
      <TabsWrapper>
        <TabsList aria-label="tabs example">
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="additional">Сервис</TabsTrigger>
          <TabsTrigger value="reviews">Отзывы</TabsTrigger>
        </TabsList>
      </TabsWrapper>
      <TabsContent value="description">
        <Overview1>
          <div>
            <img src="/backdrop6.jpg"/>
          </div>
          <div>
            <h2>Кофе с обволакивающим вкусом, которым можно наслаждаться в любое время дня</h2>
            <p>Для истинных ценителей кофе изысканный сорт собранных вручную органических зерен</p>
            <img src="/backdrop7.jpg"/>
          </div>
        </Overview1>
        <Overview2>
          <h4>ПОЛНОЕ ОПИСАНИЕ</h4>
          <SeparatorVert/>
          {!props.productsLoading ? <p>{product.description}</p> : <Skeleton/>}
          <img src="/backdrop8.jpg"/>
        </Overview2>
      </TabsContent>
      <TabsContent value="additional">
        <Additional>
          <div>
            <AdditionalHeader>
              <span>ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ</span>
              <h2>О нашем магазине:</h2>
              <SeparatorSmall/>
            </AdditionalHeader>
            <AdditionalText>
              <div>
                <p>Мы используем стандартное SSL-шифрование для защиты ваших данных. Потенциально конфиденциальная информация, такая как ваше имя, адрес и данные карты, зашифрована, поэтому ее можно прочитать только на защищенном сервере.</p>
                <ul>
                  <li>Безопасные платежи</li>
                  <li>Принимает кредитные карты</li>
                  <li>Различные способы оплаты</li>
                  <li>Удобная доставка</li>
                  <li>Легко заказывать</li>
                </ul>
              </div>
              <div>
                <h4>Экспресс Доставка</h4>
                <ul>
                  <li>Мск и Спб от 2 до 4 дней</li>
                  <li>Регионы 3-7 дней</li>
                  <li>Selected locations</li>
                </ul>
                <h4>Больше информации:</h4>
                <ul>
                  <li><a>Как заказать</a></li>
                  <li><a>Условия доставки</a></li>
                  <li><a>Условия возврата</a></li>
                  <li><a>Как оплатить</a></li>
                </ul>
              </div>
            </AdditionalText>
          </div>
          <img src="/coffee.jpg"/>
        </Additional>
      </TabsContent>
      <TabsContent value="reviews">
        <Reviews>
          <span><b>Отзывы:</b></span>
          <div>
            <span>Отзывов пока нет...</span>
            <a>Написать отзыв</a>
          </div>
        </Reviews>
      </TabsContent>
    </Tabs.Root>

    <RelateProducts>
      <h1>Похожие товары</h1>
      <ImageGalleryNoThumbs2
        addVariantToCart={props.addVariantToCart}
        checkout={props.checkout}
        checkoutLoading={props.checkoutLoading}
        openCart={props.openCart}
        openCheckout={props.openCheckout}
        products={props.products}
        total={props.total}
      />
    </RelateProducts>
    </>
  )
}

const SpinnerLarge = () => <SpinnerCircular size={18} thickness={100} speed={100} color='#B8784E' secondaryColor="rgba(0, 0, 0, 0)" />
const SpinnerSmall = () => <SpinnerCircular size={16} thickness={100} speed={100} color='#B8784E' secondaryColor="rgba(0, 0, 0, 0)" />

const Skeleton = () => (<ContentLoader 
      speed={2}
      width={'100%'}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey="skeleton1"
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" /> 
    </ContentLoader>)

const Reviews = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  padding: '$3',
  paddingBottom: 70,
  '& > div': {
    display: 'flex',
    justifyContent: 'space-between'
  },
  '& a:hover': {
    color: '$link'
  },
});

const TabsWrapper = styled('div', {
  borderTop: '1px solid $border',
  borderBottom: '1px solid $border',
  paddingY: '$5',
});

const Additional = styled('div', {
  display: 'flex',
  '& > div': {
    width: '60%',
  },
  '& img': {
    width: '40%',
    height: '100%',
    padding: '$3',
    '@bp1': {
      width: '50%',
    },
  },
});

const AdditionalHeader = styled('div', {
  padding: '$3',
});

const AdditionalText = styled('div', {
  display: 'flex',
  '& ul': {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  '& li, p': {
    lineHeight: 1.4,
  },
  '& > div': {
    padding: '$3',
    width: '50%',
    '@bp1': {
      width: '100%',
    },
  },
  '& a:hover': {
    color: '$link'
  },
  '@bp1': {
    flexDirection: 'column',
    width: '100%',
  },
});

const RelateProducts = styled('div', {
  textAlign: 'center',
  borderTop: '1px solid $border',
  maxWidth: 1670,
  marginX: 'auto',
  '& h1': {
    marginY: '$6'
  },
});


const Overview1 = styled(Tabs.List, {
  display: 'flex',
  alignItems: 'start',
  '& > div': {
    width: '50%',
    '& img': {
      width: '100%',
    },
  },
  '& > div:first-child': {
    display: 'flex',
    justifyContent: 'center',
    padding: '$3',
    '& img': {
      maxWidth: 558,
    },
  },
  '& > div:last-child': {
    padding: 80,
    paddingRight: '$3',
    '& p': {
      paddingBottom: 150,
    },
  },
  '@bp01': {
    flexDirection: 'column',
    '& > div': {
      width: '100%',
    },
    '& > div:last-child': {
      padding: '$3',
      '& p': {
        paddingBottom: '$4',
      },
    },
  },
});

const Overview2 = styled(Tabs.List, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '$3',
  gap: '$1',
  '& p, img': {
    width: '100%',
    maxWidth: 899,
    marginY: '$6',
    textAlign: 'left',
    lineHeight: 1.4,
  },
});

const TabsContent = styled(Tabs.Content, {
  paddingTop: '$3',
  maxWidth: 1400,
  marginX: 'auto',
});

const TabsTrigger = styled(Tabs.Trigger, {
  all: 'unset',
  cursor: 'pointer',
  overflow: 'hidden',
  transition: 'color 300ms',
  position: 'relative',
  '&::after': {
    content: '',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: '$link',
    opacity: 0,
    transform: 'scale(0)',
    transformOrigin: 'center',
  },
  '&:hover::after, &:focus::after': {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 300ms, transform 500ms',
  },
  '&[data-state="active"]': {
    '&::after': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
});

const TabsList = styled(Tabs.List, {
  display: 'flex',
  gap: '$5',
  paddingX: '$3',
  maxWidth: 1400,
  marginX: 'auto',
});

const Benefits = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',
  padding: '$3',
  width: '22%',
  minWidth: 210,
  '@bp1': {
    flexDirection: 'row',
    width: '100%',
  },
  '@bp0': {
    flexDirection: 'column',
    width: '100%',
  },
});

const Benefit = styled('div', {
  textAlign: 'center',
  padding: '$3',
  border: '1px solid $border',
});

const RatingBlock = styled('div', {
  marginTop: '$3',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    width: '20px',
    height: '20px',
  },
  '& svg path': {
    fill: 'white !important',
    stroke: 'rgb(255, 201, 94) !important',
  },
  '& span': {
    marginLeft: '$3',
  },
});

const Buttons = styled('div', {
  maxWidth: 300,
});

const ButtonBlock = styled('div', {
  display: 'flex',
  marginBottom: '$4',
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

const Separator = styled(SeparatorPrimitive.Root, {
  height: 1, 
  width: '100%',
  backgroundColor: '$border',
});

const SeparatorVert = styled(SeparatorPrimitive.Root, {
  height: 45, 
  width: 1,
  backgroundColor: '$gray',
});

const SeparatorSmall = styled(SeparatorPrimitive.Root, {
  height: 2, 
  width: 40,
  backgroundColor: '$link',
});

const Description = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '38%',
  gap: '$3',
  padding: '$3',
  '& > p': {
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  '@bp1': {
    width: '45%',
  },
  '@bp01': {
    width: '100%',
  },
});

const DescriptionHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  width: '100%',
  '& span:nth-child(2)': {
    color: '$link',
    fontWeight: 500,
  },
});

const Breadcrumbs = styled('div', {
  marginTop: 104,
  padding: '$3',
  display: 'flex',
  gap: '$3',
  maxWidth: 1640,
  marginX: 'auto',
  '& a': {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
    color: '$link',
    },
    '&:last-child': {
    cursor: 'default',
    color: 'black',
    },
    '&:not(:last-child)::after': {
      content: '>',
      marginLeft: '$2',
      color: 'black',
    },
  },
  '@bp2': {
    marginTop: 64,
  },
});

const MainSection = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: 1640,
  marginX: 'auto',
  flexWrap: 'wrap',
});

const GalleryContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '40%',
  height: '100%',
  padding: '$3',
  gap: '$4',
  '@bp1': {
    width: '55%',
  },
  '@bp01': {
    width: '100%',
  },
});