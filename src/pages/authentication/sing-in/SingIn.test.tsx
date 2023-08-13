import React from 'react';
import reducer, {AuthState, login} from "../../../app/authSlice";
import {act, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import SingIn from "./SingIn";
import store from "../../../app/store";
import userEvent from "@testing-library/user-event";
import {BrowserRouter} from "react-router-dom";

function renderWithContext(element: any) {
    render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
    return {store};
}

describe('authSlice', () => {
    const initialState: AuthState = {
        access_token: null,
        user: null,
        created: false,
    }

    it('login is pending', () => {
        const action = {type: login.pending.type};
        const state = reducer(initialState, action);
        expect(state).toEqual({
            access_token: null,
            user: null,
            created: false,
        });
    });

    it('login is fulfilled', () => {
        const action = {type: login.fulfilled.type, payload: {accessToken: 'sfsdfsdfsdfsdf'}};
        const state = reducer(initialState, action);
        expect(state).toEqual({
            access_token: 'sfsdfsdfsdfsdf',
            user: null,
            created: false
        });
    });

    it('login is rejected', () => {
        const action = {type: login.rejected.type};
        const state = reducer(initialState, action);
        expect(state).toEqual({
            access_token: null,
            user: null,
            created: false,
        });
    });
    it('submit login', async () => {
        const onSubmit = jest.fn();
        const {store} = renderWithContext(<SingIn onSubmitLoginForm={onSubmit}/>);
        expect(store.getState().auth.access_token).toEqual(null);
        await act(async () => {
            userEvent.type(await screen.getByTestId('email'), 'eliz_skakun@mail.ru')
            userEvent.type(await screen.getByTestId('password'), '0987654321');
        })
        await act(async () => {
            userEvent.click(await screen.getByTestId('submit-button'));
        });
        await expect(onSubmit).toHaveBeenCalledTimes(1)
        await expect(onSubmit).toHaveBeenCalledWith({
            email: 'eliz_skakun@mail.ru',
            password: '0987654321'
        })
    });
});
