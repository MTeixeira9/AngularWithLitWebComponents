import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { User } from './user';

export class CardUser extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .card {
      box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.5);
      max-width: 160px;
    }
    .card-content {
      padding: 10px;
    }
    .card-actions {
      display: flex;
      justify-content: space-between;
    }
  `;

  @property({ type: Object }) user?: User;

  render() {
    if (this.user === undefined) {
      return '';
    }

    return html`
      <div class="card">
        <img
          width="160px"
          src=${this.user.avatar
            ? this.user.avatar
            : 'assets/images/avatar.png'}
        />
        <div class="card-content">
          <h4>${this.user.fullName}</h4>
          <p>${this.user.role}</p>
          <div class="card-actions">
            <button @click=${this.handleEdit}>Edit</button>
            <button @click=${this.handleRemove}>Remove</button>
          </div>
        </div>
      </div>
    `;
  }

  private handleEdit() {
    this.dispatchEvent(
      new CustomEvent<User>('edit', {
        detail: this.user,
      })
    );
  }

  private handleRemove() {
    this.dispatchEvent(
      new CustomEvent<User>('remove', {
        detail: this.user,
      })
    );
  }
}
