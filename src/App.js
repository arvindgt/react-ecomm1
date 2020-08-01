import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

const HatsPage = () => (
  <div>
    <h1> HATS PAGE </h1>
  </div>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // createUserProfileDocument(user);
      // console.log(user);

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
         // console.log('this is snapshot', snapShot.data());
         this.setState({
           currentUser: {
             id: snapShot.id,
             ...snapShot.data()
           }
         }, () => {
          console.log(this.state);
         });
        });
      } else {
        console.log('in else', this.state);
        this.setState({ currentUser: userAuth});
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/signin' component={SignInAndSignUpPage}/>
          {/* <Route path='/hats' component={HatsPage}/> */}
        </Switch>
        
      </div>
    );
  }
  
}

export default App;
