import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const alakazam = '/pokemon/65';

test('A página deve conter um texto <name> details, em que <name> é o nome do Pokémon.', () => {
  renderWithRouter(<App />, { route: alakazam });
  const texto = screen.getByRole('heading', { name: /alakazam details/i });
  expect(texto).toBeInTheDocument();
});

test('Não deve existir o link de navegação para os detalhes do Pokémon selecionado', () => {
  renderWithRouter(<App />, { route: alakazam });
  const linkDetails = screen.queryByRole('link', { name: /more details/i });
  expect(linkDetails).not.toBeInTheDocument();
});

test('A seção de detalhes deve conter um heading h2 com o texo Summary', () => {
  renderWithRouter(<App />, { route: alakazam });
  const textoH2 = screen.getByRole('heading', { name: 'Summary' });
  expect(textoH2).toBeInTheDocument();
});

test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
  renderWithRouter(<App />, { route: alakazam });
  const paragrafo = screen.getByText('Closing both its eyes heightens all its other senses. This enables it to use its abilities to their extremes.');
  expect(paragrafo).toBeInTheDocument();
});

test('Na seção de detalhes, deverá haver um heading h2 com o texto Game Locations of <name>; em que <name> é o nome do Pokémon exibido.', () => {
  renderWithRouter(<App />, { route: alakazam });
  const city = screen.getByRole('heading', { name: 'Game Locations of Alakazam' });
  expect(city).toBeInTheDocument();
});

test('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes / devem ser exibidos o nome da localização e uma imagem do mapa em cada localização', () => {
  renderWithRouter(<App />, { route: alakazam });
  const city = screen.getByText('Unova Accumula Town');
  const mapCity = screen.getByAltText('Alakazam location');

  expect(city).toBeInTheDocument();
  expect(city).toHaveTextContent('Unova Accumula Town');
  expect(mapCity).toBeInTheDocument();
  expect(mapCity).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/4/44/Unova_Accumula_Town_Map.png');
});

test('A página deve exibir um checkbox que permite favoritar o Pokémon', async () => {
  renderWithRouter(<App />, { route: alakazam });
  const favoritado = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  expect(favoritado).toBeInTheDocument();
});

test('Cliques alternados no checkbox devem adicionar e remover, respectivamente, o Pokémon da lista de favoritos', async () => {
  const { user } = renderWithRouter(<App />, { route: alakazam });
  const favoritado = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  await user.click(favoritado);
  const texto = screen.queryByAltText('Alakazam is marked as favorite');
  expect(texto).toBeInTheDocument();
  await user.click(favoritado);
  expect(texto).not.toBeInTheDocument();
});
