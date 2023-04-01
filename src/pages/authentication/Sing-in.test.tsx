import React from 'react';
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SingIn from "./Sing-in";

test('render test component', () => {
    render(
        <SingIn/>
    )
    const enterButton = screen.getByTestId('submit-button');
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('password');
    userEvent.type(emailInput, 'eliz_matsen@gmail.com');
    userEvent.type(passwordInput, '0987654321');

    userEvent.click(enterButton);
    waitFor(() => {
        expect(enterButton).toHaveBeenCalled();
    });
});
