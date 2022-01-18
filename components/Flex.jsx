import { styled } from '../stitches.config'

const Flex = styled('div', {
  display: 'flex',
  overflow: 'hidden',
  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      rowReverse: {
        flexDirection: 'row-reverse',
      },
      column: {
        flexDirection: 'column',
      },
      columnReverse: {
        flexDirection: 'column-reverse',
      },
    },
    alignItems: {
      start: {
        alignItems: 'flex-start'
      },
      end: {
        alignItems: 'flex-end'
      },
      center: {
        alignItems: 'center'
      },      
    },
    wrap: {
      true: {
        flexWrap: 'wrap',
      },
      reverse: {
        flexWrap: 'wrap-reverse',
      },
    },
  },
})

export default Flex