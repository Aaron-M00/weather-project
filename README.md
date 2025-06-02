# Weather Forecast App 🌦️

A full-stack weather forecast application that allows users to search for weather conditions by city or coordinates. The app uses AWS Lambda as a backend proxy to securely fetch data from the OpenWeatherMap API and displays weather details in a modern Vite + React frontend.

## Features

- 🔍 Search weather by city name or geolocation (latitude & longitude)
- 🎨 Animated and themed UI using TailwindCSS and Framer Motion
- 🔐 Backend API key is hidden and securely called via AWS Lambda
- 🧪 Unit tests for Lambda using Jest
- ☁️ Weather icons and dynamic background themes

---

## Tech Stack

### Frontend
- Vite + React
- TypeScript
- TailwindCSS
- Framer Motion
- Lucide-react

### Backend
- AWS Lambda (Node.js + TypeScript)
- OpenWeatherMap API
- Jest (for unit testing)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Aaron-M00/weather-project.git
cd weather-project
```

---

### 2. Set Up Backend (AWS Lambda)

```bash
cd backend-lambda
npm install
npx tsc
```
- Deploy to AWS using the AWS CLI:

First create function on AWS console and then run these commands

```bash
cd distzip -r ../function.zip *
cd ..                              
aws lambda update-function-code \
  --function-name weather-api \
  --zip-file fileb://function.zip
```

- Config the env varibale

```bash
aws lambda update-function-configuration \
  --function-name weather-api \
  --environment Variables="{WEATHER_API_KEY=your_api_key}"

```

---

### 3. Run Frontend Locally

See env example file and dd the API url and you also have to set vite.config.ts to fetch data from api due to CORS.

```bash
cd frontend-app
npm install
npm run dev
```


---

## Testing

```bash
cd backend-lambda
npm run test
```

---

## Deployment 

- Frontend is hosted using Vercel [Frontend App](https://weather-project-two-iota.vercel.app/)
- Backend lambda is deployed using with API Gateway. [AWS lambda api](https://q3tfjw5z14.execute-api.us-east-1.amazonaws.com/default/weather-api)

---
