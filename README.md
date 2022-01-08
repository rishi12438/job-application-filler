# Job-app-extension

## Team members
1. Rishi
2. Abhishek
3. Samuel

## Inspiration
Tired of filling job applications and entering the same data again and again? Jobify will save your time. Fill once, forget about it. It's that easy!

## What it does
Jobify uses adaptive learning to learn users' profile and subsequently tries to auto-fill job applications for users. It supports 4 major job portals - myworkdayjobs, greenhouse.io, jobs.lever.io, uber.com. All data are only stored locally on users' machine as we value our users' privacy. This frees users from the hassle of manually filling job applications over and over again!

## How we built it
The front end (chrome extension) was developed using JavaScript. Bootstrap was adopted for design to give users a pleasant and consistent UI/UX.

Novel adaptive learning algorithms were implemented in JavaScript with JQuery library in the backend so that Jobify smartly learns users' profiles an.

## Challenges we ran into
1. Clever techniques had to be adopted to identify all the different `id`s corresponding to different input fields in different job application platforms.
2. Drop Downs on job application platforms were difficult to deal with during auto-filling process.
2. Ensuring websites were able to detect the clicks by our extension.
3. Developing the adaptive learning algorithm to suit our use case.

## Accomplishments that we're proud of
1. As students, we ourselves have faced the hassle of filling up the same information over and over for job applications. 
2. Our project turned out highly functional with a good user experience and we are definitely going to use this to auto-fill our job applications in the future.
3. It saves significant time for students and enables students to apply for more jobs as well.
4. Watching our novel adapative learning algorithm work efficiently with high accuracy is definitely satisfying.

## What we learned
1. Developing chrome extensions through this project
2. Importance of good coding practises (especially when working under tight deadlines in a team)
3. Importance of a solid algorithm to perform adaptive learning (choosing the right data structure)
4. Logic to autofill forms using JQuery

## What's next for Jobify
1. Support more job portals.
2. More refined UI
3. Automatic CV generation for job application
4. Alerting users when there are suitable new jobs for them
