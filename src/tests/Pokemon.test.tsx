import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const pokemon25 = '/pokemon/25';

test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
  renderWithRouter(<App />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(pokemonList[0].name);
});

test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType).toHaveTextContent(pokemonList[0].type);
});

test('O peso médio do Pokémon deve ser exibido no texto com um texto', () => {
  renderWithRouter(<App />);
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${pokemonList[0]
    .averageWeight.value} ${pokemonList[0].averageWeight.measurementUnit}`);
});

test('A imagem do Pokémon deve ser exibida', () => {
  renderWithRouter(<App />);
  const pokemonImage = screen.getByRole('img');
  expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  expect(pokemonImage).toHaveAttribute('src', pokemonList[0].image);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon.', () => {
  renderWithRouter(<App />);
  const pokemonCard = screen.getByRole('link', { name: /more details/i });
  expect(pokemonCard).toHaveAttribute('href', pokemon25);
});

test('Teste também se a URL exibida no navegador muda.', async () => {
  renderWithRouter(<App />);
  const pokemonCard = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(pokemonCard);
  expect(window.location.pathname).toBe(pokemon25);
});

test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
  renderWithRouter(<App />);
  const pokemonCard = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(pokemonCard);
  expect(window.location.pathname).toBe(pokemon25);
});

test('O ícone deve ser uma imagem com o atributo src que contém o caminho /star-icon.png.', async () => {
  renderWithRouter(<App />, { route: pokemon25 });
  const marcado = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  await userEvent.click(marcado);
  const iconStar = screen.getAllByRole('img');
  expect(iconStar[0]).toHaveAttribute('src', '/star-icon.png');
});
test('A imagem deve ter o atributo alt igual à <Pokemon> is marked as favorite, em que <Pokemon> é o do Pokémon exibido', async () => {
  renderWithRouter(<App />);
  const iconStar = screen.getAllByRole('img');
  expect(iconStar[0]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
