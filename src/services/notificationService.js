let notify = null;

export function setNotify(fn) {
  notify = fn;
}

export function notifyError(message) {
  if (notify) {
    notify(message);
  } else {
    console.error("Ошибка:", message);
  }
}