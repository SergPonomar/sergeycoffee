import { styled, css } from '../stitches.config'

import { useSpringCarousel } from 'react-spring-carousel-js'
import ContentLoader from "react-content-loader"


export default function ImageGallery(props) {
  console.log(props.product)
  const items = Array(!props.productsLoading ? props.product.images.length : 4)
          .fill(0)
          .map((p, index) => ({
              id: `item-${index}`,
              renderItem: (
                  <Item>
                    {!props.productsLoading ?
                      <img 
                        src={props.product.images[index].src} 
                        alt={`Product picture ${index + 1}`}
                      /> : 
                      <Skeleton/>
                    }
                  </Item>
                ),
                renderThumb: (
                  <Thumb onClick={() => slideToItem(`item-${index}`)}>
                    {!props.productsLoading ?
                      <img 
                        src={props.product.images[index].src}
                        alt={`Product picture ${index + 1}`}
                      /> : 
                      <Skeleton/>
                    }
                  </Thumb>
                ),
              })
            )

  const { 
    carouselFragment, 
    thumbsFragment,
    slideToItem
  } = useSpringCarousel({
    withThumbs: true,
    withLoop: true,
    items: items
  })
 
  return (
    <>
      <div>
        {carouselFragment}
      </div>
      <ThumbsContainer>
        {thumbsFragment}
      </ThumbsContainer>
    </>
  )
}

const Skeleton = () => (<ContentLoader 
      speed={2}
      width={'100%'}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey="skeleton1"
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" /> 
    </ContentLoader>)

const Item = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  aspectRatio: '1 / 1',
  width: '100%',
  minHeight: 0,
  '& img': {
    zIndex: '-1',
    maxWidth: '100%',
    height: '100%',
  },
  '& svg': {
    aspectRatio: '1 / 1',
  },
});

const Thumb = styled('div', {
  width: 100,
  aspectRatio: '1 / 1',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    height: '100%',
  },
  '& svg': {
    aspectRatio: '1 / 1',
  },
  '@bp2': {
    width: 90,
  },
  '@bp1': {
    width: 80,
  },
  '@bp0': {
    width: 70,
  },
});

const ThumbsContainer = styled('div', {
  '& > div': {
    overflow: 'hidden !important',
    gap: '$2',
  }
});