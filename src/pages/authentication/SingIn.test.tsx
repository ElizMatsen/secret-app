import React from 'react';
import reducer, {login} from "../../app/authSlice";
import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import SingIn from "./SingIn";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";

describe('authSlice', () => {
    describe('reducers', () => {
        const initialState = {access_token: null, user: {email: ''}}

        it('login is pending', () => {
            const action = {type: login.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null, user: {email: ''}});
        });

        it('login is fulfilled', () => {
            const action = {type: login.fulfilled.type, payload: {accessToken: 'sfsdfsdfsdfsdf'}};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: 'sfsdfsdfsdfsdf', user: {email: ''}});
        });

        it('login is rejected', () => {
            const action = {type: login.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null, user: {email: ''}});
        });

        it('submit login', async () => {
            const onSubmit = jest.fn()
            const mockStore = configureStore([]);
            render(
                <Provider store={mockStore({userApi: {}})}>
                    <BrowserRouter>
                        <SingIn onSubmitLoginForm={onSubmit}/>
                    </BrowserRouter>
                </Provider>
            )
            await act(async () => {
                userEvent.type(await screen.getByTestId(/email/i), 'eliz_skakun@mail.ru')
                userEvent.type(await screen.getByTestId(/password/i), '0987654321');
            })
            await act(async () => {
                userEvent.click(await screen.getByTestId(/submit-button/i));
            });
            await expect(onSubmit).toHaveBeenCalledTimes(1)
            await expect(onSubmit).toHaveBeenCalledWith({
                email: 'eliz_skakun@mail.ru',
                password: '0987654321'
            })
        })
    });
});
