import React from 'react';
import reducer, {login} from "../../app/authSlice";

describe('exampleSlice', () => {
    describe('reducers', () => {
        const initialState = {access_token: null}

        it('login is pending', () => {
            const action = {type: login.pending.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null});
        });

        it('login is fulfilled', () => {
            const action = {type: login.fulfilled.type, payload: {accessToken: 'sfsdfsdfsdfsdf'}};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: 'sfsdfsdfsdfsdf'});
        });

        it('login is rejected', () => {
            const action = {type: login.rejected.type};
            const state = reducer(initialState, action);
            expect(state).toEqual({access_token: null});
        });
    });
});
