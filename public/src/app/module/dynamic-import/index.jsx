import React from 'react'

export default class DynamicImport extends React.Component {

    state = {
        Component: null
    }

    componentDidMount () {
        this.props.load().then(Component => {
            console.log('Component', Component)
            this.setState({
                Component: Component.default || null
            })
        })
    }

    render () {
        let {Component} = this.state

        if (Component) {
            return (<Component />)
        } else {
            return (<div>加载中</div>)
        }
    }
}