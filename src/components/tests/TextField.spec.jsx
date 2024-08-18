import React from 'react';
import TextField from '@/components/TextField';
import render from '@/utils/test/render';
import { screen } from '@testing-library/react';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // ** Arrange - 테스트를 위한 환경 만들기
  // => className을 지닌 컴포넌트 렌더링

  // ** Act - 테스트할 동작 발생
  // => 렌더링에 대한 검증이므로 생략
  // => 클릭이나 메서드 호출, prop 변경 등이 이에 해당

  // ** Assert - 올바른 동작 실행되었는지 검증
  // => 렌더링 후에 DOM에 해당 class가 존재하는지 검증

  // render API를 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 많은 웹표준을 순수 자바스크립트로 구현
  await render(<TextField className="my-class" />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  screen.debug(); // jsdom에서 DOM 구조 확인

  // className이라는 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 최종적으로 사용자가 보는 화면은 DOM 이므로
  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요." 가 노출된다.', async () => {
    // Arrange
    await render(<TextField />);
    screen.debug();
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // Act - 생략
    // Assert
    expect(textInput).toBeInTheDocument(); // matcher -> 기대 결과를 검증하기 위해 사용되는 API 집합

    // 단언 (assertion) -> 테스트가 통과하기 위한 조건 -> 검증 실행
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});
