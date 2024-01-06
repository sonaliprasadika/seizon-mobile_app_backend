# seizon-mobile_app_backend
## Project Abstract
The Mobile application aims to reshape perceptions of a sedentary lifestyle. Developed within a software project course, the initiative blends creative ideas, cutting-edge technology, and adept project management. Notable features encompass personalized avatars, standing goals, smartwatch integration, and gamification elements. React Native is used for fronend implementation, while the backend, hosted on AWS, utilizes Node.js. Thorough research outlines mobile app-smartwatch integration, supported by an ER diagram for robust database models. Backend development prioritizes maintainability and scalability, and unit tests enhance application resilience. The UI design, realized through Figma, and the user flow contribute to a holistic project approach, with valuable insights shared for continuous improvement.

## Data flow
### Goals Setting: Allows users to set daily and weekly standing goals.
- Create a goal - Create goal UI → create goal button → (POST) /api/goal
- Update created goal - Update goal UI → edit goal button → (POST) /api/goal/:id
- Get created goal and show - Goal UI → fetch with UI load → (GET) /api//goals-by-user
### Challenges
- Set daily and weekly challenges. E.g., "Stand for a total of 4 hours today" or "Stand for 10 minutes every hour".
- There are three different challenges: Level Challenge, Common Challenge, and Friend Challenge
### Levels
- The more users stand, the more levels they advance. Each level unlocks new challenges, avatar upgrades, and other rewards.
## Tech
This software uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework

## Installation
Install the dependencies and devDependencies and start the server for backend application. Following command will start server with port 8081.

```sh
npm i
npm run dev
```

You can find swagger generated API documentation from below url 

```sh
http://localhost:8081/api-docs
```
## Setup Database
### Generate account credentials in firestore

To generate API credentials, navigate to the "Service account" tab in Project Settings in Firestore. Then generate a new private key. Save the generated key in JSON format. It's recommended to keep this file in the same location as the database backup file.

### Install firsetore-import-export package

To import a database using a provided database backup file, the node-firestore-import-export package is needed. Install this package using the following command:
```sh
npm install -g node-firestore-import-export
```
###  Import Database using database.json file

Navigate to the file location of database.json and open a command prompt. Run the following command:
```sh
firestore-import --accountCredentials <privateKey>.json --backupFile database.json
```
Replace <privateKey> with the actual file name given in step 1.

## API Documentation
https://unioulu-my.sharepoint.com/:b:/g/personal/sliyanab23_student_oulu_fi/EewT4AL9Rn1BklPn2wDNe3wB0-2lR_Jvj4QY5UACWJkHmg?e=DBj3Xm
