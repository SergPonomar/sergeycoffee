import { useState } from 'react';

import Link from 'next/link';
import { styled, css } from '../stitches.config';

import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';

import { useTransition, animated, config } from 'react-spring';
import { 
  FormClose,
  User,
  Menu,
} from 'grommet-icons';

import Button from '../components/Button'
import Flex from '../components/Flex'
import IconButton from '../components/IconButton'


export default function LeftPanel() {
  const [open, setOpen] = useState(false);

  const closeWithDelay = () => {
    let timer = setTimeout(() => {
      setOpen(false);
      clearTimeout(timer);
    }, 300)
  };

  const transitions = useTransition(open, {
    from: { opacity: 0, x: -320 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -320 },
    config: config.default,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton func='leftpanel'>
          <Menu/>
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

                  <Tabs.Root defaultValue="tab1">
                    <TabsList aria-label="Left menu">
                      <Tab value="tab1"><Menu/>Меню</Tab>
                      <FakeTab></FakeTab>
                    </TabsList>
                  <Tabs.Content value="tab1">
                    <Flex as="nav" direction="column">
                      <Link href="/products" passHref>
                        <NavLink onClick={closeWithDelay}>Каталог</NavLink>
                      </Link>
                      <Link href="/products?vendor=alta-roma" passHref>
                        <NavLink onClick={closeWithDelay}>Alta Roma</NavLink>
                      </Link>
                      <Link href="/products?vendor=jardin" passHref>
                        <NavLink onClick={closeWithDelay}>Jardin</NavLink>
                      </Link>
                      <Link href="/products?vendor=julius-meinl" passHref>
                        <NavLink onClick={closeWithDelay}>Julius Meinl</NavLink>
                      </Link>
                    </Flex>
                  </Tabs.Content>
                  </Tabs.Root>

                  <Dialog.Close asChild>
                    <CloseButton>
                      <FormClose/>Закрыть
                    </CloseButton>
                  </Dialog.Close>
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

const NavLink = styled('a', {
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  height: 55,
  paddingLeft: '$3',
  fontSize: '$4',
  borderBottom: '1px solid $border',
  '&:hover': {
    color: '$link',
  },
})

const Overlay = styled(Dialog.Overlay, {
  background: 'rgba(0 0 0 / 0.7)',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'left',
});

const Content = styled(Dialog.Content, {
  display: 'flex',
  flexDirection: 'column',
  outline: 'none',
  background: 'white',
  width: 320,
});

const TabsList = styled(Tabs.List, {
   display: 'flex',
});

const Tab = styled(Tabs.Trigger, {
  all: 'unset',
  //cursor: 'pointer',
  width: '50%',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  height: 55,
  borderBottom: '1px solid $border',
  '&[data-state="active"]': {
    color: 'white',
    backgroundColor: 'black',
    border: 'none',
  },
  '&[data-state="active"] svg path': {
    stroke: 'white !important',
  },
  '& svg': {
    marginRight: 10,
    marginBottom: 1,
    width: '24px',
    height: '24px',
  },
  '& svg path': {
    stroke: 'black !important',
  },
  variants: {
    iconSize: {
      small: {
        '& svg': {
          width: '20px',
          height: '20px',
        },
      }
    }
  }
});

const FakeTab = styled('button', {
  all: 'unset',
  width: '50%',
  display: 'inline-flex',
  height: 55,
  borderBottom: '1px solid $border',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingX: '$3',
  paddingTop: 45,
  gap: 15,
  '& div:last-child': {
    marginTop: 10,
  }
});

const InputLine = styled('input', {
  all: 'unset',
  width: '100%',
  height: 55,
  boxSizing: 'border-box',
  padding: '8px 10px',
  border: '1px solid $border',
});

const FormLink = styled('a', {
  all: 'unset',
  cursor: 'pointer',
  color: '$gray',
  transition: 'color 300ms',
  variants: {
    mode: {
      cart: {
        width: '50%',
        height: 60,
        backgroundColor: '$gray700',
      },
      checkout: {
        width: '50%',
        height: 60,
        backgroundColor: 'black',
      },
      submit: {
        width: '100%',
        height: 55,
        backgroundColor: 'black',
      },
    },
  },
  '&:hover': {
    color: '$link',
  },
})

const Separator = styled('p', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  fontSize: '$4',
  marginTop: '$1',
  marginBottom: '$2',
  '&::before, &::after': {
    content: '',
    width: '42%',
    height: '1px',
    backgroundColor: '$border',
    transform: 'translate(0, 0.5em)',
  },
});

const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 45,
  width: '100%',
  backgroundColor: '$link',
  color: 'white',
  marginTop: 'auto',
  '& svg': {
    width: '16px',
    height: '16px',
    marginRight: 10,
    transform: 'translate(0, -1px)',
  },
  '& svg path': {
    stroke: 'white !important',
  },
});