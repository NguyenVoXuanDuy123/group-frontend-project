import { ReactionType } from "@/enums/post.enums";

// helpers/indexedDB.ts
const dbName = "ReactionsDB";
const storeName = "offlineReactions";

const request = indexedDB.open(dbName, 1);

request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
  const db = (event.target as IDBOpenDBRequest).result;
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, { keyPath: "id" });
  }
};

request.onsuccess = () => {
  console.log("Database initialized successfully.");
};

request.onerror = (event: Event) => {
  console.error(
    "Error initializing database:",
    (event.target as IDBOpenDBRequest).error
  );
};

type OfflineReaction = {
  id: string;
  type: ReactionType | "UNREACT";
  isComment: boolean;
};

export const saveReactionToIndexedDB = (offlineReaction: OfflineReaction) => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      store.put(offlineReaction);
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event: Event) =>
        reject((event.target as IDBRequest).error);
    };
    request.onerror = (event: Event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
};

export const getOfflineReactionsFromIndexedDB = () => {
  return new Promise<Array<OfflineReaction>>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = (event: Event) =>
        reject((event.target as IDBRequest).error);
    };
    request.onerror = (event: Event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
};

export const clearIndexedDB = () => {
  return new Promise<void>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      store.clear();
      transaction.oncomplete = () => resolve();
      transaction.onerror = (event: Event) =>
        reject((event.target as IDBRequest).error);
    };
    request.onerror = (event: Event) =>
      reject((event.target as IDBOpenDBRequest).error);
  });
};
