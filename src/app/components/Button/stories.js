import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '../index';

storiesOf('components/Button', module)
    .add('default', () => (<Button label={`Button`} />))
    .add('White', () => (<Button label={`Button`} color={`white`} />))
    .add('Red', () => (<Button label={`Button`} color={`red`} />))
    .add('Small', () => (<Button label={`Button`} color={`red`} size={`small`}/>))
    .add('Disabled', () => (<Button label={`Button`} state={`disabled`} />));
