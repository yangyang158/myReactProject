import React from 'react';
import store from './index.js';
import {observer} from 'mobx-react';
import * as maptalks from 'maptalks';
import './index.less'

@observer
export default class D3Study extends React.Component{

    componentDidMount () {
 
    }

    state = {
        num: 1,
        num2: 5
    }

    add = () => {
        this.setState(state => {
            if (state.num === 5) {
                return {
                    num2: state.num2 + 1
                }
            }
            return {
                num: state.num + 1
            }
        })
    }

    render(){
        console.log('render')
        let {num, num2 } = this.state
        return (
            <div className="map-talk-page">
                <h4>shouldComponentUpdate 避免重复渲染</h4>
                <button onClick={this.add}>add</button>
                <div>num2的值: {num2}</div>
                <List value={num} />
            </div>
        )
    }
}

const List = React.memo(function List (props) {
    console.log('List render', props)
    return (
        <div>
            <div>num的值: {props.value}</div>
        </div>
    )
})

// class List extends React.PureComponent{ 
//     state = {
//         name: 'yy'
//     }
//     update = () => {
//         console.log('update')
//         this.setState(state => {
//             return {
//                 name: state.name + '1'
//             }
//         })
//     }
//     render () {
//         console.log('List render')
//         return (
//             <div onClick={this.update}>
//                 <div>num的值: {this.props.value}</div>
//                 <div>name的值: {this.state.name}</div>
//             </div>
//         )
//     }
// }

// class List extends React.Component{ 
//     shouldComponentUpdate (newProps, newState) {
//         console.log('**旧***', this.props, this.state)
//         console.log('**新***', newProps, newState)
//         // 设置什么时候更新组件

//         return this.shallowPropsEqual(newProps, this.props) || this.shallowStateEqual(newState, this.state)
//     }

//     shallowStateEqual = (newState, oldState) => {
//         if (newState === oldState) {
//             return false
//         }
//         for (let key in newState) {
//             if (oldState.hasOwnProperty(key) && newState[key] === oldState[key]) {
//                 return false
//             }
//         }
//         console.log('*******state****')
//         return true
//     }

//     shallowPropsEqual = (newProps, oldProps) => {
//         // newProps 和 oldProps 是对象
//         if (newProps === oldProps) {
//             return false
//         }
//         for (let key in newProps) {
//             if (oldProps.hasOwnProperty(key) && newProps[key] === oldProps[key]) {
//                 return false
//             }
//         }
//         console.log('*******props****')
//         return true
//     }
//     state = {
//         name: 'yy'
//     }
//     update = () => {
//         console.log('update')
//         this.setState(state => {
//             return {
//                 name: state.name + '1'
//             }
//         })
//     }
//     render () {
//         console.log('List render')
//         return (
//             <div onClick={this.update}>
//                 <div>num的值: {this.props.value}</div>
//                 <div>name的值: {this.state.name}</div>
//             </div>
//         )
//     }
// }