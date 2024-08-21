import '@testing-library/jest-dom';

import { handlers } from '@/__mocks__/handlers';
import { setupServer } from 'msw/node';

/* msw */
export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();

  // 모킹된 모의 객체 호출에 대한 히스토리 초기화
  // 모킹된 모듈의 구현을 초기화하지는 x -> 기존 모듈이 모킹된 상태로 유지됨
  // -> 모킹 모듈 기반으로 작성한 테스트가 올바르게 실행
  // 반면, 모킹 히스토리가 계속 쌓임 (호출 횟수 or 인자 계속 변경) -> 다른 테스트에 영향 줄 수 있음

  vi.clearAllMocks(); // 그래서, 테스트 끝날때마다 모킹 히스토리 초기화!
});

afterAll(() => {
  // 모킹 모듈에 대한 모든 구현을 초기화
  vi.resetAllMocks(); // spy함수의 호출횟수, 결과 등 모듈 초기화
  server.close();
});
/*
  Vitest - restoreAllMocks(), clearAllMocks(), resetAllMocks() 등 함수 있음
  https://vitest.dev/api/vi.html#vi-restoreallmocks
*/

vi.mock('zustand');

// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
