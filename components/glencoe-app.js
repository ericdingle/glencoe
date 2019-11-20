import {customElement} from '@polymer/decorators';
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/iron-pages/iron-pages.js';
import './court-page.js';
import './settings-page.js';

@customElement('glencoe-app')
class GlencoeApp extends PolymerElement {
  static get properties() { return {
    page: {type: String, value: 'settings' }
  }}

  static get template() {
    return html`
      <iron-pages selected="[[page]]" attr-for-selected="id">
        <settings-page id="settings" on-play="handlePlay"
            difficulty="{{difficulty}}" interval-length="{{intervalLength}}"
            rest-length="{{restLength}}" repetitions="{{repetitions}}">
        </settings-page>
        <court-page id="court" on-stop="handleStop"
            difficulty="[[difficulty]]" interval-length="[[intervalLength]]"
            rest-length="[[restLength]]" repetitions="[[repetitions]]">
        </court-page>
      </iron-pages>
    `;
  }

  handlePlay() {
    this.page = 'court';
    this.$.court.play();
  }
  handleStop() {
    this.page = 'settings';
  }
}
