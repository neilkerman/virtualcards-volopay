# Virtual Cards - Volopay Assignment

Virtual Cards is a *React and Tailwind* based project done as a part of Volopay hiring process. 

Demo link: https://virtualcards-volopay.netlify.app/

### How to set up the project

This project can be set up using two methods, namely:
1. Normal setup: Using just `npm install`
2. Docker method

#### Normal setup
1. Clone the project from `https://github.com/neilkerman/virtualcards-volopay.git`
2. cd into the directory, which is by default `virtualcards-volopay`
3. Run `npm install`
4. Run `npm start` to spin up a local development server

#### Docker method
1. Clone the repository as mentioned in the normal setup step 1
2. Run `docker-compose up`. In case you would want to keep it running, run it as detached mode using `docker-compose up -d`
3. Open browser and go to `http://localhost:3000`.

### Disclaimer
- I have used `glitch.com` to host the API server. Glitch.com sleeps the server when it goes inactive, hence it takes a few moments for it to spin back up. So as you run the project for the very first time, it will take a while to load.
- I have included docker because I have used the very latest version of React, which may or may not be installed in your system. However, normal method is the fastest in terms of build time.
- Icons and colours are not exactly matched, I did not have the information as to which icons were used in the mock-up.