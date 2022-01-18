import {useState} from 'react';
import Link from 'next/link';

import { styled } from '../stitches.config';

import * as Dialog from '@radix-ui/react-dialog';

import { useTransition, animated, config } from 'react-spring';
import { FormClose, Search } from 'grommet-icons';

import IconButton from '../components/IconButton'


export default function Searchbar(props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const closeWithDelay = () => {
    let timer = setTimeout(() => {
      setOpen(false);
      clearTimeout(timer);
    }, 50)
  };

  const gridItems = results.map((product) =>
    <CartItem key={product.id}>
      <div>
        <img src={product.images[0].src}/>
      </div>
      <ItemText>
        <Link href={`/products/${product.handle}`}>
          <a onClick={closeWithDelay}>{product.title}</a>
        </Link>
        <span>{product.variants[0].price.slice(0,-3) + ' \u20BD'}</span>
      </ItemText>
    </CartItem>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchItems = (item) => {
      let value = query.toLowerCase();
      let title = item.title.toLowerCase();
      let vendor = item.vendor.toLowerCase();
      return title.includes(value) || vendor.includes(value)     
    };
    setResults(props.products.filter(searchItems));
  };

  const transitions = useTransition(open, {
    from: { opacity: 0, y: -520 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -520 },
    config: config.default,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton>
          <Search/>
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
      {transitions((styles, item) =>
        item ? (
          <Overlay forceMount asChild>
            <animated.div
              style={{
                opacity: styles.opacity,
              }}>
              <Content forceMount asChild>
                <animated.div style={styles}>
                  <Dialog.Close asChild>
                    <CloseButton>
                      <FormClose/>
                    </CloseButton>
                  </Dialog.Close>
                  <h1>Введите запрос и нажмите Enter</h1>
                  <form onSubmit={handleSubmit}>
                    <InputLine
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      type="text"
                      placeholder="Поиск по сайту"
                    />
                    <input type="submit" hidden />
                  </form>
                  <ItemsHolder>
                    {gridItems}
                  </ItemsHolder>
                </animated.div>
              </Content>
            </animated.div>
          </Overlay>
        ) : null
      )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Overlay = styled(Dialog.Overlay, {
  background: 'rgba(0 0 0 / 0.7)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
});

const Content = styled(Dialog.Content, {
  outline: 'none',
  background: 'white',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  gap: '$5',
  width: '100%',
  height: 520,
  paddingTop: 30,
  '& form': {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
});

const InputLine = styled('input', {
  all: 'unset',
  width: 900,
  padding: '8px 10px',
  borderBottom: '2px solid $border',
  marginTop: 'auto',
  '@bp2': {
    width: '90%',
  },
});

const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 45,
  height: 45,
  position: 'absolute',
  top: 0,
  right: 0,
  '& svg': {
    width: '34px',
    height: '34px',
    transform: 'translate(0, -2px)',
  },
  '& svg path': {
    stroke: '#222 !important',
  },
  '&:hover svg path': {
    stroke: '$link !important',
  },
});

const ItemsHolder = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr', 
  maxHeight: 259,
  gap: 30,
  width: 900,
  paddingTop: 15,
  marginTop: 20,
  marginBottom: 50,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ddd',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white'
  },
  '@bp2': {
    width: '90%',
  },
  '@bp1': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@bp0': {
    gridTemplateColumns: '1fr',
  },
});

const CartItem = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderBottom: '1px solid $border',
  '& > div:first-child': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    aspectRatio: '1 / 1',
    border: '1px solid $border',
    '& img': {
      height: '100%',
    },
  }
});

const ItemText = styled('div', {
  minHeight: 100,
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 16,
  paddingRight: 15,
  paddingBottom: '$2',
  maxWidth: 200,
  lineHeight: 1.5,
  gap: '$1',
  '& a': {
    color: 'black',
    textDecoration: 'none',
  },
  '& span': {
    color: '$link',
  },
});