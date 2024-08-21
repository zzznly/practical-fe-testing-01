import ErrorPage from '@/pages/error/components/ErrorPage';
import React from 'react';
import render from '@/utils/test/render';
import { screen } from '@testing-library/react';

const navigateFn = vi.fn(); // spy 함수

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);

  await user.click(screen.getByText('뒤로 이동'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, -1); // 올바른 인자를 가지고 호출되었는가
});
