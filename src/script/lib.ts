export function renderBlock (elementId = '', html = ''):void {
  const element = document.getElementById(elementId);
  if(element) {
    element.innerHTML = html;
  }
}

export function renderToast(message: { type: string; text: string } | null,
                            action: { handler: () => void; name: string }): void {
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

    button.onclick = function(): void {
      if (action !== null && action.handler !== null) {
        action.handler();
      }

      renderToast(null, { handler: () => null, name: '' });
    }
  }
}
