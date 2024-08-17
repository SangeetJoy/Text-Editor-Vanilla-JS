const boldButton = document.getElementById("bold-btn");
const italicButton = document.getElementById("italic-btn");
const underlineButton = document.getElementById("underline-btn");
const colorPicker = document.querySelector(".color__picker");
const leftAlign = document.getElementById("left-align-btn");
const rightAlign = document.getElementById("right-align");
const centerAlign = document.getElementById("center-align");
const createLink = document.getElementById("create-link");
const unlink = document.getElementById("unlink");
const contentArea = document.getElementById("editor__content");
const strikeThrough = document.getElementById("strikethrough");
const unOrderedList = document.getElementById("unordered-list");
const fileSaveList = document.getElementById("file-save-list");
const fileNameTitle = document.getElementById("filename");
const downloadButton = document.getElementById("downloadButton");
const downloadOptionsList = document.getElementById("downloadOptionsList");
const orderedList = document.getElementById("orderedList");

const formatDoc = (cmd, value = null) => {
  if (value) document.execCommand(cmd, false, value);
  else document.execCommand(cmd);
};

const addLink = () => {
  const url = prompt("Enter a link: ");
  formatDoc("createLink", url);
};

contentArea.addEventListener("mouseenter", () => {
  const a = document.querySelectorAll("a");
  if (a.length) {
    a.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        contentArea.setAttribute("contentEditable", false);
        item.target = "_blank";
      });
      item.addEventListener("mouseleave", () => {
        contentArea.setAttribute("contentEditable", true);
      });
    });
  }
});

const fileSave = (value) => {
  console.log({ value });
  if (value === "txt") {
    const blob = new Blob([contentArea.innerText]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileNameTitle.value}.txt`;
    console.log({ title: fileNameTitle.value });
    link.click();
  }
  if (value === "pdf") {
  }
};

downloadButton.addEventListener("click", () => {
  downloadOptionsList.classList.toggle("hidden");
});

document.querySelectorAll(".download-option").forEach((option) => {
  option.addEventListener("click", () => {
    const value = option.getAttribute("data-value");
    downloadOptionsList.classList.add("hidden");
    fileSave(value);
  });
});

document.addEventListener("click", (event) => {
  if (
    !downloadButton.contains(event.target) &&
    !downloadOptionsList.contains(event.target)
  ) {
    downloadOptionsList.classList.add("hidden");
  }
});

boldButton.addEventListener("click", () => formatDoc("bold"));

italicButton.addEventListener("click", () => formatDoc("italic"));

underlineButton.addEventListener("click", () => formatDoc("underline"));

leftAlign.addEventListener("click", () => formatDoc("justifyLeft"));

rightAlign.addEventListener("click", () => formatDoc("justifyRight"));

centerAlign.addEventListener("click", () => formatDoc("justifyCenter"));

createLink.addEventListener("click", () => addLink());

unlink.addEventListener("click", () => formatDoc("unlink"));

unOrderedList.addEventListener("click", () => formatDoc("insertUnorderedList"));

orderedList.addEventListener("click", () => formatDoc("insertOrderedList"));

strikeThrough.addEventListener("click", () => formatDoc("strikethrough"));

colorPicker.addEventListener("input", () =>
  formatDoc("forecolor", colorPicker.value)
);
