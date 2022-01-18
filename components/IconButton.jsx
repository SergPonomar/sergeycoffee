import { styled } from '../stitches.config'

const IconButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  '& svg path': {
    stroke: '#555 !important',
  },
  variants: {
    size: {
      small: {
        '& svg': {
          width: '16px',
          height: '16px',
        },
        '&:hover svg path': {
          stroke: '$link !important',
        },
      },
      middle: {
        '& svg': {
          width: '20px',
          height: '20px',
        },
      },
      normal: {
        '& svg': {
          width: '24px',
          height: '24px',
        },
      },
      big: {
        '& svg': {
          width: '30px',
          height: '30px',
        },
      },
    },
    func: {
      cart: {
        position: 'relative',
        '& span:nth-child(2)': {
          position: 'absolute',
          width: 10,
          height: 10,
          backgroundColor: '$link',
          bottom: -4,
          right: 0,
          borderRadius: '100%',
          '@bp2': { opacity: 0 },
        },
        '& span:nth-child(3)': {
          position: 'absolute',
          width: 10,
          height: 10,
          top: -10,
          right: -6,
          color: '$link',
          opacity: 0,
          '@bp2': { opacity: 1 },
        },
      },
      leftpanel: {
        display: 'none',
        '@bp2': {
          display: 'inline',
        }
      },
      author: {
        '@bp2': {
          display: 'none',
        }
      },
      quickview: {
        padding: '$2',
        borderRadius: '50%',
        backgroundColor: 'white',
        transition: 'all 300ms',
        'svg path': {
          stroke: 'black !important',
        },
        '&:hover': {
          backgroundColor: '$link',
        },
        '&:hover svg path': {
          stroke: 'white !important',
        },
      },
      link: {
        '& svg path': {
          fill: 'black !important',
          stroke: 'black !important',
        },
        '&:hover svg path': {
          fill: '$link !important',
          stroke: '$link !important',
        },
      },
    }
  },
  defaultVariants: {
    size: 'normal',
  }
});

export default IconButton