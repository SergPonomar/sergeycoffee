import { useState } from 'react';

import { styled } from '../stitches.config'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { CaretDownFill } from 'grommet-icons';


export default function SelectFilter(props) {
  const [filter, setFilter] = useState('По умолчанию');

  const onChangeHandle = (value) => {
    setFilter(value);
    props.sortProducts(value);
  };

  return (
    <DropdownMenu.Root>
      <Trigger>{filter}<DownArrow color="black" size="16px"/></Trigger>
      <Content>
        <DropdownMenu.RadioGroup value={filter} onValueChange={onChangeHandle}>
          <RadioItem value="По умолчанию">
            По умолчанию
          </RadioItem>
          <RadioItem value="Дешевле">
            Дешевле
          </RadioItem>
          <RadioItem value="Дороже">
            Дороже
          </RadioItem>
          <RadioItem value="По дaте">
            По дaте
          </RadioItem>
        </DropdownMenu.RadioGroup>
      </Content>
    </DropdownMenu.Root>
  );
};

const DownArrow = styled(CaretDownFill, {
  marginBottom: 2,
});

const Trigger = styled(DropdownMenu.Trigger, {
  all: 'unset',
  width: 150,
  height: 42,
  color: 'black',
  border: '1px solid black',
  backgroundColor: 'white',
  cursor: 'pointer',
  outline: 'none',
  textAlign: 'center',
});

const Content = styled(DropdownMenu.Content, {
  width: 150,
  marginTop: 2,
  color: 'black',
  border: '1px solid black',
  backgroundColor: 'white',
  cursor: 'pointer',
  boxSizing: 'content-box',
  transform: 'translate(0, -104px)',
  '@bp2': {
    transform: 'translate(0, 0)',
  },
});

const RadioItem = styled(DropdownMenu.RadioItem, {
  outline: 'none',
  padding: '$1',
  '&:hover': {
    color: 'white',
    backgroundColor: '$link',
  },
});