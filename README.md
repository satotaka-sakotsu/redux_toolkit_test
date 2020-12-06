# Redux Toolkitの試用

## About
[CAeate React App]](https://github.com/facebook/create-react-apphttps
://github.com/facebook/create-react-app)
を利用して、[Redux Toolkit](https://redux-toolkit.js.org/) を試す用のリポジトリ

下記コマンドでredux-toolkit導入済み & typescriptの環境が作られる。

```
$ npx create-react-app redxd_toolkit_tset --template redux-typescript  
```

## Usage
Conuterアプリがサンプルとして構築済みのため、Todoアプリを追加する形にした。
redux-toolkitは非同期処理のミドルウェアとして `redux-thunk` をデフォルトで採用しているため、
[json-server](https://www.npmjs.com/package/json-server) で簡易的なAPI
を作って、非同期処理を試せるようにした。

開発環境を立ち上げる際はjson-serverも立ち上げる。

```
// アプリサーバーを起動
$ npm start

// API用のjson-server起動
$ npx json-server --watch db.json
```

## ディレクトリ構成について
redux-toolkitは、機能単位でディレクトリを設けるre-ducksパターンに似た構成になっている。  
また、定型的な記述が多くなりがちな
action creator, action types(constants), reducers
の記述を省略できるようにする
[createSlice](https://redux-toolkit.js.org/usage/usage-with-typescript#createslice)
という関数を提供しているため、コード量が少なくなる。 
  
デフォルトだと下記のような構成になっている。

src/
  ┣ app/
  ┃  ┗ store.js
  ┣ features/
  ┃  ┗ counter
  ┃    ┣ Counter.tsx
  ┃    ┗ counterSlice.ts
  ┣ App.tsx
  ┗ index.ts

機能単位のディレクトリ、その中にコンポーネントと先述のロジックが記載されたsliceというファイルが存在する。
  
ducksパターンのようにロジックがsliceファイルに集約されて、複数ファイルを開かなくてよくなっている。  
ただ、sliceファイルが太ってきた時に見通しが悪くなると想定されるため、適宜別ファイルに切り出していくのが望ましそう。  

- slice
- reducer
- operation ... 非同期処理
- selector ... storeから取り出すstateをcomponent用に整形
- type ... 型定義
- その他、constants, stateなど

