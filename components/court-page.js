import {LitElement, css, customElement, html} from 'lit-element';
import '@material/mwc-icon-button/mwc-icon-button.js';
import {CourtApp} from './court-app.js';
import './court-ui.js';

@customElement('court-page')
class CourtPage extends LitElement {
  static get properties() { return {
    active: {type: Boolean},
    index: {type: Number},
    state: {type: String},
    time: {type: Number}
  }}

  static get styles() {
    return [css`
      :host > div {
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
      mwc-icon-button {
        background-color: #000;
        border-radius: 50%;
        color: #FFF;
        margin: 1px;
        --mdc-icon-button-size: 40px;
      }
    `];
  }

  render() {
    return html`
      <div>
        <div id="time" class="${this.active ? 'green' : 'red'}">${this.formatTime(this.time)}</div>
        <div>
          <mwc-icon-button icon="${this.state == 'playing' ? 'pause' : 'play_arrow'}"
                           @click="${this.state == 'playing' ? this.pause : this.play}">
          </mwc-icon-button>
          <mwc-icon-button icon="stop" @click="${this.stop}"></mwc-icon-button>
        </div>
      </div>
      <court-ui index="${this.index}"></court-ui>
    `;
  }


  init(settings) {
    this.courtApp = new CourtApp(settings, (key, value) => { this[key] = value; });
  }
  play() {
    this.courtApp.play();
  }
  pause() {
    this.courtApp.pause();
  }
  stop() {
    this.courtApp.stop();
    delete this.courtApp;
    this.dispatchEvent(new CustomEvent('stop'));
  }

  formatTime(time) {
    var minutes = "0" + Math.floor(time / 60);
    var seconds = "0" + (time % 60);
    return minutes.slice(-2) + ':' + seconds.slice(-2);
  }
}
