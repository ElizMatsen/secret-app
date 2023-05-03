import React from 'react';
import reducer, {registration} from "../../app/authSlice";
import configureStore from "redux-mock-store";
import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SingUp from "./SingUp";

describe('authSlice', () => {
    describe('reducers', () => {

        const initialState = {access_token: null, user: {email: ''}}
        it('registration is pending', () => {
            const action = {type: registration.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null, user: {email: ''}});
        });

        it('registration is fulfilled', () => {
            const action = {type: registration.fulfilled.type, payload: {access_token: null, user: {email: 'sdsdsd'}}};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null, user: {email: 'sdsdsd'}});
        });

        it('registration is rejected', () => {
            const action = {type: registration.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null, user: {email: ''}});
        });
        it('registration form', async () => {
            const onSubmit = jest.fn()
            const mockStore = configureStore([]);
            render(
                <Provider store={mockStore({userApi: {}})}>
                    <BrowserRouter>
                        <SingUp onSubmitRegistrationForm={onSubmit}/>
                    </BrowserRouter>
                </Provider>
            )
            await act(async () => {
                userEvent.type(await screen.getByTestId(/email/i), 'new@mail.ru')
                userEvent.type(await screen.getByTestId(/password/i), '0987654321');
            })
            await act(async () => {
                userEvent.click(await screen.getByTestId(/submit-button/i));
            });
            await expect(onSubmit).toHaveBeenCalledTimes(1)
            await expect(onSubmit).toHaveBeenCalledWith({
                email: 'new@mail.ru',
                password: '0987654321'
            })
        })
    });
});
