import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import obstruction from 'obstruction';
import document from 'global/document';

import Typography from '@material-ui/core/Typography';

import API from '../../api';

import MusicPlayer from '../music-player';
import OptionsModal from '../options-modal';
import GridController from './grid';
import Minimap from './minimap';
import Header from './header';
import Actions from './actions';
import Scoreboard from './scoreboard';
import PlayerPicker from './player-picker';
import Disasters from './disasters';
import PlayerHand from './hand';
import DisasterAlert from './disaster-alert';
import TurnTimer from './turn-timer';

import backgroundImage1 from '../backgrounds/BG1.png';
import backgroundImage2 from '../backgrounds/BG2.png';
import backgroundImage3 from '../backgrounds/BG3.png';
import backgroundImage4 from '../backgrounds/BG4.png';
import backgroundImage5 from '../backgrounds/BG5.png';

const backgroundImage = [
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
  backgroundImage5
][~~(Math.random() * 5)];

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100%',
    backgroundImage: 'url(' + backgroundImage + ')',
    backgroundSize: 'cover',
  },
  header: {
    width: '100%',
    height: '100px',
  },
  music: {
    position: 'absolute',
    top: 38,
    right: 0
  }
});

class GameComponent extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
    if (!this.props.inGame) {
      API.reconnect(this.props.match.params.id);
    }
    document.documentElement.className = 'noscroll';
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div className={ this.props.classes.root }>
      // index order, not meaning order
        <GridController />
        // grid goes first because it's fullscreen covering the background
        // everything else is "hovering" over it
        <Header />
        <TurnTimer />
        <div className={ this.props.classes.music }>
          <MusicPlayer />
          <OptionsModal />
        </div>
        <PlayerPicker />
        <DisasterAlert />

        <Minimap />
        <Actions />
        <Scoreboard />
        <Disasters />
        <PlayerHand />
      </div>
    );
  }
}

const mapToProps = obstruction({
  inGame: 'game.inGame',
});

export default withStyles(styles)(connect(mapToProps)(GameComponent));
