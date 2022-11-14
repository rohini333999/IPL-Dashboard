import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamsCardList: [], isLoading: true}

  componentDidMount() {
    this.getTeamCardData()
  }

  getTeamCardData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    console.log(updatedData)
    this.setState({teamsCardList: updatedData, isLoading: false})
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderTeamsList = () => {
    const {teamsCardList} = this.state

    return (
      <ul className="teams-list">
        {teamsCardList.map(eachCard => (
          <TeamCard teamCardDetails={eachCard} key={eachCard.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="home-route-container">
        <div className="teams-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
