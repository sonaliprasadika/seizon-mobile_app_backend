# seizon-mobile_app_backend
## Project Abstract
The Seizon project, led by Ikune Labs, a venture aiming to reshape perceptions of a sedentary lifestyle. Developed within a software project course, the initiative blends creative ideas, cutting-edge technology, and adept project management. Notable features encompass personalized avatars, standing goals, smartwatch integration, and gamification elements. React Native is used for fronend implementation, while the backend, hosted on AWS, utilizes Node.js. Thorough research outlines mobile app-smartwatch integration, supported by an ER diagram for robust database models. Backend development prioritizes maintainability and scalability, and unit tests enhance application resilience. The UI design, realized through Figma, and the user flow contribute to a holistic project approach, with valuable insights shared for continuous improvement.

## Data flow
### Goals Setting: Allows users to set daily and weekly standing goals.
- Create a goal - Create goal UI → create goal button → (POST) /api/goal
- Update created goal - Update goal UI → edit goal button → (POST) /api/goal/:id
- Get created goal and show - Goal UI → fetch with UI load → (GET) /api//goals-by-user
### Challenges
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

