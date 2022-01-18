import { useState } from 'react';

import { styled } from '../stitches.config';

import * as Dialog from '@radix-ui/react-dialog';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { useTransition, animated, config } from 'react-spring';
import { Filter } from 'grommet-icons';

import Button from '../components/Button';


export default function FilterPanel(props) {
  const [open, setOpen] = useState(false);

  const transitions = useTransition(open, {
    from: { opacity: 0, x: -320 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -320 },
    config: config.default,
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button mode="filter">
          <Filter/>
          <span>ФИЛЬТР</span>
        </Button>
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
                <ToggleGroup.Root
                  asChild
                  type="multiple"
                  value={props.filter}
                  onValueChange={props.filterHandle}
                >
                  <animated.div style={styles}>
                    <Dialog.Close asChild>
                      <CloseButton>
                        ЗАКРЫТЬ
                      </CloseButton>
                    </Dialog.Close>
                    <FilterHeader>
                      <h4>Страна происхождения</h4>
                      <Separator/>
                    </FilterHeader>
                    <OptionsList>
                      <li><ToggleButton value="country: бразилия">Бразилия</ToggleButton></li>
                      <li><ToggleButton value="country: эфиопия">Эфиопия</ToggleButton></li>
                      <li><ToggleButton value="country: колумбия">Колумбия</ToggleButton></li>
                      <li><ToggleButton value="country: вьетнам">Вьетнам</ToggleButton></li>
                      <li><ToggleButton value="country: уганда">Уганда</ToggleButton></li>
                    </OptionsList>
                    <FilterHeader>
                      <h4>Производитель</h4>
                      <Separator/>
                    </FilterHeader>
                    <ButtonsBlock>
                      <ToggleGroup.Item asChild value="vendor: alta-roma">
                        <Button mode="weight">Alta Roma</Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item asChild value="vendor: coffesso">
                        <Button mode="weight">Coffesso</Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item asChild value="vendor: egoiste">
                        <Button mode="weight">Egoiste</Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item asChild value="vendor: jardin">
                        <Button mode="weight">Jardin</Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item asChild value="vendor: julius-meinl">
                        <Button mode="weight">Julius Meinl</Button>
                      </ToggleGroup.Item>
                    </ButtonsBlock>
                    <FilterHeader>
                      <h4>Цена</h4>
                      <Separator/>
                    </FilterHeader>
                    <OptionsList>
                      <li><ToggleButton value="price: до-600">{'До 600 \u20BD'}</ToggleButton></li>
                      <li><ToggleButton value="price: 600-800">{'400 - 600 \u20BD'}</ToggleButton></li>
                      <li><ToggleButton value="price: 800-1000">{'600 - 1000 \u20BD'}</ToggleButton></li>
                      <li><ToggleButton value="price: 1000-1500">{'1000 - 1500 \u20BD'}</ToggleButton></li>
                      <li><ToggleButton value="price: более-1500">{'Более 1500 \u20BD'}</ToggleButton></li>
                    </OptionsList>
                    <FilterHeader>
                      <h4>Тэги</h4>
                      <Separator/>
                    </FilterHeader>
                    <ButtonsBlock>
                      <ToggleGroup.Item asChild value="tag: арабика">
                        <Button mode="tag">Арабика</Button>
                      </ToggleGroup.Item>
                      <ToggleGroup.Item asChild value="tag: робуста">
                        <Button mode="tag">Робуста</Button>
                      </ToggleGroup.Item>
                    </ButtonsBlock>
                  </animated.div>
                </ToggleGroup.Root>
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
  justifyContent: 'left',
});

const Content = styled(Dialog.Content, {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  outline: 'none',
  background: 'white',
  width: 415,
  paddingX: '$5',
  paddingTop: '$5',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: '$1',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$gray',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'white'
  },
});

const CloseButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  position: 'absolute',
  top: '$2',
  right: '$5',
});

const FilterHeader = styled('div', {
  paddingLeft: '$2',
  borderLeft: '3px solid black',
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginY: '$5',
  '& h4': {
    marginY: 0,
    paddingTop: 3,
    paddingRight: '$4',
    paddingBottom: '$2',
  },
});

const Separator = styled(SeparatorPrimitive.Root, {
  height: 1,
  flexGrow: '1',
  backgroundColor: '$border',
});

const OptionsList = styled('ul', {
  listStyleType: 'none',
  padding: 0,
  margin: 0,  
});

const ToggleButton = styled(ToggleGroup.Item, {
  all: 'unset',
  cursor: 'pointer',
  paddingY: '$1',
  '&:hover, &[data-state=on]': {
    color: '$link',
  },
});

const ButtonsBlock = styled('div', {
  display: 'flex',
  gap: '$3',
  flexWrap: 'wrap',
});