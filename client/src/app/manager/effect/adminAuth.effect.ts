import {createEffect, createEvent, createStore} from 'effector';
import {Admin, TAdminLogin} from "@src/entities/admin";

export const loginFx = createEffect(async (data: TAdminLogin) => {
  const response = await Admin.login(data)
  return response.data.token;
});

export const setToken = createEvent<string>();
export const logout = createEvent();

export const $token = createStore<string | null>(localStorage.getItem('token'))
  .on(setToken, (_, token) => {
    localStorage.setItem('token', token);
    return token;
  })
  .on(loginFx.doneData, (_, token) => {
    localStorage.setItem('token', token);
    return token;
  })
  .reset(logout);

logout.watch(() => {
  localStorage.removeItem('token');
});