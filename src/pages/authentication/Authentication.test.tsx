import React from 'react';
import reducer, {login, registration} from "../../app/authSlice";

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
    });
});
