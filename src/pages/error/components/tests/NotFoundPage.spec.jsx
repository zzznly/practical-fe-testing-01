import NotFoundPage from '@/pages/error/components/NotFoundPage';
import React from 'react';
import render from '@/utils/test/render';
import { screen } from '@testing-library/react';

const navigateFn = vi.fn(); // spy 함수

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
});

it('Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate가 실행된다', async () => {
  const { user } = render(<NotFoundPage />);

  await user.click(screen.getByText('Home으로 이동'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/', { replace: true });
});
