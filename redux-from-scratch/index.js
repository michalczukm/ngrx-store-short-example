'use strict';

$(() => {
    let $list = $('#todo-list');

    store.getItems()
        .subscribe((state) => {
            $list.empty();
            state.items.forEach((item) => {
                $('<li/>').text(item).appendTo($list);
            });
        });

    store.getIsLoading()
        .subscribe((state) => {
            $('#load-indicator').toggle(state.isLoading)
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
            return Object.assign({}, state, {
                items: [...state.items, action.payload]
            })
        }
        case 'ITEMS_LOADED': {
            return Object.assign({}, state, {
                isLoading: false,
                items: action.payload
            });
        }
        case 'ITEMS_LOADING': {
            return Object.assign({}, state, {
                isLoading: true
            });
        }
        default:
            return state;
    }
};

// initial state
const initialState = {items: [], isLoading: false};

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
            .delay(new Date(Date.now() + 1000))
            .map(({response}) => response.map(x => x.name))
            .map((items) => ({
                type: 'ITEMS_LOADED',
                payload: items
            }))
    };
});

const store = {
    getItems: () => store$
        .distinctUntilChanged((previous, current)=> previous.items === current.items),
    getIsLoading: () => store$
        .distinctUntilChanged((previous, current)=> previous.isLoading === current.isLoading)
};