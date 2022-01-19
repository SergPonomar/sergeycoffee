import { useState } from 'react'

import { styled, css } from '../stitches.config'

import * as Dialog from '@radix-ui/react-dialog';
import * as SeparatorPrimitive from '@radix-ui/react-separator';

import { useTransition, animated, config } from 'react-spring';
import { 
  FormClose,
  User,
} from 'grommet-icons';

import Button from '../components/Button'
import IconButton from '../components/IconButton'

export default function Autorization() {
  const [open, setOpen] = useState(false);

  const transitions = useTransition(open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.default,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <IconButton func="author">
          <User/>
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

                  <img 
                    style={{width:'178px'}} 
                    src='logo.png'
                    alt="Company logo"
                  />
                  <Separator />
                  <h3>Great to have you back!</h3>
                  <Form>
                    <InputLine type="email" placeholder="Email adress"/>
                    <InputLine type="password" placeholder="Password"/>
                    <Link>Forgot your password?</Link>
                  <Button as='button' type='submit' mode='submit'>LOG IN</Button>
                  <Badge>Don’t have an account? <Link css={{marginLeft: 10}}>Register now</Link></Badge>
                  </Form>

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
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled(Dialog.Content, {
  outline: 'none',
  background: 'white',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  gap: 15,
  width: 500,
  height: 600,
  paddingTop: 50,
  paddingX: 65,
});

const Separator = styled(SeparatorPrimitive.Root, {
  height: 1, 
  width: '100%',
  backgroundColor: '$border',
});

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
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

const Link = styled('a', {
  all: 'unset',
  cursor: 'pointer',
  color: '$gray',
  transition: 'color 300ms',
  '&:hover': {
    color: '$link',
  },
})

const Badge = styled('div', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  height: 45,
})

const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 45,
  height: 45,
  position: 'absolute',
  top: -45,
  right: -15,
  '& svg': {
    width: '34px',
    height: '34px',
    transform: 'translate(0, -2px)',
  },
  '& svg path': {
    stroke: 'white !important',
  },
  '&:hover svg path': {
    stroke: '$link !important',
  },
});