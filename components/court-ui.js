import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('court-ui')
class CourtUi extends LitElement {
  static get properties() { return {
    index: {type: Number}
  }}

  static get styles() {
    return [css`
      svg {
        display: block;
        object-fit: contain;
        height: 100vh;
        width: 100vw;
      }
      .line {
        stroke: red;
        stroke-width: 5;
      }
      .arrow {
        fill: transparent;
        marker-end: url(#triangle);
        stroke: black;
        stroke-width: 10;
        visibility: hidden;
      }
      .visible {
        visibility: visible !important;
      }
    `];
  }

  render() {
    return html`
      <svg viewbox="0 0 640 975">
        <defs>
          <linearGradient id="woodGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#DEB887"/>
            <stop offset="100%" stop-color="#EEC591"/>
          </linearGradient>
          <pattern id="woodPattern" x="0" y="0" width="20" height="120" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="10" height="120" fill="url(#woodGradient)"/>
            <rect x="10" y="-60" width="10" height="120" fill="url(#woodGradient)"/>
            <rect x="10" y="60" width="10" height="120" fill="url(#woodGradient)"/>
          </pattern>
          <marker id="triangle" viewBox="0 0 10 10" refX="1" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        <rect width="100%" height="100%" fill="url(#woodPattern)"/>

        <line x1="0" y1="545" x2="640" y2="545" class="line"/>
        <line x1="0" y1="705" x2="160" y2="705" class="line"/>
        <line x1="480" y1="705" x2="640" y2="705" class="line"/>
        <line x1="160" y1="545" x2="160" y2="705" class="line"/>
        <line x1="480" y1="545" x2="480" y2="705" class="line"/>
        <line x1="320" y1="545" x2="320" y2="975" class="line"/>

        <path d="M300 400 Q 250 175 125 125" class="arrow ${this.index == 0 ? 'visible' : ''}"/>
        <path d="M340 400 Q 390 175 515 125" class="arrow ${this.index == 1 ? 'visible' : ''}"/>
        <line x1="300" y1="575" x2="100" y2="575" class="arrow ${this.index == 2 ? 'visible' : ''}"/>
        <line x1="340" y1="575" x2="540" y2="575" class="arrow ${this.index == 3 ? 'visible' : ''}"/>
        <path d="M300 600 Q 250 800 125 850" class="arrow ${this.index == 4 ? 'visible' : ''}"/>
        <path d="M340 600 Q 390 800 515 850" class="arrow ${this.index == 5 ? 'visible' : ''}"/>
      </svg>
    `;
  }
}
