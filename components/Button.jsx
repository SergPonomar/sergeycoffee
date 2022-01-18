import { styled } from '../stitches.config'

const Button = styled('a', {
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  transition: 'background-color 300ms',
  variants: {
    mode: {
      buyItNow: {
        width: '100%',
        height: 57,
        backgroundColor: 'black',
      },
      cart: {
        width: '50%',
        height: 60,
        backgroundColor: '$gray700',
      },
      checkout: {
        width: '100%',
        height: 60,
        backgroundColor: 'black',
      },
      controls: {
        color: 'black',
        height: 50,
        backgroundColor: 'white',
        border: '2px solid $link',
        '&:hover': {
          color: 'white',
          backgroundColor: '$link',
        },
      },
      controlsGreen: {
        height: 50,
        backgroundColor: '$link',
        border: '1px solid white',
        '&:hover': {
          backgroundColor: '$green',
        },
      },
      disabled: {
        height: 50,
        backgroundColor: '$link',
        border: '1px solid white',
        cursor: 'default', 
        opacity: 0.5,
      },
      filter: {
        width: 130,
        height: 42,
        color: 'black',
        border: '1px solid black',
        '& span': {
          marginLeft: '$1',
        },
        '&:hover': {
          color: 'white',
          border: '1px solid $link',
        },
        '& svg path': {
          stroke: 'black !important',
        },
        '&:hover svg path': {
          stroke: 'white !important',
        },
      },
      inverse: {
        height: 55,
        backgroundColor: '$link',
        border: '1px solid white',
        flexGrow: 1,
        '&:hover': {
          backgroundColor: 'black',
        },
      },
      primary: {
        height: 50,
        width: 170,
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
          color: 'white',
          backgroundColor: '$link',
        },
      },
      secondary: {
        height: 50,
        width: 130,
        color: 'black',
        border: '1px solid black',
        '&:hover': {
          color: 'white',
          border: '1px solid $link',
        },
      },
      secondaryDark: {
        height: 50,
        width: 130,
        color: 'white',
        border: '1px solid white',
        '&:hover': {
          color: 'white',
          border: '1px solid $link',
        },
      },
      submit: {
        width: '100%',
        height: 55,
        backgroundColor: 'black',
      },
      tag: {
        color: '$gray',
        padding: '$2',
        border: '1px solid $gray',
        '&:hover, &[data-state=on]': {
          border: '1px solid black',
          backgroundColor: 'black',
          color: 'white',
        },
      },
      weight: {
        color: 'black',
        padding: '$2',
        border: '1px solid black',
        '&:hover, &[data-state=on]': {
          backgroundColor: 'black',
          color: 'white',
        },
      },
    },
  },
  '&:hover': {
    backgroundColor: '$link',
  },
})

export default Button