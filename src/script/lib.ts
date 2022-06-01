// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function renderBlock (elementId: string, html: string) {
  const element = document.getElementById(elementId);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  element.innerHTML = html;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function renderToast (message: { type: string; text: string; } | null,
                             action: { name: string; handler: (() => void) | null; } | null | undefined): void {
  let messageText = '';

  if (message !== null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `;
  }

  renderBlock('toast-block', messageText);

  const button = document.getElementById('toast-main-action');
  if (button !== null) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    button.onclick = function() {
      if (action != null && action.handler !== null) {
        action.handler();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      renderToast(null);
    }
  }
}
