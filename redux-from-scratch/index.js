'use strict';

$(() => {
    let $list = $('#todo-list');

    store$.subscribe((state) => {
        $list.empty();
        state.forEach((item) => {
            $('<li/>').text(item).appendTo($list);
        });
    });

    loadItems(['one', 'two', 'three']);
});

const addItem = (event) => {
    let $newItem = $('#new-item');

    let todoItem = $newItem.val();
    $newItem.val('');

    addItemAction(todoItem);
};

// actions stream
const action$ = new Rx.Subject();

// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            return [...state, action.payload];
        }
        case 'ITEMS_LOADED': {
            return action.payload;
        }
        default:
            return state;
    }
};

// initial state
const initialState = [];

// store
const store$ = action$.startWith(initialState).scan(reducer);

// action dispacher
const actionDispacher = (func) => (...args) => {
    return action$.next(func(...args));
};

// actions
const addItemAction = actionDispacher((payload) => {
    return { type: 'ADD_ITEM', payload };
});

const loadItems = actionDispacher((payload) => {
    return { type: 'ITEMS_LOADED', payload };
});