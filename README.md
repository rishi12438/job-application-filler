# job-autofiller

## Load Chrome extension
```
1. Go to chrome://extensions/
2. Developer mode: on
3. Load unpacked
```

## Sites supported
- `https://boards.greenhouse.io/*`
- `https://jobs.lever.co/*`
- `https://www.uber.com/*`

## How to use
Edit the values on `data.json` and add new entries when necessary. The `sites.json` file contains the hostnames that are supported by this extension and the values that can be autofilled. The input value in `sites.json` is mapped to the value provided in `data.json`.

When you are on the supported sites, it will automatically trigger the script and edit the DOM content.

🍻# Job-app-extension (Jobify)

## Team members
1. Rishi
2. Abhishek
3. Samuel

## Inspiration
Tired of filling job applications and entering the same data again and again? Jobify will save your time. Fill once, forget about it. It's that easy!

## How to use it
### Loading the Chrome Extension 
```
1. Go to chrome://extensions/
2. Developer mode: on
3. Load unpacked

Edit the values on `data.json` and add new entries when necessary. The `sites.json` file contains the hostnames that are supported by this extension and the values that can be autofilled. The input value in `sites.json` is mapped to the value provided in `data.json`.

When you are on the supported sites, it will automatically trigger the script and edit the DOM content.
```

## What it does
Jobify uses adaptive learning to learn users' profile and subsequently tries to auto-fill job applications for users. It supports 4 major job portals. All data are only stored locally on users' machine as we value our users' privacy. This frees users from the hassle of manually filling job applications over and over again!

### Sites Supported
- `https://boards.greenhouse.io/*`
- `https://jobs.lever.co/*`
- `https://www.uber.com/*`
- `https://myworkdayjobs.com/*`

## How we built it
The front end (chrome extension) was developed using JavaScript. Bootstrap was adopted for design to give users a pleasant and consistent UI/UX.

Novel adaptive learning algorithms were implemented in JavaScript with JQuery library in the backend so that Jobify smartly learns users' profiles and removes away the need to rely on hardcoding.

## Challenges we ran into
* Clever techniques had to be adopted to identify all the different `id`s corresponding to different input fields in different job application platforms.
* Drop Downs on job application platforms were difficult to deal with during auto-filling process.
* Ensuring websites were able to detect the clicks by our extension.
* Developing the adaptive learning algorithm to suit our use case.

## Accomplishments that we're proud of
* As students, we ourselves have faced the hassle of filling up the same information over and over for job applications. 
* Our project turned out highly functional with a good user experience and we are definitely going to use this to auto-fill our job applications in the future.
* It saves significant time for students and enables students to apply for more jobs as well.
* Watching our novel adapative learning algorithm work efficiently with high accuracy is definitely satisfying.

## What we learned
* Developing chrome extensions through this project
* Importance of good coding practises (especially when working under tight deadlines in a team)
* Importance of a solid algorithm to perform adaptive learning (choosing the right data structure)
* Logic to autofill forms using JQuery

## What's next for Jobify
1. Support more job portals.
2. More refined UI
3. Automatic CV generation for job application
4. Alerting users when there are suitable new jobs for them

Enjoy using Jobify! 🍻
