import { styled } from '../stitches.config'

import { useSpringCarousel } from 'react-spring-carousel-js'

import ProductItem from '../components/ProductItem'
import ProductItemSkeleton from '../components/ProductItemSkeleton'


export default function ImageGalleryNoThumbs2(props) {
  if (props.products.length) {
    items = props.products.map((product) => 
    ({
      id: product.variants[0].id,
      renderItem: (
        <ProductItem
          key={product.id}
          product={product}
          {...props}
        />
      )
    }))
  };

  const { 
    carouselFragment, 
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    withLoop: true,
    itemsPerSlide: 4,
    items: items    
  });

  return (
    <ItemsContainer>
      {carouselFragment}
    </ItemsContainer>
  )
}

const skeletonItems = Array(10).fill(0).map((item, index) => 
  ({
    id: 'skelet-' + index,
    renderItem: (
      <ProductItemSkeleton/>
    )
  }));

let items = skeletonItems;

const ItemsContainer = styled('div', {
  width: '100%',
  '& div.use-spring-carousel-item': {
    '@bp1': {
      flex: '1 0 calc(33.3333%) !important',
    },
    '@bp01': {
      flex: '1 0 calc(50%) !important',
    },
  },
});