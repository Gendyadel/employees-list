import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from '../filter.state';
export const selectFilterState = createFeatureSelector<FilterState>('filter');

export const selectCount = createSelector(
    selectFilterState,
    (state: FilterState) => state.results.length
);

export const selectFilterResults = createSelector(
    selectFilterState,
    (state: FilterState) => state.results
);

