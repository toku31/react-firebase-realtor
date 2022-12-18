---
title: "Realtor.com Project By React & Firebase -1-
"
date: 'November 6, 2022'
excerpt: 'ReactとFirebaseを用いて不動産物件を売買するサイトを作りました。メールアドレスやGoogleアカウントで認証して、Cloud FireStore(クラウドデータベース)にデータ保存できるようにしました。'
cover_image: '/images/posts/img4.jpg'
category: 'React'
author: 'Toku'
author_image: 'https://randomuser.me/api/portraits/women/12.jpg'
---

<!-- Markdow generator - https://jaspervdj.be/lorem-markdownum/ -->
参考サイト：
https://github.com/sahandghavidel/realtor-clone-react  
npm start  
npm run server

### Installation and first template
```bash
λ npx create-react-app react-firebase-realtor --use-npm
```
--use-npmというオプションを付けることで、yarnがインストールされていてもnpmをデフォルトで使用できる

faviconの作成  
https://favicon.io/ => Generator  
https://favicon.io/favicon-generator/  
favicon.icoファイルをコピーして使う

Tailwindのインストールと設定  
参考：https://tailwindcss.com/docs/guides/create-react-app
~~~js
user@mbp React % npm install -D tailwindcss postcss autoprefixer
user@mbp github-finder % npx tailwindcss init -p 
~~~
これでpostcss.config.jsとtailwind.config.jsの２ファイルができる

~~~js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
~~~

~~~js
// index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
~~~

npm start
Tailwindが正しくインストールされているか確認

~~~js
// App.js
function App() {
  return (
    <>
      <h1 className='text-2xl bg-red-400'>Hello World</h1>
    </>
  );
}

export default App;
~~~
vscode Extensionのインストール  
Auto Rename Tag  
Code spell Checker  
Dark Low Contrast Themes  
ES7 + React/Redux/React Native snippets  
Prettier-Code formatter  
Tailwind CSS IntelliSense  

```js
// public/index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Realtor.com</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```
gitインストール  
```bash
user@mbp react-firebase-realtor % git init
user@mbp react-firebase-realtor % git add .
user@mbp react-firebase-realtor % clear
user@mbp react-firebase-realtor % git commit -m "install reactjs and tailwind css and create the first template"
githubで新しいレポジトリを作成する
git remote add origin https://github.com/toku31/react-firebase-realtor.git
git branch -M main
git push -u origin main
```
次回はcommitの後はgit push 
### Create pages and routes
React Router  
https://reactrouter.com/en/main/start/concepts
```bash
npm i react-router-dom
```
または
```bash
npm i react-router　react-router-dom
```
```
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
```
```javascript
// /src/App.js 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
```

### Create the header component
```js
// App.js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Router>
        <Header />  // added
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/offers' element={<Offers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
```
Headerコンポーネントを作成する  
この時useLocationを用いる  
console.log(location)にpathnameがあるのでこれを使う  
useLocationはURLが変わるたびに再レンダリングして新しいオブジェクトを取得  
useHistoryはURLが変わっても再レンダリングしない 
```
// useLocation
Object
hash: ""key: "default"
pathname: "/offers"　　//
search: ""
state: null
[[Prototype]]: Object
```

```js
import {useLocation} from 'react-router-dom'

function Header() {
  const location = useLocation()
  console.log(location)
  const pathMathRoute=(route)=> {
    if (route === location.pathname){
      return true
    }
  }

  return (
    <div className ="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className="h-5 cursor-pointer"/>
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/") && "text-black border-b-red-500"}`}>Home</li>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/offers") && "text-black border-b-red-500"}`}>Offers</li>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMathRoute("/sign-in") && "text-black border-b-red-500"} `}>Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
```
# 3 Authentication using Firebase auth version9
```js
// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: rgb(240, 253, 244);
}
```
ログインページのレイアウト
```js
// src/pages/SignIn.jsx
import keyImgURL from '../assets/jpg/key.jpg'

export default function SignIn() {
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input className="w-full" type="text"></input>
          </form>
        </div>
      </div>
    </section>
  )
}
```
### Create Sign in Page
ログインページの作成
```js
// src/pages/SignIn.jsxの前半
import { useState } from 'react'
import keyImgURL from '../assets/jpg/key.jpg'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData;
  const onChange =(e)=> {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  //   const onChange =(e)=> {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value
  //   }))
  // }

  // const [text, setText] = useState('') 
  // const onChange =(e)=> { 
  //   setText(e.target.value)
  // }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
            />
            <div>
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type={showPassword ? "text" : "password"}
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Password"
            />
　　　　　＝＝＝以下は後半へ＝＝＝
```
パスワードを表示するeyeボタンやOAuthのGoogleデザインに、React Iconsを使う  
https://react-icons.github.io/react-icons/  
npm install react-icons --save
```js
// src/pages/SignIn.jsxの後半
            {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) }
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg" >
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-up" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign in</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

```

#### Install Firebase and react-toastify
firebaseのインストール
```bash
user@mbp react-firebase-realtor % npm install firebase  
```
firebase.jsの作成
~~~js
// react-firebase-realtor/src/firebase.js 
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*****************************************",
  authDomain: "*****************************************",
  projectId: "**************************",
  storageBucket: "**************************",
  messagingSenderId: "**************************",
  appId: "**************************"
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
~~~
firebase->authenticationでプロバイダの登録  
usersの登録：john@gmail.com  
Cloud Firestore-> データベースの作成ー>本番モード  
Firestore rulesを以下のように変更して公開する
```js
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Listings
    match /listings/{listing} {
    	allow read;
      allow create: if request.auth != null && request.resource.data.imgUrls.size() < 7;
    	allow delete: if resource.data.userRef == request.auth.uid;
      allow update: if resource.data.userRef == request.auth.uid;
    }
   
    // Users
    match /users/{user} {
    	allow read;
    	allow create;
    	allow update: if request.auth.uid == user
    }
  }
}
```
Storageのルールを以下のように変更して公開する
```
// Storage rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.auth != null &&
      request.resource.size < 2 * 1024 * 1024 && //2MB
      request.resource.contentType.matches('image/.*')
    }
  }
}
```
サイト：Firebase Authentication：https://firebase.google.com/docs/auth  
https://firebase.google.com/docs/auth/web/start  
user@mbp react-firebase-realtor % npm i firebase
### Sign Upページの作成
```js
// src/pages/SignUp.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import keyImgURL from '../assets/jpg/key.jpg'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import OAuth from '../components/OAuth'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData;

  const onChange =(e)=> {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async(e)=> {
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
    } catch (error) {
      console.log(error);
    }
  }
```
react-toastify: https://github.com/fkhadra/react-toastify  
https://fkhadra.github.io/react-toastify/introduction/
```js
npm install --save react-toastify
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
```
```js
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify'  // added
import 'react-toastify/dist/ReactToastify.css'  // added

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/offers' element={<Offers />} />
        </Routes>
      </Router>
      <ToastContainer  // added
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </>
  );
}

export default App;
```
#### Google OAuth
説明：https://firebase.google.com/docs/auth/web/google-signin

```js
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
```
```js
// src/components/OAuth.jsx
import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import {getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {toast} from 'react-toastify'

export default function OAuth() {

  async function onGoogleClick() {
      try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user
        console.log(user);
      } catch (error) {
        toast.error('Could not authorize with Google')
        console.log(error);
      }
  }

  return (
    <button type="button" onClick={onGoogleClick} className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded">
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with Google
    </button>
  )
}
```

```js
// src/components/OAuth.jsx
import React from 'react'
import {FcGoogle} from 'react-icons/fc'

function OAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg transition duration-150 ease-in-out rounded">
      <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
      Continue with Google
    </button>
  )
}

export default OAuth
```
Sign upページの作成
```js
// src/pages/SignUp.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import keyImgURL from '../assets/jpg/key.jpg'
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import OAuth from '../components/OAuth'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData;

  const onChange =(e)=> {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            <input 
              className="mb-6  w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="text" 
              id="name" 
              value={name} 
              onChange={onChange}
              placeholder="Full name"
            />
            <input 
              className="mb-6  w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
            />
            <div className='relative mb-6'>
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type={showPassword ? "text" : "password"}
              id="password" 
              value={password} 
              onChange={onChange}
              placeholder="Password"
            />
            {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) : (<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) }
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg" >
              <p className='mb-6'>Have a account?
                <Link to="/sign-in" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Sign in</Link>
              </p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Forgot password?</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Sign up</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
```
Forgot Passwordのページ作成
```js
// src/pages/ForgotPassword.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import keyImgURL from '../assets/jpg/key.jpg'
import OAuth from '../components/OAuth'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const onChange =(e)=> {
    setEmail(e.target.value)
    }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('could not send reset password')
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={keyImgURL} alt="key" className="w-full rounded-2xl"/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input 
              className="mb-6  w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange}
              placeholder="Email address"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg" >
              <p className='mb-6'>Don't have a account?
                <Link to="/sign-up" className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>Register</Link>
              </p>
              <p>
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Sign in instead</Link>
              </p>
            </div>
            <button className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800' type="submit">Send reset password</button>
            <div className='flex items-center my-4 before:border-t  before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}
```
test@gmail.com  
123456
## Profile Pageの作成
```js
// src/pages/profile.jsx
import {useState} from 'react'
import {getAuth} from 'firebase/auth'

function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.Email
  })

  const {name, email} = formData

  return (
    <>
      <section className="max-w-6xl max-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
             <input type="text" id="name" value={name} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             {/* Email input */}
             <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">Do you want to change your name?
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>Edit</span>
              </p>
              <p className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign out</p>
             </div>
          </form>
        </div>
        
      </section>
    </>
  )
}

export default Profile
```
### Private route for protecting profile page and logout functionality
react-router-dom を使って、ログイン時とログアウト時で遷移できるページのを区別する、PrivateRouteを実装する
```js
// App.jsx
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<PrivateRoute />}>  // added
            <Route path='/profile' element={<Profile />} />
          </Route>   // added
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
           <Route path='/forgot-password' element={<ForgotPassword />} />
           <Route path='/offers' element={<Offers />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </>
  );
}

export default App;
```
PrivateRouteの作成
```js
// /src/comonents/ProvateRoute.jsx
import {Outlet, Navigate} from 'react-router-dom'

function PrivateRoute() {
  const loggedIn = false;
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in/' />
}

export default PrivateRoute
```
ログイン状況を確認するフックuseAuthStatus Hook を作成する  
checkingStatusはloadingと同じ意味  
下のuseAuthStatusは２つ値（loggedIn, checkingStatus）を返したいので、export default constとdefaultをつけることができない
```js
// src/hooks/useAuthStatus.jsx
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true) 

  useEffect(() => {
      const auth = getAuth()
      console.log(auth)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true)
        }
        setCheckingStatus(false)
      })
    }, [])
  return { loggedIn, checkingStatus }
}
```
作成したuseAuthStatusフックをPrivateRouteに実装する  
useAuthStatusはdefault functionでないのでimportでは{}で囲む
```js
import {Outlet, Navigate} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

function PrivateRoute() {
  // const loggedIn = false;
  const { loggedIn, checkingStatus } = useAuthStatus() // 実装
  if (checkingStatus) {
    // return <Spinner />
    return <h3>Loading...</h3>
  }
  console.log('loggedIn', loggedIn);
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute

```

Profile.jsxにログアウト機能を追加
```js
import {useState} from 'react'
import {getAuth} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'　 // added

function Profile() {
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData
  const navigate = useNavigate()

  const onLogout = () => {  // added
    auth.signOut()
    navigate('/')
  }

  return (
    <>
      <section className="max-w-6xl max-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">プロフィール</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
             <input type="text" id="name" value={name} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             {/* Email input */}
             <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">名前を変更しますか？
                <span className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>編集</span>
              </p>
              <p onClick = {onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>サインアウト</p>
             </div>
          </form>
        </div>
        
      </section>
    </>
  )
}

export default Profile
```

#### プロファイルページに編集機能を追加する
<span onClick={() => setChangeDetail((prevState)=> !prevState)}は() => をつけないと無限ループしてしまう

さらにProfile.jsxにonChangeやhandleSubmitを追加する
```js
// src/pages/Profile.jsx
import {useState} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase'

function Profile() {
  const auth = getAuth()
  const [changeDetail, setChangeDetail] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData
  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onChange = (e)=>
    setFormData(prevState => ({
      ...prevState, 
      [e.target.id]: e.target.value,
    }))

  const handleSubmit =async()=> {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name on fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }
      toast.success('プロフィールの変更に成功しました')
    } catch (error) {
      toast.error('プロフィールの変更に失敗しました')
    }
  }

  return (
    <>
      <section className="max-w-6xl max-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">プロフィール</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* Name input */}
            <input 
              type="text" 
              id="name" 
              value={name} 
              disabled = {!changeDetail}
              onChange = {onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
            />

             {/* Email input */}
             <input type="email" id="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />

             <div className="flex justify-between items-center whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">名前を変更しますか？
                <span 
                  onClick={() => {
                    changeDetail && handleSubmit()
                    setChangeDetail((prevState)=> !prevState)
                  }}
                  className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>
                  {changeDetail ? '更新' : '編集' }
                </span>
              </p>
              <p onClick = {onLogout} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>サインアウト</p>
             </div>
          </form>
        </div>
        
      </section>
    </>
  )
}

export default Profile
```

```js
// src/components/Header.jsx
import { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

function Header() {
  const [pageState, setPageState] = useState('Sign in')
  const location = useLocation()
  console.log('location:', location)
  const pathMachRoute=(route)=> {
    if (route === location.pathname){
      return true
    }
  }

  const navigate = useNavigate();
  const auth = getAuth()
  
  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setPageState('profile')
        } else {
          setPageState('Sign in')
        }
      })
  },[auth])

  return (
    <div className ="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" 
            alt="logo" 
            className="h-5 cursor-pointer"
            onClick = {()=>navigate('/')}
          />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMachRoute("/") && "text-black border-b-red-500"}`} onClick = {()=>navigate('/')}>Home</li>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMachRoute("/offers") && "text-black border-b-red-500"}`}>Offers</li>
            <li className={`cursor-pointer py-3  text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMachRoute("/sign-in")| pathMachRoute("/profile") && "text-black border-b-red-500"}`} onClick = {()=>navigate('/profile')}
            >{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default Header
```
Spinner.jsxでSpinnerコンポーネントを作成する  
https://loading.io/からフリーSVGを取得
```js
// src/components/Spinner.jsx
import React from 'react'
import spinner from '../assets/svg/spinner.svg'

function Spinner() {
  return (
    <div className='bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50'>
      <div>
        <img src={spinner} alt="Loading..." className="h-max" />
      </div>
    </div>
  )
}
export default Spinner
```
#### リスト作成ページを作成する
react-icons  
https://react-icons.github.io/react-icons
```js
// CreateListing.jsx
 return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">リストの作成</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">売却 / 賃貸</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            売却
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
          >
            賃貸
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">名前</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="名前"
          maxLength="20"
          minLength="2"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">寝室</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">浴室</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold">駐車場</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            有
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            無
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">家具</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            有
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            無
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold">住所</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="住所"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        {!geolocationEnabled && (
          <div className="flex space-x-6 justify-start mb-6">
            <div className="">
              <p className="text-lg font-semibold">緯度</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold">経度</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min="-180"
                max="180"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
              />
            </div>
          </div>
        )}
        <p className="text-lg font-semibold">備考</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="備考"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        />
        <p className="text-lg font-semibold">値引</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            有
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            無
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">通常価格</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">¥ / 月</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="flex items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">ディスカウント価格</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">
          <p className="text-lg font-semibold">画像</p>
          <p className="text-gray-600">
            最初の画像は表紙用になります (最大 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          リストに追加する
        </button>
      </form>
    </main>
  )
```
javascript クエスチョンマーク2つの演算子→Null合体演算子という  
Sample
```js
null ?? 'hoge' // => 'hoge'
undefined ?? 'hoge' // => 'hoge'
false ?? 'hoge' // => false
0 ?? 'hoge' // => 0
'' ?? 'hoge' // => ''
NaN ?? 'hoge' // => NaN
```
Null 合体演算子 (??) は論理演算子の一種です。この演算子は左辺が null または undefined の場合に右の値を返し、それ以外の場合に左の値を返します。  
下の場合は入力値e.target.valueがTextやNumbersの時はbooleanがnullのままなので右の値のe.target.valueを採用し、trueやfalseの時はbooleanがnull または undefined以外になるので左のboolean(trueまたはfalse)を採用する
```js
let boolean = null
if (e.target.value ==='true') {
  boolean = true
}
if (e.target.value ==='false') {
  boolean = false
}
  // Text/Booleans/Numbers
if(!e.target.files) {
  setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: boolean ?? e.target.value,
  }))
}
```
```js
// CreateListing.jsx
  const onChange = (e) => {
    let boolean = null

    if (e.target.value ==='true') {
      boolean = true
    }

    if (e.target.value ==='false') {
      boolean = false
    }
    // File
    if(e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }
      // Text/Booleans/Numbers
    if(!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
  }

  if (loading) {
    return <Spinner />
  }
```
Google Cloud PlatForm  
https://console.cloud.google.com/getting-started?hl=ja&pli=1  
Geocoding API
```js
let geolocation = {}
let location

if (geolocationEnabled) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
  )
  const data = await response.json()
  // console.log(data)
  geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
  geolocation.lng = data.results[0]?.geometry.location.lng ?? 0
  location = 
    data.status === 'ZERO_RESULTS'
      ? undefined
      : data.results[0]?.formated_address
  console.log(location)
  if (location === undefined || location.includes('undefined')) {
    setLoading(false)
    toast.error('Please enter a correct address')
    return
  }
} else {
  geolocation.lat = latitude
  geolocation.lng = longitude
  // location = address
  console.log(geolocation)
}
```
Cloud Storage onWebでファイルをアップロードする  
https://firebase.google.com/docs/storage/web/upload-files  
user@mbp react-firebase-realtor % npm i uuid
```js
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'images/rivers.jpg');
const uploadTask = uploadBytesResumable(storageRef, file);
// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
```
FirebaseError: Missing or insufficient permissions.
imageUrls=>imgUrls (ルールで allow create: if request.auth != null && request.resource.data.imageUrls.size() < 7;)  
エラーメッセージの後は returnで返す
```js
  const imgUrls = await Promise.all(
    [...images].map((image) => storeImage(image))
  ).catch(() => {
    setLoading(false)
    toast.error('画像をアップロードできませんでした')
    return // 
  })

```
```js

```
```js

```
```js

```
```js

```

```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
```js

```
















