import { debounce, pick } from './common';

describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toEqual({ a: 'A' });
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a', 'b')).toEqual({ a: 'A', b: { c: 'C' } });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

// 연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 콜백 함수가 호출  -> 특정 함수의 호출 횟수 제한하는 기능
// -> 비동기 함수가 실행되기 전에 단언이 실행됨
describe('debounce', () => {
  // 타이머 모킹! -> 0.3초 흐른것으로 타이머 조작 -> spy 함수 호출 확인
  beforeEach(() => {
    // teardown 에서 모킹 초기화 -> 다른 테스트에 영향X

    // 타이머 모킹도 초기화 필수!
    // 써드파티 라이브러리, 전역 teardown에서 타이머에 의존하는 로직 -> fakeTimer로 인해 제대로 동작하지 않을 수 있음
    vi.useFakeTimers();

    // 시간은 흐르기떄문에 매일 달라짐
    // -> 테스트 당시의 시간에 의존하는 테스트의 경우, 시간을 고정하지 않으면 테스트가 깨질수있음.
    // -> setSystemTime()으로 시간을 고정하면 일관된 환경에서 테스트 가능
    vi.setSystemTime(new Date('2024-08-22')); // 2024-08-22 에 테스트를 하는 환경
  });

  afterEach(() => {
    vi.useRealTimers(); // 타이머의 동작 원래대로 복구, 테스트 안정적으로 실행가능
  });

  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    vi.useFakeTimers();

    const spy = vi.fn();
    const debouncedFn = debounce(spy, 1000);

    debouncedFn();

    vi.advanceTimersByTime(300); // 0.3초 흐름

    expect(spy).toHaveBeenCalled();
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 콜백 함수가 호출된다', () => {
    const spy = vi.fn();

    const debounceFn = debounce(spy, 1000);

    // 최초 호출
    debounceFn();

    // 최초 호출 후 0.2초 후 호출
    debounceFn();
    vi.advanceTimersByTime(200);

    // 두번째 호출 후 0.1초 후 호출
    debounceFn();
    vi.advanceTimersByTime(100);

    // 세번째 호출 후 0.2초 후 호출
    debounceFn();
    vi.advanceTimersByTime(200);

    // 네번째 호출 후 0.3초 후 호출
    debounceFn();
    vi.advanceTimersByTime(300);

    // 다섯번 호출했지만 실제로 spy함수는 단 한번 호출
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
