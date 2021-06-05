import { createAction, props } from "@ngrx/store";

export const getTheme = createAction('[App] theme/get');
export const setTheme = createAction('[App] theme/set', props<{ theme: string }>());
