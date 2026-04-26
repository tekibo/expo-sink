<div align="center">

<img src="./assets/images/icon.png" alt="Expo Logo" width="80" height="80" />

# 🚰 ExpoSink

**The Ultimate "Kitchen Sink" Dev Client for Mac-Free iOS Development.**

[![Expo SDK](https://img.shields.io/badge/Expo_SDK-55-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f6&logoColor=000000)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.83.6-61DAFB.svg?style=flat-square&logo=react)](https://reactnative.dev/)
[![Build Status](https://img.shields.io/github/actions/workflow/status/YOUR_USERNAME/exposink/dev-client.yml?style=flat-square&logo=github&label=IPA%20Build)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<p align="center">
  Bypass the Apple ecosystem tax. Hot-reload heavy native modules (Camera, SQLite, AI, Reanimated) instantly on Windows and Linux without waiting for cloud CI builds.
</p>

---
</div>

## 🚀 What is ExpoSink?

Building iOS apps on Windows or Linux usually means relying on cloud CI pipelines (like EAS or GitHub Actions) every time you add a native module. This turns a 5-second hot-reload into a 20-minute waiting game.

**ExpoSink** solves this. It is a massive, pre-compiled Custom Development Client containing virtually every major native Expo and React Native module available. 

By sideloading this single app onto your iPad/iPhone, you create a "Super Expo Go." You can rapidly prototype multiple different applications using your local machine's Metro Bundler, accessing hardware sensors, databases, and AI models instantly.

## 📦 What's Inside?
ExpoSink is heavily armed for SDK 55. Key baked-in native capabilities include:
* **Core Systems:** `react-native-reanimated` (v4), `react-native-mmkv`, `react-native-nitro-modules`
* **Local AI:** `@react-native-ai/apple`, `llama.rn`
* **Hardware:** Camera, Location, Haptics, Audio, Video, Local Authentication (FaceID)
* **Data & Networking:** SQLite, File System, Secure Store, Background Tasks
* **Monetization:** RevenueCat (`react-native-purchases`)

## 🛠️ Getting Started

### 1. Install ExpoSink on your device
1. Go to the [Releases](#) page of this repository and download the latest `expo-sink-unsigned.ipa`.
2. Connect your iOS device to your PC.
3. Open [Sideloadly](https://sideloadly.io/) and drag the `.ipa` into the UI.
4. Enter your Apple ID (used only for generating a free 7-day development certificate) and click Start.
5. On your device, go to **Settings > General > VPN & Device Management**, tap your Apple ID, and trust the app.

### 2. Develop your actual apps!
You never need to code inside the ExpoSink repository. Go to the separate app you are actually building and start your local server:

```bash
npx expo start --dev-client
```

Open **ExpoSink** on your iOS device, scan the QR code in your terminal, and enjoy instant hot-reloading with full native module support.

---

## 🔗 Handling Deep Links & Schemes

Because you are running your app *inside* the ExpoSink shell, your app will temporarily inherit ExpoSink's Bundle ID (`com.tekibo.exposink`) and Scheme (`exposink://`). 

To prevent this from breaking your OAuth logins (Google, Apple) or Deep Links when you eventually compile your app for production, use a dynamic environment utility.

### Setup

Drop this `env.ts` file into your project's `utils` or `constants` folder:

```typescript
// utils/env.ts

/**
 * Dynamically resolves the active scheme and bundle ID.
 * When running locally via ExpoSink, it uses the sink credentials.
 * When built for production via EAS, it uses the app's real credentials.
 */
export const Env = {
  isDevClient: __DEV__,
  
  // The URI scheme used for deep linking and OAuth redirects
  scheme: __DEV__ ? 'exposink' : 'com.yourrealapp.prod',
  
  // The iOS Bundle Identifier
  bundleId: __DEV__ ? 'com.tekibo.exposink' : 'com.yourrealapp.prod',
  
  /**
   * Generates a fully qualified redirect URI for OAuth providers.
   * @example Env.getRedirectUri('oauth/callback')
   */
  getRedirectUri: (path: string) => {
    const base = __DEV__ ? 'exposink' : 'com.yourrealapp.prod';
    return `${base}://${path}`;
  }
};
```

### Usage Example
Whenever you configure an OAuth provider or a Deep Link listener, use the utility instead of hardcoding strings:

```typescript
import { Env } from '@/utils/env';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

const redirectUri = AuthSession.makeRedirectUri({
  scheme: Env.scheme,
  path: 'auth/callback'
});
```

*Note: You only need to whitelist `com.tekibo.exposink` once in your Google Cloud / Apple Developer consoles, and it will work for every app you prototype using ExpoSink!*

---

## 🏗️ Rebuilding ExpoSink

You only need to rebuild ExpoSink if:
1. You upgrade to a new Expo SDK version (e.g., SDK 56).
2. You need a completely new native library that requires `pod install`.

**To trigger a build:**
Navigate to the **Actions** tab in this repository, select the `iOS Dev Client Builder` workflow, and click **Run Workflow**. The Action utilizes macOS runners to execute a clean pod install and compiles a new, un-signed Debug `.ipa` in about 40 minutes.

---
<div align="center">
<i>Built for speed. Designed to keep developers out of CI pipelines.</i>
</div>
