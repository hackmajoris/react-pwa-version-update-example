import { useState, useCallback, useEffect } from "react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
export const useServiceWorker = () => {
    const [waitingWorker] = useState<ServiceWorker | null>(null);

    const [showReload, setShowReload] =useState<boolean>(false);
    // called when a service worker
    // updates. this function is a callback
    // to the actual service worker
    // registration onUpdate.
    const onSWUpdate = useCallback(async (registration: ServiceWorkerRegistration) => {
        // We want to run this code only if we detect a new service worker is
        // waiting to be activated.
        // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
        if (registration?.waiting) {
            await registration.unregister();
            registration.waiting.addEventListener('statechange', (event) => {
                const sw = event?.target as ServiceWorker;
                if (sw.state === 'activated') {
                    // Once the service worker is unregistered, we can reload the page to let
                    // the browser download a fresh copy of our app (invalidating the cache)
                    window.location.reload();
                }
            });
            // Makes Workbox call skipWaiting() that will trigger upper listener
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

    }, []);
    // simply put, this tells the service
    // worker to skip the waiting phase and then reloads the page
    const reloadPage = useCallback(() => {
        waitingWorker?.postMessage({ type: "SKIP_WAITING" });
        setShowReload(false);
    }, [waitingWorker]);
    // register the service worker
    useEffect(() => {
        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://cra.link/PWA
        serviceWorkerRegistration.register({
            onUpdate: onSWUpdate,
        });
    }, [onSWUpdate]);
    return { showReload, waitingWorker, reloadPage };
};