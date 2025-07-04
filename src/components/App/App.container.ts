import { connect } from 'react-redux'
import { isConnected } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatchProps, MapStateProps } from './App.types'
import App from './App'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state),
})

const mapDispatch = (): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(App)
