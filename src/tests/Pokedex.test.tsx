import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
  renderWithRouter(<App />);
  const contemH2 = screen.getByRole('heading', { name: /Encountered Pokémon/i });
  expect(contemH2).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', async () => {
  renderWithRouter(<App />);
  const nextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
  expect(nextPokemon).toBeInTheDocument();
  await userEvent.click(nextPokemon);
});

test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.', async () => {
  renderWithRouter(<App />);
  const pokemon1 = screen.getByText('Pikachu');
  expect(pokemon1).toBeInTheDocument();
  const proximoPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
  expect(proximoPokemon).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon2 = screen.getByText(/charmander/i);
  expect(pokemon2).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon3 = screen.getByText(/caterpie/i);
  expect(pokemon3).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon4 = screen.getByText(/ekans/i);
  expect(pokemon4).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon5 = screen.getByText(/alakazam/i);
  expect(pokemon5).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon6 = screen.getByText(/mew/i);
  expect(pokemon6).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon7 = screen.getByText(/rapidash/i);
  expect(pokemon7).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon8 = screen.getByText(/snorlax/i);
  expect(pokemon8).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon9 = screen.getByText(/dragonair/i);
  expect(pokemon9).toBeInTheDocument();
  await userEvent.click(proximoPokemon);

  const pokemon10 = screen.getByText(/pikachu/i);
  expect(pokemon10).toBeInTheDocument();
  await userEvent.click(proximoPokemon);
});

test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
  renderWithRouter(<App />);
  const botaoFiltro = screen.getAllByTestId('pokemon-type-button');
  expect(botaoFiltro).toHaveLength(7);
});

test('Teste se a Pokédex contém um botão para resetar o filtro:', async () => {
  renderWithRouter(<App />);
  const resetFilter = screen.getByText(/dragon/i);
  expect(resetFilter).toBeInTheDocument();
  await userEvent.click(resetFilter);
  const monstro = screen.getByText(/dragonair/i);
  expect(monstro).toBeVisible();

  const resetFilter1 = screen.getByText(/fire/i);
  expect(resetFilter1).toBeInTheDocument();
  await userEvent.click(resetFilter1);
  const monstro1 = screen.getByText(/charmander/i);
  expect(monstro1).toBeVisible();

  const resetFilter2 = screen.getByText(/electric/i);
  expect(resetFilter2).toBeInTheDocument();
  await userEvent.click(resetFilter2);
  const monstro2 = screen.getByText(/pikachu/i);
  expect(monstro2).toBeVisible();
});

test('Teste se o botao troca de pokémons.', async () => {
  renderWithRouter(<App />);
  const botaoQualquercoisa = screen.getByRole('button', { name: /próximo pokémon/i });
  await userEvent.click(botaoQualquercoisa);
  const pokemon = screen.getByText(/charmander/i);
  expect(pokemon).toBeInTheDocument();

  const botaoQualquercoisa1 = screen.getByRole('button', { name: /próximo pokémon/i });
  await userEvent.click(botaoQualquercoisa1);
  const pokemon1 = screen.getByText(/caterpie/i);
  expect(pokemon1).toBeInTheDocument();

  const botaoReset = screen.getByRole('button', { name: /All/i });
  expect(botaoReset).toBeInTheDocument();
  await userEvent.click(botaoReset);
  const pokemon2 = screen.getByText(/pikachu/i);
  expect(pokemon2).toBeVisible();
  const botaoProximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(botaoProximoPokemon).toBeVisible();
});
