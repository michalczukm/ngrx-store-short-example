'use strict';

$(() => {
    let $list = $('#todo-list');

    store$.subscribe((state) => {
        $list.empty();
        state.forEach((item) => {
            $('<li/>').text(item).appendTo($list);
        });
    });

    loadItems();
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

// action dispatcher
const actionDispatcher = (func) => (...args) => {
    return action$.next(func(...args));
};

// actions
const addItemAction = actionDispatcher((payload) => {
    return { type: 'ADD_ITEM', payload };
});

const loadItems = actionDispatcher(() => {
    return {
        type: 'ITEMS_LOADED',
        payload: Rx.Observable.from(['one', 'two', 'three'])
    };
});