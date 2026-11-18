# Carely

Carely is a Next.js outpatient appointment web app. It is currently a
TypeScript web application, not a React Native project or a native Android
project.

## Development

Install dependencies and run the checks:

```bash
npm ci
npm run data:validate
npm run check
npm run build
```

Start the local web app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Android development

The current app is compatible with Android through a mobile browser. It does
not contain React Native files, an Android Gradle project, or a native APK
target. Android Studio, `adb`, and an emulator are therefore not part of this
repository yet.

To test the responsive app from an Android device on the same network:

```bash
npm run dev:android
```

Then open the host machine's LAN address on the device, for example
`http://192.168.1.10:3000`. If native Android support is required later,
create a separate Expo/React Native client rather than mixing native files into
this Next.js app.

## Dataset import

The demo appointment dataset is stored in `data/demo-appointments.json`,
imported by the home dashboard, and validated with Python:

```bash
npm run data:validate
```

Python is used only for dataset validation; application code remains
TypeScript.
