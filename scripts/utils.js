const formatTime = (timestamp) => {
  if (!timestamp) {
    return "-- : --";
  }

  const date = new Date(timestamp);
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");

  return `${hour} : ${min}`;
};

const createHtmlElement = (element, className) => {
  const node = document.createElement(element);
  node.className = className;
  return node;
};

const delay = (duration) => new Promise((r) => setTimeout(r, duration));

const showToast = (message, type) => {
  const toastContainer = document.getElementById("toast-container");
  toastContainer.innerHTML = message;
  toastContainer.style.display = "block";

  toastContainer.style.backgroundColor = "#318f03";

  if (type === "error") {
    toastContainer.style.backgroundColor = "#ff0000";
  }

  if (type === "warning") {
    toastContainer.style.backgroundColor = "#d48404";
  }

  setTimeout(() => {
    toastContainer.style.display = "none";
  }, 5000);
};

const loader = {
  start: () => {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";
  },
  stop: () => {
    const loader = document.getElementById("loader");
    loader.style.display = "none";
  },
};
