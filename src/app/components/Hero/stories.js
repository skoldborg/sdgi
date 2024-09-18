import { storiesOf } from '@storybook/react';
import React from 'react';
import { Hero } from '../index';

storiesOf('components/Hero', module)
    .add('default', () => (<Hero title={`How does your idea affect our world?`} buttonLabel={`Learn more`} buttonUrl={`#`} imageUrl={`/mocks/hero-image.jpg`}/>));
