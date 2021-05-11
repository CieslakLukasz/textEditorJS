document.addEventListener("DOMContentLoaded", () => {
  const editBtns = document.querySelectorAll(".editBtn");
  const editor = document.querySelector("#editor");
  const load = document.querySelector("#load");
  const save = document.querySelector("#save");

  editor.setAttribute("contentEditable", "true");
  editor.focus();

  //after clicking 'Load' button we need to trigger input type file:
  load.addEventListener("click", () => {
    const loadInput = document.createElement("input");
    loadInput.style = "display:none";
    loadInput.type = "file";
    loadInput.accept = ".json";

    //when we change file to load we need to use FileReader() and put results into our #editor div
    loadInput.addEventListener("change", (e) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsedObject = JSON.parse(e.target.result);
        editor.innerHTML = parsedObject.text;
      };
      reader.readAsText(e.target.files[0]);
    });

    loadInput.click();
  });

  //when we click on 'save' we need to add anchor with download attribute and force click on it.
  save.addEventListener("click", () => {
    const filename = "new file.json";
    const content = { text: editor.innerHTML };
    const uri =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(content));

    const link = document.createElement("a");
    link.href = uri;
    link.download = filename;
    link.style = "display:none";

    link.click();
  });

  // we used execCommand to let user format contenteditable #editor div
  const format = (aCommandName) => {
    document.execCommand(aCommandName, false);
  };


  //to not lose focus / selection in our editor we trigger our format() on mousedown not on click, preventing clicking itself with preventDefault()
  editBtns.forEach((el) => {
    el.addEventListener("mousedown", (e) => {
      format(el.name);
      e.preventDefault();
    });
  });
});
