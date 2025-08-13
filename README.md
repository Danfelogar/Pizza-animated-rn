

# PizzaAnimatedRN

Animated pizza builder app made with React Native, TypeScript and Zustand. Create, customize and animate your pizza with drag & drop ingredients and smooth transitions.

## Setup Environment

Project created with React Native CLI. [See official docs](https://reactnative.dev/docs/environment-setup) to set up the environment.

### Run

**Install dependencies**
```bash
npm i
```

**Install IOS Pods**
Navigate to the ios folder:
```bash
cd ios
```
Install Bundler and iOS dependencies:
```bash
bundle exec pod install
```

**Run project**
```bash
npm start
```

**Run IOS**
```bash
npm run ios
```

**Run Android**
```bash
npm run android
```

### 🛠 Tech and Libraries

- [React Native](https://reactnative.dev/) - Mobile app framework
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed JS
- [React Navigation](https://reactnavigation.org/) - Routing and navigation
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Animated API](https://reactnative.dev/docs/animated) - Animations

# Link-video-demo-app

[![Alt text](https://img.youtube.com/vi/S9SyEZDpR38/0.jpg)](https://www.youtube.com/watch?v=S9SyEZDpR38)

### Project Architecture

```bash
.
├── App.tsx
├── Gemfile
├── Gemfile.lock
├── README.md
├── app.json
├── babel.config.js
├── gesture-handler.js
├── gesture-handler.native.js
├── index.js
├── jest.config.js
├── metro.config.js
├── package.json
├── tsconfig.json
├── src
│   ├── index.ts
│   ├── assets
│   │   ├── box_front.png
│   │   ├── box_inside.png
│   │   ├── chili_unit.png
│   │   ├── chili.png
│   │   ├── dish.png
│   │   ├── mushroom_unit.png
│   │   ├── mushroom.png
│   │   ├── olive_unit.png
│   │   ├── olive.png
│   │   ├── onion.png
│   │   ├── pea_unit.png
│   │   ├── pea.png
│   │   ├── pickle_unit.png
│   │   ├── pickle.png
│   │   ├── pizza-0.png
│   │   ├── pizza-1.png
│   │   ├── pizza-10.png
│   │   ├── pizza-2.png
│   │   ├── pizza-3.png
│   │   ├── pizza-4.png
│   │   ├── pizza-5.png
│   │   ├── pizza-6.png
│   │   ├── pizza-8.png
│   │   ├── pizza-9.png
│   │   ├── potato_unit.png
│   │   ├── potato.png
│   │   └── ...
│   ├── components
│   │   ├── BenchOfPizza.tsx
│   │   ├── BtnLinearGradient.tsx
│   │   ├── DragDropIngredients.tsx
│   │   ├── FlatListPizzas.tsx
│   │   ├── Header.tsx
│   │   ├── IngredientCard.tsx
│   │   ├── PizzaCard.tsx
│   │   ├── StandardWrapper.tsx
│   │   └── index.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── useBenchOfPizza.ts
│   │   ├── useBenchOfPizzaAnimation.ts
│   ├── screen
│   │   ├── index.ts
│   │   ├── NavigationRoot.tsx
│   │   ├── PizzaDetails.tsx
│   │   ├── PizzaList.tsx
│   ├── store
│   │   ├── globalStore.ts
│   │   └── index.ts
│   ├── types
│   │   ├── extraIngredient.ts
│   │   ├── globalStore.ts
│   │   ├── index.ts
│   │   ├── navigation.ts
│   │   └── pizzas.ts
│   ├── utils
│   │   ├── colors.ts
│   │   ├── extraIngredients.ts
│   │   ├── getPizzaById.ts
│   │   ├── getPriceEnUsd.ts
│   │   ├── index.ts
│   │   ├── phoneDimensions.ts
│   │   ├── pizzas.ts
│   │   └── pizzaSize.ts
└── ...
```

## Solution to problem when running vector-icons script on iOS
```command terminal
node --experimental-require-module ./node_modules/@react-native-vector-icons/common/lib/commonjs/scripts/updatePlist.js package.json ios/rnPizzaAnimated/Info.plist
```