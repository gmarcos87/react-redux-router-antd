import { all } from "@redux-saga/core/effects";

let sagasSubscripted = [];

export const subscribeSagas = (sagas = []) => {
    sagasSubscripted = [
        ...sagasSubscripted, 
        ...sagas
    ]
}

export default function* rootSaga () {
    yield all(sagasSubscripted)
}

