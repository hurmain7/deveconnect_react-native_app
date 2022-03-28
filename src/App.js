import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from './state/store';
import { Routes } from "./navigation";
import { loadAuthenticatedUser } from './state/actions/auth';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import setAuthToken from "./utils/setAuthToken";


export const { store, persistor } = reduxStore();


const App =   () => {
   
    // useEffect(()=> {


    //      store.dispatch(loadAuthenticatedUser())
    // }, [])

    return (
<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes/>
        </PersistGate>
    </Provider>
    )
}

export default App;