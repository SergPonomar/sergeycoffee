import { styled } from '../stitches.config'

import ContentLoader from "react-content-loader"

const ProductItemSkeleton = (props) => (
	<ProductCard>	
	  <ContentLoader 
	    speed={2}
	    width={'100%'}
	    backgroundColor="#f3f3f3"
	    foregroundColor="#ecebeb"
	    uniqueKey="skeleton1"
	    {...props}
	  >
	    <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" /> 
	  </ContentLoader>
	  <ContentLoader 
	    speed={2}
	    height={38}
	    width={'100%'}
	    backgroundColor="#f3f3f3"
	    foregroundColor="#ecebeb"
	    uniqueKey="skeleton2"
	    {...props}
	  >
	    <rect x="0" y="0" rx="2" ry="2" width="100%" height="38" /> 
	  </ContentLoader>
	  <ContentLoader 
	    speed={2}
	    width={'100%'}
	    height={19}
	    backgroundColor="#f3f3f3"
	    foregroundColor="#ecebeb"
	    uniqueKey="skeleton3"
	    {...props}
	  >
	    <rect x="0" y="0" rx="2" ry="2" width="100%" height="19" />
	  </ContentLoader>
	</ProductCard>
)

export default ProductItemSkeleton

const ProductCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '$3',
  position: 'relative',
  gap: '$2',
  '& svg': {
    aspectRatio: '1 / 1',
  },
});