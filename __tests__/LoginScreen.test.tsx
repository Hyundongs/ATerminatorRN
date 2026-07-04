import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/LoginScreen';

describe('LoginScreen', () => {
  it('renders correctly and handles input', () => {
    const mockOnConnect = jest.fn();
    const { getByPlaceholderText, getByText } = render(<LoginScreen onConnect={mockOnConnect} />);

    // UI 엘리먼트들이 정상적으로 렌더링 되었는지 확인
    const hostInput = getByPlaceholderText('IP Address / Host');
    const userInput = getByPlaceholderText('Username');
    const passInput = getByPlaceholderText('Password');
    const connectButton = getByText('Connect');

    expect(hostInput).toBeTruthy();
    expect(userInput).toBeTruthy();
    expect(passInput).toBeTruthy();
    expect(connectButton).toBeTruthy();

    // 입력값 변경 시뮬레이션
    fireEvent.changeText(hostInput, '192.168.1.10');
    fireEvent.changeText(userInput, 'admin');
    fireEvent.changeText(passInput, 'password123');

    // Connect 버튼 클릭 시뮬레이션
    fireEvent.press(connectButton);

    // onConnect 콜백이 올바른 파라미터와 함께 호출되었는지 검증
    expect(mockOnConnect).toHaveBeenCalledWith({
      host: '192.168.1.10',
      user: 'admin',
      pass: 'password123',
      port: 22
    });
  });
});
