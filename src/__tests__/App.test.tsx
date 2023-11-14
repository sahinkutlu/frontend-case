import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/kategoriler/i);

  const categoryItem = screen.getAllByTestId("category-item");
  userEvent.click(categoryItem[0]);

  const selectedCategoryItem = screen.getAllByTestId("selected-category-item");
  userEvent.click(selectedCategoryItem[0]);

  const submitButton = screen.getByTestId("submit-button");
  userEvent.click(submitButton);

  expect(linkElement).toBeInTheDocument();
});
