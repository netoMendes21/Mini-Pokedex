import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('O primeiro link deve ter o texto Home', () => {
  renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: 'Home' });
  expect(linkHome).toBeInTheDocument();
});

test('O segundo link deve ter o texto About', () => {
  renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: 'About' });
  expect(linkAbout).toBeInTheDocument();
});

test('O terceiro link deve ter o texto Favorite Pokémon', () => {
  renderWithRouter(<App />);
  const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(linkFavoritePokemon).toBeInTheDocument();
});
