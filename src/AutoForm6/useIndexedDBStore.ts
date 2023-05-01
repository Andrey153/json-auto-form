import { useEffect, useState } from 'react';

type IndexedDBState<T> = [T, (newValue: Partial<T>) => void];

type UseIndexedDBStoreType<T> = {
  dbName: string;
  storeName: string;
  key: string;
  initialState: T;
};

export function useIndexedDBStore<T>({
  dbName,
  storeName,
  key,
  initialState,
}: UseIndexedDBStoreType<T>): IndexedDBState<T> {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    const dbPromise = indexedDB.open(dbName, 1);

    dbPromise.onupgradeneeded = function () {
      const db = dbPromise.result;
      db.createObjectStore(storeName, { keyPath: 'key' });
    };

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;

      db.onversionchange = function () {
        db.close();
        console.log('Database is outdated, please reload the page.');
      };

      // retrieve state
      const readTransaction = db.transaction(storeName, 'readonly');
      const readStore = readTransaction.objectStore(storeName);
      const request = readStore.get(key);
      request.onsuccess = function () {
        if (request.result) {
          setState({ ...state, ...request.result.value, readFromStorage: true });
        } else {
          setState({ ...state, readFromStorage: true });
        }
      };
      db.close();
    };

    dbPromise.onerror = function () {
      setState({ ...state, errorReadFromStorage: true });
      console.log('Error opening indexDB:', dbPromise.error);
    };
  }, []);

  const updateState = (value: Partial<T>) => {
    const newValue = { ...state, ...value };

    setState(newValue);

    const dbPromise = indexedDB.open(dbName, 1);

    dbPromise.onsuccess = function () {
      const db = dbPromise.result;

      db.onversionchange = function () {
        db.close();
        console.log('Database is outdated, please reload the page.');
      };

      // save state
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      store.put({ key, value: newValue });
    };

    dbPromise.onerror = function () {
      console.log('Error opening indexDB:', dbPromise.error);
    };
  };

  return [state, updateState];
}
