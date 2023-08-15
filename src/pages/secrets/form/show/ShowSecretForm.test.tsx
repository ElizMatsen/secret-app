import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "../../../../app/store";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShowSecretForm from "./ShowSecretForm";

function renderWithContext(element: any) {
    render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
    return {store};
}

describe('ShowSecretForm', () => {

    it('submit form', async () => {
        const mockFn = jest.fn();
        renderWithContext(<ShowSecretForm modalEvent={mockFn} onSubmitForm={mockFn}/>);
        await act(async () => {
            userEvent.type(await screen.getByTestId('email'), 'email@mail.ru')
            userEvent.type(await screen.getByTestId('password'), '0987654321');
        })
        await act(async () => {
            userEvent.click(await screen.getByTestId('submit-button'));
        });
        await act(async () => {
            await expect(mockFn).toHaveBeenCalledTimes(1)
            await expect(mockFn).toHaveBeenCalledWith({
                email: 'email@mail.ru',
                password: '0987654321'
            })
        })
    });

    it('invalid title', async () => {
        const mockFn = jest.fn();
        renderWithContext(<ShowSecretForm modalEvent={mockFn} onSubmitForm={mockFn}/>);
        await act(async () => {
            userEvent.type(await screen.getByTestId('email'), "email")
        })
        await act(async () => {
            userEvent.click(await screen.getByTestId('submit-button'));
        });
        expect(await screen.getByTestId('email')).toBeInTheDocument();
        expect(await screen.getByTestId('error-message')).toHaveTextContent(
            'Incorrect email address',
        );
    });
});
