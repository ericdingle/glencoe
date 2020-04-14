import {LitElement, css, customElement, html} from 'lit-element';
import '@material/mwc-icon-button';
import '@material/mwc-slider';

@customElement('settings-page')
class SettingsPage extends LitElement {
  static get properties() { return {
    difficulty:     {type: Number},
    intervalLength: {type: Number},
    restLength:     {type: Number},
    repetitions:    {type: Number}
  }}

  constructor() {
    super();
    this.difficulty = this.repetitions = 1;
    this.intervalLength = this.restLength = 10;
  }

  static get styles() {
    return [ css`
      :host > div {
        box-shadow: 1px 1px 2px 2px #CCC;
        margin: 5px auto;
        max-width: 500px;
        padding: 10px;
      }
      mwc-slider {
        width: 100%;
      }
      mwc-icon-button {
        background-color: #000;
        border-radius: 50%;
        color: #FFF;
        --mdc-icon-button-size: 40px;
      }
    `]
  }

  render() {
    return html`
      <div>
        <div>Difficulty = ${this.difficulty}</div>
        <mwc-slider min="1" max="20" step="1" markers @input="${e => this.handleInput(e, 'difficulty')}"></mwc-slider>
        <div>Interval Length = ${this.intervalLength}s</div>
        <mwc-slider min="10" max="180" step="10" markers @input="${e => this.handleInput(e, 'intervalLength')}"></mwc-slider>
        <div>Rest Length = ${this.restLength}s</div>
        <mwc-slider min="10" max="180" step="10" markers @input="${e => this.handleInput(e, 'restLength')}"></mwc-slider>
        <div>Repetitions = ${this.repetitions}</div>
        <mwc-slider min="1" max="20" step="1" markers @input="${e => this.handleInput(e, 'repetitions')}"></mwc-slider>
        <mwc-icon-button icon="play_arrow" @click="${this.handlePlay}"></mwc-icon-button>
      </div>
    `;
  }

  handleInput(event, property) {
    this[property] = event.target.value;
  }

  handlePlay() {
    const detail = {
      difficulty: this.difficulty,
      intervalLength: this.intervalLength,
      restLength: this.restLength,
      repetitions: this.repetitions
    }
    this.dispatchEvent(new CustomEvent('play', {detail: detail}));
  }
}
