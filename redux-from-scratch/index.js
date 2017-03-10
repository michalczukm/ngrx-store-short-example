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
const store$ = action$
    .flatMap((action) => action instanceof Rx.Observable ? action : Rx.Observable.from([action]))
    .startWith(initialState).scan(reducer);

// action dispatcher
const actionDispatcher = (func) => (...args) => {
    const action = func.call(null, ...args);

    action$.next(action);

    if (action.payload instanceof Rx.Observable) {
        action$.next(action.payload);
    }

    return action;
};

// actions
const addItemAction = actionDispatcher((payload) => {
    return {type: 'ADD_ITEM', payload};
});

const loadItems = actionDispatcher(() => {
    return {
        type: 'ITEMS_LOADING',
        payload: Rx.Observable
            .ajax({
                url: 'http://localhost:3210/items',
                crossDomain: true
            })
            .map(({response}) => response.map(x => x.name))
            .map((items) => ({
                type: 'ITEMS_LOADED',
                payload: items
            }))
    };
});