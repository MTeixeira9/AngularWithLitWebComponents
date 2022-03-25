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
    .card-content input {
      width: 90%;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    .card-actions {
      display: flex;
      justify-content: space-between;
    }
  `;

  @property({ type: Object }) user?: User;
  @property({ type: Boolean }) editActive = false;
  @property({ type: String }) editFullName = '';
  @property({ type: String }) editRole = '';

  render() {
    if (this.user === undefined) {
      return '';
    }

    return !this.editActive
      ? html`
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
        `
      : html`
          <div class="card">
            <img
              width="160px"
              src=${this.user.avatar
                ? this.user.avatar
                : 'assets/images/avatar.png'}
            />
            <div class="card-content">
              <input
                type="text"
                value="${this.editFullName}"
                @change=${this.updateFullNameValue}
              />
              <input
                type="text"
                value="${this.editRole}"
                @change=${this.updateRoleValue}
              />
              <div class="card-actions">
                <button @click=${this.handleSave}>Save</button>
              </div>
            </div>
          </div>
        `;
  }

  private handleEdit(): void {
    this.editActive = true;
    this.editFullName = this.user?.fullName || '';
    this.editRole = this.user?.role || '';
  }

  private handleRemove(): void {
    this.dispatchEvent(
      new CustomEvent<User>('remove', {
        detail: this.user,
      })
    );
  }

  private handleSave(): void {
    this.editActive = false;

    if (this.user) {
      this.user.fullName = this.editFullName;
      this.user.role = this.editRole;
    }

    this.editFullName = '';
    this.editRole = '';

    this.dispatchEvent(
      new CustomEvent<User>('save', {
        detail: this.user,
      })
    );
  }

  updateFullNameValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.editFullName = target.value;
  }

  updateRoleValue(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.editRole = target.value;
  }
}
