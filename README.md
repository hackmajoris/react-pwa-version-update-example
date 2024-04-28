# Description
This is an example of a PWA (Progressive Web App) built with React, which utilizes Service Workers to update itself whenever a new version is deployed, and the app is installed locally on the device.
To test the Service Worker, the app should be deployed to a remote server. 
Service Worker registration does not work on localhost. 
Therefore, a production build should be deployed to a remote host using a HTTPS connection

# Steps to test
1. Deploy the app as it is.
2. Install PWA locally on device and leave the app opened.
3. Made some changes in the `App.tsx` file, html based.
4. Deploy new build.
5. Check that the locally installed app reflects the changes from the new build