import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<App />, { route: '/about' });
  const infoPokedex = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(infoPokedex).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderWithRouter(<App />, { route: '/about' });
  const primeiroParagrafo = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.');
  expect(primeiroParagrafo).toBeVisible();

  const segundoParagrafo = screen.getByText('One can filter Pokémon by type, and see more details for each one of them.');
  expect(segundoParagrafo).toBeVisible();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
  renderWithRouter(<App />, { route: '/about' });
  const imgPokedex = screen.getByAltText('Pokédex');
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
