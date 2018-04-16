import React, { Component } from 'react'
import Cell from './Cell'
import './App.css'

class App extends Component {

  render() {
    return (
      <div>
        <h1>React.js and Hammer.js Sample.</h1>

        {/* スワイプできるCellを5つ並べる. */}
        <div className="items">
          {
            [1, 2, 3, 4, 5].map(num => {
              return <Cell num={num} key={num}/>
            })
          }
        </div>
      </div>
    )
  }
}

export default App
