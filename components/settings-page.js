import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-slider/paper-slider.js';

@customElement('settings-page')
class SettingsPage extends PolymerElement {
  static get properties() { return {
    difficulty:     {type: Number, notify: true},
    intervalLength: {type: Number, notify: true},
    restLength:     {type: Number, notify: true},
    repetitions:    {type: Number, notify: true}
  }}

  static get template() {
    return html`
      <style>
        paper-material {
          margin: 5px auto;
          max-width: 500px;
          padding: 10px;
        }
        paper-slider {
          width: 100%;
        }
        paper-icon-button {
          background-color: #000;
          border-radius: 50%;
          color: #FFF;
        }
      </style>

      <paper-material>
        <div>Difficulty</div>
        <paper-slider min="1" max="20" value="{{difficulty}}" editable></paper-slider>
        <div>Interval Length (seconds)</div>
        <paper-slider min="10" max="180" step="10" value="{{intervalLength}}" editable></paper-slider>
        <div>Rest Length (seconds)</div>
        <paper-slider min="10" max="180" step="10" value="{{restLength}}" editable></paper-slider>
        <div>Repetitions</div>
        <paper-slider min="1" max="20" value="{{repetitions}}" editable></paper-slider>
        <paper-icon-button icon="av:play-arrow" on-click="handlePlay"></paper-icon-button>
      </paper-material>
    `;
  }

  handlePlay() {
    this.dispatchEvent(new CustomEvent('play'));
  }
}
