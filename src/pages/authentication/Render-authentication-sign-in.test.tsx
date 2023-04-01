import React from 'react';
import {render, screen, waitFor} from "@testing-library/react";
import SingIn from "./Sing-in";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
require('jest-fetch-mock').enableMocks()

const fakeUser = {
    email: 'efe@sc.s',
    password: '0987654321'
}
export const assetsFetchMock = () => Promise.resolve({
    ok: true,
    status: 200,
    json: async () => fakeUser
} as Response);

describe("Testing EMAIL", () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    test('renders email data', async () => {
        fetchMock.mockResolvedValue(assetsFetchMock())
        render(<SingIn/>)

        const enterButton = screen.getByTestId('submit-button');
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        userEvent.type(emailInput, 'eliz_matsen@gmail.com');
        userEvent.type(passwordInput, '0987654321');
        userEvent.click(enterButton)

        waitFor(async () => {
            expect(await screen.findByText('eliz_matsen@gmail.com')).toBeInTheDocument();
            expect(await screen.findByText('0987654321')).toBeInTheDocument();
        });
    })
});
