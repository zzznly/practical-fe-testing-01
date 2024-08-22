import { act, renderHook } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

// state가 정상적으로 변경되는지 확인!

// 리액트 훅은 반드시 리액트 컴포넌트 내부에서만 사용해야 정상 실행됨
it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: 훅을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태값에 접근 가능
  // rerender: 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다
  const { result, rerender } = renderHook(useConfirmModal);

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result } = renderHook(useConfirmModal);

  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true); // 실패
});
