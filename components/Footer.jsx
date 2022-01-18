import { styled } from '../stitches.config'
import IconButton from '../components/IconButton'
import {
  Dribbble,
  Instagram,
  Twitter,
} from 'grommet-icons';

export default function FooterOut() {
  return (
    <Footer>
      <div>
        <span>Сделано на Shopify</span>
        <FooterLinks>
          <a>О нас</a>
          <a>Политика конфиденциальности</a>
          <a>Условия использования</a>
          <a>Возврат товара</a>
          <a>Для оптовиков</a>
        </FooterLinks>
        <SocialLinks>
          <IconButton as="a" size="small" func="link">
            <Twitter/>
          </IconButton>
          <IconButton as="a" size="small" func="link">
            <Dribbble/>
          </IconButton>
          <IconButton as="a" size="small" func="link">
            <Instagram/>
          </IconButton>
        </SocialLinks>
      </div>
    </Footer>
  )
}

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingY: 45,
  borderTop: '1px solid $border',
  '& > div': {
    display: 'flex',
    gap: '15%',
    width: '100%',
    maxWidth: 1670,
    justifyContent: 'space-between',
    alignItems: 'start',
    '@bp1': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '$4',
      maxWidth: '90%',
    },
  },
  '& > div span': {
    minWidth: 150,
    paddingLeft: '$3'
  },
});

const FooterLinks = styled('div', {
  display: 'flex',
  gap: '10px 40px ',
  flexWrap: 'wrap',
  justifyContent: 'center',
  '& a:hover': {
    color: '$link'
  },
});

const SocialLinks = styled('div', {
  display: 'flex',
  gap: '$5',
  paddingX: '$5',
  '@bp1': {
    paddingTop: '$4',
  },
});