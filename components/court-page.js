import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './court-app.js';
import './court-ui.js';

@customElement('court-page')
class CourtPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        #display {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        #time {
          font-size: 30px;
          margin: auto;
        }
        .green {color: green;}
        .red {color: red;}
        paper-icon-button {
          background-color: #000;
          border-radius: 50%;
          color: #FFF;
          margin: 1px;
        }
      </style>
      <court-app id="courtApp"
          difficulty="[[difficulty]]" interval-length="[[intervalLength]]"
          rest-length="[[restLength]]" repetitions="[[repetitions]]"
          time="{{time}}" index="{{index}}" state="{{state}}" active="{{active}}">
      </court-app>
      <div id="display">
        <div id="time" class$="[[_formatClass(active)]]">[[_formatTime(time)]]</div>
        <div>
          <template is="dom-if" if="[[_isEqual(state, 'paused')]]">
            <paper-icon-button icon="av:play-arrow" mini on-tap="play"></paper-icon-button>
          </template>
          <template is="dom-if" if="[[_isEqual(state, 'playing')]]">
            <paper-icon-button icon="av:pause" mini on-tap="pause"></paper-icon-button>
          </template>
          <paper-icon-button icon="av:stop" mini on-tap="stop"></paper-icon-button>
        </div>
      </div>
      <court-ui index="[[index]]"></court-ui>
    `;
  }

  play() {
    this.$.courtApp.play();
  }
  pause() {
    this.$.courtApp.pause();
  }
  stop() {
    this.$.courtApp.stop();
    this.dispatchEvent(new CustomEvent('stop'));
  }

  _formatClass(active) {
    return active ? 'green' : 'red';
  }
  _formatTime(time) {
    var minutes = "0" + Math.floor(time / 60);
    var seconds = "0" + (time % 60);
    return minutes.slice(-2) + ':' + seconds.slice(-2);
  }
  _isEqual(a, b) {
    return a == b;
  }
}
