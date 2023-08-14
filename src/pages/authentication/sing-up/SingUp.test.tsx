import React from 'react';
import reducer, {AuthState, registration} from "../../../app/authSlice";
import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SingUp from "./SingUp";
import store from "../../../app/store";
import SingIn from "../sing-in/SingIn";

function renderWithContext(element: any) {
    render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
    return {store};
}

describe('authSlice', () => {
    describe('reducers', () => {
        const initialState: AuthState = {
            access_token: null,
            user: null,
            created: false,
        }
        it('registration is pending', () => {
            const action = {type: registration.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                access_token: null,
                user: null,
                created: true,
            });
        });

        it('registration is fulfilled', () => {
            const action = {
                type: registration.fulfilled.type, payload: {
                    access_token: null,
                    user: null,
                    created: false
                }
            };
            const state = reducer(initialState, action);
            expect(state).toEqual({
                access_token: null,
                user: null,
                created: false
            });
        });

        it('registration is rejected', () => {
            const action = {type: registration.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({
                access_token: null,
                user: null,
                created: false,
            });
        });

        it('registration form', async () => {
            const onSubmit = jest.fn()
            const {store} = renderWithContext(<SingUp onSubmitRegistrationForm={onSubmit}/>);
            expect(store.getState().auth.access_token).toEqual(null);
            await act(async () => {
                userEvent.type(await screen.getByTestId('email'), 'new@mail.ru')
                userEvent.type(await screen.getByTestId('password'), '0987654321');
            })
            await act(async () => {
                userEvent.click(await screen.getByTestId('submit-button'));
            });
            await expect(onSubmit).toHaveBeenCalledTimes(1)
            await expect(onSubmit).toHaveBeenCalledWith({
                email: 'new@mail.ru',
                password: '0987654321'
            })
        })
        it('invalid email', async () => {
            const onSubmit = jest.fn();
            renderWithContext(<SingIn onSubmitLoginForm={onSubmit}/>);
            await act(async () => {
                userEvent.type(await screen.getByTestId('email'), 'eliz')
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
});
