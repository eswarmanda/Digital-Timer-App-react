import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrement = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  startOrPauseButton = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state
    const playOrPause = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const isButtonsDisabled = timeElapsedInSeconds > 0

    const runningOrPauseStatus = isTimerRunning ? 'Running' : 'Paused'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="main-container">
        <div className="timerUi-card">
          <h1 className="title">Digital Timer</h1>
          <div className="timer-box">
            <div className="timer">
              <div className="main-timer">
                <h2>{this.getElapsedSecondsInTimeFormat()}</h2>
                <p>{runningOrPauseStatus}</p>
              </div>
            </div>
            <div className="timer-setting">
              <div className="icon-main-card">
                <div className="icon-card">
                  <button
                    className="play-pause-btn"
                    type="button"
                    onClick={this.startOrPauseButton}
                  >
                    <img
                      className="icon"
                      src={playOrPause}
                      alt={startOrPauseAltText}
                    />
                    <div>
                      <p>{isTimerRunning ? 'Pause' : 'Start'}</p>
                    </div>
                  </button>
                </div>
                <div className="icon-card">
                  <button
                    className="reset-btn"
                    type="button"
                    onClick={this.onReset}
                  >
                    <img
                      className="icon"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />{' '}
                  </button>

                  <div>
                    <p>Reset</p>
                  </div>
                </div>
              </div>
              <p className="p1">Set Timer limit</p>
              <div className="control-setting">
                <button
                  className="btn"
                  disabled={isButtonsDisabled}
                  type="button"
                  onClick={this.onDecrement}
                >
                  -
                </button>
                <div className="set-card">
                  <p className="set-status">{timerLimitInMinutes}</p>
                </div>
                <button
                  className="btn"
                  disabled={isButtonsDisabled}
                  type="button"
                  onClick={this.onIncrement}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
