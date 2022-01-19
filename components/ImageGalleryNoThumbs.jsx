import { styled } from '../stitches.config';

import { useSpringCarousel } from 'react-spring-carousel-js';
import { FormPrevious, FormNext } from 'grommet-icons';

import IconButton from '../components/IconButton';


export default function ImageGalleryNoThumbs(props) {
  
  const items = props.products.map((product) => 
    ({
      id: product.variants[0].id,
      renderItem: (
        <Item>
          <img
            src={product.images[0].src}
            alt={product.title}
          />
          <h3>{product.title}</h3>
          <span>{product.variants[0].price.slice(0,-3) + ' \u20BD'}</span>
        </Item>
      )
    }));
  
  const { 
    carouselFragment, 
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    withLoop: true,
    itemsPerSlide: 3,
    items: items
  });
 
  return (
    <>
      <Header>
        <h3>С этим продуктом покупают:</h3>
        <div>
        <IconButton size="big" onClick={slideToPrevItem}>
          <FormPrevious/>
        </IconButton>
        <IconButton size="big" onClick={slideToNextItem}>
          <FormNext/>
        </IconButton>
        </div>
      </Header>
      <ItemsContainer>
        {carouselFragment}
      </ItemsContainer>
    </>
  )
}

const Item = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minWidth: 0,
  minHeight: 0,
  '& img': {
    zIndex: '-1',
    maxHeight: 200,
  },
  '& h3': {
    width: 150,
    fontSize: '$1',
  },
});

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ItemsContainer = styled('div', {
  width: '100%',
  '& > div div': {
    left: '0px !important',
  },
});