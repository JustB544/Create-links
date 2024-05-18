import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    
    // Check if the "Create Links" header is in the document
    expect(screen.getByText('Create Links')).toBeInTheDocument();

    // Check if the Link component is in the document
    expect(screen.getByTestId('link-component')).toBeInTheDocument();

    // Check if the Presets component is in the document
    expect(screen.getByTestId('presets-component')).toBeInTheDocument();

    // Check if the SavedSettings component is in the document
    expect(screen.getByTestId('savedsettings-component')).toBeInTheDocument();

    // Check if the Settings component is in the document
    expect(screen.getByTestId('settings-component')).toBeInTheDocument();

    // Check if the GenerateLinks component is in the document
    expect(screen.getByTestId('generatelinks-component')).toBeInTheDocument();
  });
});