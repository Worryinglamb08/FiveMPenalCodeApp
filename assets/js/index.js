function myFunction() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  const con = document.getElementById("container");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
function add() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function hover() {
  document.getElementById("myDropdown").classList.toggle("show");
}
function dehover() {
  document.getElementById("myDropdown").classList.remove("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      // if (openDropdown.classList.contains("show")) {
      //   openDropdown.classList.remove("show");
      // }
    }
  }
};
