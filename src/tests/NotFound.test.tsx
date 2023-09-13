import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

test('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
  renderWithRouter(<NotFound />);
  const VerificaH2 = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(VerificaH2).toBeInTheDocument();
});

test('Teste se a página mostra a imagem com o texto alternativo', () => {
  renderWithRouter(<NotFound />);
  const altImage = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  expect(altImage).toHaveAttribute('src', '/404.gif');
});
