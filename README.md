# Tena360 AI Mobile

Frontend-only hackathon MVP for an AI-powered Ethiopian wellness app. The app runs without a backend and stores demo data locally with AsyncStorage.

## Features

- Local user registration and login
- Health profile onboarding
- Ethiopian food meal-plan generator
- Budget nutrition optimizer
- Nutrition score from 0-100
- Stress assessment and local history
- Local AI-style wellness assistant
- Animated 4-4-6 breathing exercise
- Dashboard with meal plan, stress score, and recommendations

## Mobile App

```bash
cd frontend
npm install
npm run start
```

Then open the Expo app on Android, iOS, or web.

## Data Mode

No server is required. The app saves local demo data on the device:

```text
AsyncStorage
```

The Ethiopian food dataset is in:

```text
frontend/src/data/ethiopianFoods.ts
```

## Folder Structure

```text
frontend/
  App.tsx
  app.json
  package.json
  src/
    components/
    data/
    hooks/
    navigation/
    screens/
    services/
    store/
    types/
    utils/
```
