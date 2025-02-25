"use client";

import { useRef, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore, AppStore } from "./store";
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<{ store: AppStore; persistor?: ReturnType<typeof persistStore> } | null>(null);
    const [hydrated, setHydrated] = useState(false);

    if (!storeRef.current) {
        const store = makeStore();
        storeRef.current = { store, persistor: undefined };
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            storeRef.current!.persistor = persistStore(storeRef.current!.store);
            setHydrated(true);
        }
    }, []);

    return (
        <Provider store={storeRef.current.store}>
            {hydrated && storeRef.current.persistor ? (
                <PersistGate loading={null} persistor={storeRef.current.persistor}>
                    {children}
                </PersistGate>
            ) : (
                children
            )}
        </Provider>
    );
}
