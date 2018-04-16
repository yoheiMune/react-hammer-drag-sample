import React, { Component } from 'react'
import Hammer from 'react-hammerjs'
import './Cell.css'

// スワイプで開いたときの距離.
const SWIPED_DISTANCE = 150

class Cell extends Component {

  constructor() {
    super(...arguments)
    // 初期状態.
    this.state = {
      opened : false,
      deltaX : 0
    }
  }

  // open状態であれば-150pxがスタート地点、それ以外は0px.
  getFirstPosition() {
    return this.state.opened ? -1 * SWIPED_DISTANCE : 0
  }

  // 指でのドラッグが始まった.
  onPanStart(e) {
    // 最初のCellの位置を設定.
    this.setState({
      deltaX : this.getFirstPosition()
    })
  }

  // 指でドラッグしている.
  onPan(e) {
    // 指を動かしてドラッグしたら、要素もそれに追従させる.
    this.setState({
      deltaX : this.getFirstPosition() + e.deltaX
    })
  }

  // ドラッグ終了
  onPanEnd(e) {
    // 移動量に応じて、openedの状態を変更する.
    if (this.state.opened) {
      // 75px（150pxの半分）の動きがあれば、閉じる.
      if (e.deltaX >= SWIPED_DISTANCE / 2) {
        this.setState({
          opened : false,
          deltaX : 0
        })
      } else {
        this.setState({
          deltaX : this.getFirstPosition()
        })
      }
    
    } else {
      // 75px（150pxの半分）の動きがあれば、開く.
      if (e.deltaX <= -1 * SWIPED_DISTANCE / 2) {
        this.setState({
          opened : true,
          deltaX : -1 * SWIPED_DISTANCE
        })        
      } else {
        this.setState({
          deltaX : 0
        })
      }
    }
  }

  render() {

    // 指での移動量に合わせたスタイルを作成.
    let style = {
      transform : `translate(${this.state.deltaX}px, 0)`
    }

    // <Hammer>タグでスワイプのアクションを捕捉.
    return (
      <Hammer
        onPan={this.onPan.bind(this)} 
        onPanStart={this.onPanStart.bind(this)} 
        onPanEnd={this.onPanEnd.bind(this)}>
          <div className="cell" style={style}>cell{this.props.num}</div>
      </Hammer>
    )
  }
}

export default Cell
