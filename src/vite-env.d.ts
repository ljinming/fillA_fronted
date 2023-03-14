/// <reference types="vite/client" />

declare global {
    interface window {
        ethereum: any;
    }
}
interface Window {
    ethereum:any
};

declare module 'react-twitter-share-link';