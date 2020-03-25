import React, { Component as Compo } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

class App extends Compo {

  state = {
    show: true
  }

  render() {
  return (
    <div className="App">
      <Layout>
         {this.state.show ? <BurgerBuilder /> : null }
      </Layout>
    </div>
  );
}
}

export default App;
