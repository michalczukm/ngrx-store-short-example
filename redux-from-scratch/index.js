'use strict';

$(() => {
    let $list = $('#todo-list');

    store$.subscribe((state) => {
        $list.empty();
        state.forEach((item) => {
            $('<li/>').text(item).appendTo($list);
        });
    });
});

const addItem = (event) => {
    let $newItem = $('#new-item');

    let todoItem = $newItem.val();
    $newItem.val('');

    addItemAction(todoItem);
};

// actions stream
const action$ = new Rx.Subject();

// initial state
const initialState = [];

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            return [...state, action.payload];
        }
        default:
            return state;
    }
};

// store
const store$ = action$.startWith(initialState).scan(reducer);

// action dispacher
const actionDispacher = (func) => (...args) => {
    action$.next(func(...args));
};

// actions
const addItemAction = actionDispacher((payload) => ({
    type: 'ADD_ITEM',
    payload
}));