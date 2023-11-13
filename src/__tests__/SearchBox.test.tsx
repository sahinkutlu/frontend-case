import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBox from '../components/SearchBox';

test('renders learn react link', () => {
    render(<SearchBox onChange={() => { }} />);
    const linkElement = screen.getByPlaceholderText(/kategori ara/i);
    fireEvent.change(linkElement, { target: { value: 'a' } })
    expect(linkElement).toBeInTheDocument();
});
