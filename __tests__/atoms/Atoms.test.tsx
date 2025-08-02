import 'react-native';
import Typography from '../../src/components/atoms/Typography';
import { it } from '@jest/globals';
import React from 'react';
import Box from '../../src/components/atoms/Box';
import Button from '../../src/components/atoms/Button';
import Container from '../../src/components/atoms/Container';
import PressableWithFeedback from '../../src/components/PressableWithFeedback';
import { fireEvent, render, screen } from '@testing-library/react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      {children}
    </ApplicationProvider>
  </SafeAreaProvider>
);

it('renders Light Text correctly', () => {
  render(
    <TestWrapper>
      <Typography />
    </TestWrapper>,
  );
});

it('renders Box correctly', () => {
  render(<Box />);
});

it('renders Pressasble correctly', () => {
  const mockProps = {
    feedbackColor: 'red',
    hidden: false,
    style: { padding: 10 },
    onPress: jest.fn(),
  };
  const tree = render(<PressableWithFeedback {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Hide Pressasble correctly', () => {
  const mockProps = {
    feedbackColor: 'red',
    hidden: true,
    style: { padding: 10 },
    onPress: jest.fn(),
  };
  const tree = render(<PressableWithFeedback {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders Button correctly', () => {
  const mockProps = {
    label: 'test',
    onButtonPress: jest.fn(),
  };
  render(
    <TestWrapper>
      <Button {...mockProps} />
    </TestWrapper>,
  );
  fireEvent(screen.getByText('test'), 'press');
  expect(mockProps.onButtonPress).toHaveBeenCalledTimes(1);
});

it('renders Container correctly', () => {
  const tree = render(
    <TestWrapper>
      <Container />
    </TestWrapper>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
