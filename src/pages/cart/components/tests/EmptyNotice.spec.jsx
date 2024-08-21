import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import React from 'react';
import render from '@/utils/test/render';
import { screen } from '@testing-library/react';
import { useNavigate } from 'node_modules/react-router-dom/dist/index';

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행
// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는가 -> 스파이 함수

const navigateFn = vi.fn(); // spy 함수

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  return { ...original, useNavigate: () => navigateFn };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByText('홈으로 가기'));

  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});
