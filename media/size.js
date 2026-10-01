const sizeEvent = document.querySelector("#psize");
const sizeAttr = document.getElementById("psize")
let size;
sizeEvent.addEventListener("scroll", () => {
    try {
        if (size = sizeAttr.getAttribute("size")) {
            console.log(size); // make it change the size of the pen
            sizeAttr.setAttribute("size", size);
        }
    } catch (error) {
        console.log("Error, could not fetch size value");
    }
});