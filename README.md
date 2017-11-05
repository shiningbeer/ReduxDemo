# ReduxDemo
a demo app for React Native with Redux


### 使用步骤
### Step 1 Install
- npm install --save redux
- npm install --save react-redux

### Step2 新建目录结构redux文件夹
```
    |--redux
        |--actions
            |--type.js    存放各种action的类型常量
            |--user.js    有关user的action的creator
            |--wallet.js  有关wallet的action的creator
            |--...
        |--reducers
            |--root.js    根reducer，将其它的reducer全组装起来
            |--user.js    处理有关user action的reducer
            |--wallet.js  处理有关Wallet action的reducer
            |--...
        |--store
            |--getStore.js  store的初始化
    
```

### Step3 编写type.js和各种action.js
- 把各种能想到的动作写下来，比如用户的登录、退出和钱包的创建和删除，那么先把这些type定义在type.js里
```
    //user
    export const USER_LOGIN="USER_LOGIN"
    export const USER_LOGOUT="USER_LOGOUT"
    ...
    
    //wallet
    export const WALLET_ADD="WALLET_ADD"
    export const WALLET_DEL="WALLET_DEL"
    ...
```
- 把具体的action和它的creator函数写出来，action的type属性是必须的，其它则是它携带的信息量。为了清楚，不同类型分别放在不同的js文件。
```
    //user.js
    import * as TYPES from './types';
    export function loginUser(user) {
    	return {
    		'type': TYPES.USER_LOGIN,
    		'user': user,
    	}
    }
    ...
    
    //wallet.js
    export function addWallet(new_wallet) {
    	return {
    		'type': TYPES.WALLET_DEL,
    		'new_wallet': new_wallet,
    	}
    }

```
### Step3 编写相应的reducer纯函数，并将它们组合成根reducer函数
- 纯函数是指同样的输入一定会获得同样的输出，所以如果有类似于date.now()及math.random()一类的函数不可以使用。
- 为了代码清楚，可以为每一种类型的action创建一个reducer。
- 每个reducer接受当前状态和一个action，返回下一个状态
```
    //user.js
    import * as TYPES from '../actions/types';

    const initialState = {
    	someone_login: false,
    	login_user:null,          //初始无人登录
    };
    
    export default function userReducer(state = initialState, action) {
    
    	switch (action.type) {
    		case TYPES.USER_LOGIN:
    			return {
    				someone_login: true,
    	            login_user:action.user,  //返回新状态：有人登录，登录者为action携带的user属性
    			};
    			break;
    
    		case TYPES.USER_LOGOUT:
    			return {
    				someone_login: false,
    	            login_user:null,  //返回新状态，无人登录
    			};
    			break;
    		default:
    			return state;
    	}
    }
    
    //wallet.js
    import * as TYPES from '../actions/types';

    const initialState = {
    	walletList: [],   //初始钱包列表为空
    };
    
    export default function walletReducer(state = initialState, action) {
    
    	switch (action.type) {
    		case TYPES.WALLET_DELETED:
    		    //todo：循环state.walletList，根据action.address删除掉相应wallet，得到一个新的wallet,newWallet.
    
    			return {
    				walletList: newlist,
    			};
    			break;
    
    		case TYPES.WALLET_ADD:
    			var newlist = state.walletList;
    			newlist.push(action.newWallet);
    			//先进行处理，将新加入的钱包push到新列表中
    
    			return {
    				walletList: newlist,//返回新状态：加入新钱包后的钱包列表
    			};
    			break;
    		default:
    			return state;
    	}
    }
    
```
- 使用redux包的combineReducers，将reducer组合成根reducer
```
    import { combineReducers } from 'redux';
    import walletReducer from './wallet';
    import userReducer from './user';
    
    export default rootReducer = combineReducers({
        walletStates: walletReducer,
        userStates: userReducer,
    })
```

### Step 4 生成唯一的store，也是app的唯一数据源
- 使用redux包的createStore函数，以根reducer为参数生成store
```
//getStore.js
    import { createStore, applyMiddleware } from 'redux';
    import rootReducer from '../reducers/root';
    
    let store = createStore(rootReducer);
    export const getStore = () => {
        return store;
    }
```

### Step 5 在根组件上包上<Provider store={store}></Provider>
- 在你的根js文件上，获取之前生成的store
```
    let store=getStore()
```
-在你的根组件<Root/>外包上<Provider>并将store作为props传递给它。Provider来自于react-redux包
```
    <Provider store={store}>
        <Root/>
    </Provider>
```

### Step 6 在你相关的组件上选择要关联的state并用react-redux包的connect函数connect一下
- 其实现在store里已经存储了你所要的state了，在前面的例子里，store.walletState就是与wallet相关的state，store.userState就是与user相关的state。（就是根reducer里的属性名）
- 在connect之前，先要选出要使用的state，因为没必要用到全部的
```
    const mapStateToProps = store => {
      return {
        walletState: store.walletState,
      }
    }
```
- 然后在我们的组件里，不要直接输出我们已经写好的组件，而是输出connect过的组件
```
    import { connect } from 'react-redux';
    
    class your_component extends PureComponent {
        render(){
            return(
                ...
            )
        }
    }
    //不输出上面你写好的组件
    
    const mapStateToProps = store => {
      return {
        walletState: store.walletState,
      }
    }
    //而是输出connect过的选好state的组件
    export default connect(mapStateToProps)(your_component);

```
### Step 7 在connect过的组件里就可以引用state和通过dispatch(action)来刷新状态和界面了
- 在connect过的组件里使用state
```
    wallet_list=this.props.walletState.walletList
```
- 在connect过的组件的某个点击事件里更新状态
```
    onPress={()=>{
        new_wallet={}
        new_wallet.address="xxxxxxxxxxxx"
        new_wallet.name="xxxx"
        new_wallet.privateKey="xxxx"
        this.props.dispatch(addWallet(new_wallet)
    }}
```
>addWallet是个action creator，它生成一个action{'type':"WALLET_ADD",'new_wallet':new_wallet},携带了我们关于new_wallet的信息。
>dispatch之后呢，reducer会根据目前的state和这个action生成新的state，随后redux会刷新界面。
