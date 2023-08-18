import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "../../app/store";
import SecretCreateForm from "./SecretCreateForm";
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function renderWithContext(element: any) {
    render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
    return {store};
}

describe('SecretCreateForm', () => {

    it('submit form', async () => {
        const mockFn = jest.fn();
        renderWithContext(<SecretCreateForm modalEvent={mockFn} onSubmitForm={mockFn}/>);
        await act(async () => {
            userEvent.type(await screen.getByTestId('title'), 'title')
            userEvent.type(await screen.getByTestId('body'), 'body');
        })
        await act(async () => {
            userEvent.click(await screen.getByTestId('submit-button'));
        });
        await act(async () => {
            await expect(mockFn).toHaveBeenCalledTimes(1)
            await expect(mockFn).toHaveBeenCalledWith({
                title: 'title',
                body: 'body'
            })
        })

    });
    it('invalid title', async () => {
        const mockFn = jest.fn();
        renderWithContext(<SecretCreateForm modalEvent={mockFn} onSubmitForm={mockFn}/>);
        await act(async () => {
            userEvent.type(await screen.getByTestId('title'), "невалидные данные")
        })
        await act(async () => {
            userEvent.click(await screen.getByTestId('submit-button'));
        });
        expect(await screen.getByTestId('title')).toBeInTheDocument();
        expect(await screen.getByTestId('error-message')).toHaveTextContent(
            'Only latin letters',
        );
    });

    it('invalid body', async () => {
        const mockFn = jest.fn();
        renderWithContext(<SecretCreateForm modalEvent={mockFn} onSubmitForm={mockFn}/>);
        await act(async () => {
            userEvent.type(await screen.getByTestId('body'), "невалидные данные")
        })
        await act(async () => {
            userEvent.click(await screen.getByTestId('submit-button'));
        });
        expect(await screen.getByTestId('body')).toBeInTheDocument();
        expect(await screen.getByTestId('error-message')).toHaveTextContent(
            'Only latin letters',
        );
    });
});
