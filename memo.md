# redux復習
https://qiita.com/kitagawamac/items/d769c85f446994349b52

## データフロー
1. component  
event発行->actionCreatorをstoreにdispatch  
2. action creator  
actionを発行  
3. action  
typeとpayloadをreducerに渡す  
4. store e.g. dispatch(actionCreator(payload))  
5. reducer  
actionとcurrent stateからnext stateを返す  
6. store  
next stateがcurrent stateとして保持される  

## 3原則
1. Single source of truth  
アプリケーションが参照するStoreは1つ  
2. State is read-only  
componentからはstateを参照するのみ  
stateの更新は、actionをstoreにdispatchすることでしかできない  
current state + action = next state  
3. Mutations are written as pure functions  
stateを更新するreducerのロジックは冪等的である  

## TIPS
- reducer composition  
データを分割するときはstoreでなくreducerを分割の単位とする  
親reducerにてcombine reducerを利用して、子reducerをまとめる  
- container presentational component  
fluxと同様にcontainerコンポーネントのみreduxを参照することができる  
readはcontainerのみでwrite(dispatch)はpresentationalから行う  
- bindActionCreator  
actionの作成とdispatchまで行う関数を作る  
(必須ではなく、都度dispatchしても良い)  
- mapStateToProps, mapDispatchToProps  
connectする際にcomponentとprops, dispatcher(action x dispatch)のインターフェースを揃えるための関数  

## コード
1. react x redux  
マウントする起点ファイルでstoreを作成、containerコンポーネントとProviderでつなぐ  

```
render(
  <Provider store={store}>
    <App />
  <Provider/>,
  rootElement
)
```

2. connect  
storeからcontainerコンポーネントにpropsを流す  
selectorはstoreStateをコンポーネントで利用できるpropsとして整形する関数 (mapStateToProps, mapDispatchToProps)  

```
const selectTodos = (todos, filter) => {
  switch (filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(todo => todo.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(todo => !todo.completed);
  }
};

const selector = storeState => {
  const visibilityFilter = storeState.visibilityFilter;
  const visibleTodos = selectTodos(
    storeState.todos,
    visibilityFilter
  );

  return {
    visibleTodos,
    visibilityFilter
  };
};

// connectはcurry化されている
connect(selector)(App)
```

## react x redux boilerplate
- recruit  
https://github.com/recruit-tech/redux-pluto  
- react boilerplate  
https://github.com/react-boilerplate/react-boilerplate  
- redux tool kit (hooks x redux x ts)  
https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit  

## lesson
### 1. practice
非同期処理周りはjson-server,redux-sagaを利用する  
redux tool kitを利用する

#### todo
https://redux.js.org/introduction/examples#todos  
features/todoを追加  
- add  
- del  
- list  
- filter (all, active, completed)  

### 2. 非同期処理 (redux-saga)
https://qiita.com/stranger1989/items/4819b5e4539caea828bf  
- redux-thunk  
actionに非同期処理を記載するためfat actionになりやすい  
- redux-saga  
actionから呼び出す非同期処理の専用レイヤーを作成するためファイルが増えがち  

### 3. hooks
2つのhooksを利用すればreduxチックなことはできるが、useContextを利用してしまうと各presentationalコンポーネントから利用されるpropsが不明になりがちなため微妙に見える (component毎に仕様としてpropsの型を定義したい気持ち)  
- useReducer  
storeの概念がないため、状態管理は各オブジェクト毎に分散してしまう  
- useContext  
propsのバケツリレーが防げる  
- useDispatch  
mapDispatchToPropsを代替  
connectを記述する必要がなくなる  
- useSelector  
mapStateToPropsを代替  
connectを記述する必要がなくなる  

### 4. reduxディレクトリ構成
https://qiita.com/10mi8o/items/4fdb595f68606bceccfd  

役割毎にディレクトリを分けると、action creators, action types, reducersが密結合にも関わらず機能毎にファイルが増えていくため開発しにくい問題。(一つの機能を開発するのに、ディレクトリをまたいでファイルを探す必要がある)  

#### redux-way
Components, Containers, Reducers, Actions, Typesで構成されるスタンダードなパターン

#### ducks
component, containerは別ディレクトリとして、reduxに関係するファイルを機能単位で作成して、1ファイルに記述するパターン  
components/users.js  
modules/users.js

#### re-ducks
ducksパターンの派生  
component, containerは別ディレクトリとして、reduxに関係するファイルは機能単位でディレクトリを作成する。  
- users/operations  
componentからactionを発行する際に必ず経由する、非同期処理などを行うファイル  
最後にactionを発行(dispatch)する  
- users/types    
型定義  
- users/selectors  
Storeのstateを参照する  
- users/index  
エントリーポイント  

#### redux toolkit (slice)
create-react-appのreduxテンプレートとしても利用されるパターン  
ducksパターンで開発時に問題となるaction creator, action types(constants), reducersをまとめたものがslice  
createSlice関数が上記の定型的なコードを省略してくれる。  
hooksのuseSelector, useDispatchを利用することでさらにconnectの記載を省略可能。  

- app/store.js  
- features/counter/Counter.js  
- features/counter/counterSlice.js

sliceが肥大化しやすいため、reducers, operasions, selectorsなどre-ducksの単位で適宜切り出しても良さそう。
