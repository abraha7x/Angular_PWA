// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Se agrega congiguracion con json de firebase.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAcD6iX7eguGJRVoC7H4rU569mIvvIgaPo',
    authDomain: 'mark1-pwa.firebaseapp.com',
    databaseURL: 'https://mark1-pwa.firebaseio.com',
    projectId: 'mark1-pwa',
    storageBucket: 'mark1-pwa.appspot.com',
    messagingSenderId: '146678489110'
  }
};
