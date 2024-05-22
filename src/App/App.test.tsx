import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    
    // Check if the "Create Links" header is in the document
    expect(screen.getByText('Create Links')).toBeInTheDocument();

    // Check if the BaseLink component is in the document
    expect(screen.getByTestId('baselink-component')).toBeInTheDocument();

    // Check if the Autofill component is in the document
    expect(screen.getByTestId('linkactions-component')).toBeInTheDocument();

    // Check if the Presets component is in the document
    expect(screen.getByTestId('presets-component')).toBeInTheDocument();

    // Check if the SavedData component is in the document
    expect(screen.getByTestId('saveddata-component')).toBeInTheDocument();

    // Check if the CurrentData component is in the document
    expect(screen.getByTestId('currentdata-component')).toBeInTheDocument();

    // Check if the GenerateLinks component is in the document
    expect(screen.getByTestId('generatelinks-component')).toBeInTheDocument();
  });
});