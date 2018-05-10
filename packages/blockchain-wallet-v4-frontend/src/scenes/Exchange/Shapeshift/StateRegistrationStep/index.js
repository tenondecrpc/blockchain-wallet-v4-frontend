import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { lift } from 'ramda'

import Template from './template'
import { actions, selectors } from 'data'

class StateRegistrationStep extends React.Component {
  componentWillUnmount () {
    this.props.actions.destroyed()
  }

  onSubmit = (e) => {
    e.preventDefault()
    window.alert('submit')
  }

  render () {
    return this.props.data.cata({
      Success: (value) => <Template handleSubmit={this.props.onSubmit} stateWhitelist={value.stateWhitelist}/>
    })
  }
}

const mapStateToProps = (state) => ({
  data: lift((stateWhitelist) => ({ stateWhitelist }))(selectors.core.walletOptions.getShapeshiftStates(state))
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions.components.exchange, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StateRegistrationStep)
