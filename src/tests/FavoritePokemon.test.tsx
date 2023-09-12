import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('É exibida na tela a mensagem No favorite pokémon found caso a pessoa não tenha Pokémon favorito.', () => {
  renderWithRouter(<App />, { route: '/favorites' });

  const notFavorite = screen.getByText('No favorite Pokémon found');
  expect(notFavorite).toBeVisible();
});

test('Apenas são exibidos os Pokémon favoritados', async () => {
  renderWithRouter(<App />);

  const linkParaDetalhes = screen.getByRole('link', { name: /More details/i });
  expect(linkParaDetalhes).toBeInTheDocument();
  await userEvent.click(linkParaDetalhes);

  const marcado = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
  await userEvent.click(marcado);
  expect(marcado).toBeInTheDocument();

  const favoritado = screen.getByRole('link', { name: /Favorite Pokémon/i });
  expect(favoritado).toBeInTheDocument();
  await userEvent.click(favoritado);

  const mostrar = screen.getByText(/Pikachu/i);
  expect(mostrar).toBeInTheDocument();
});
