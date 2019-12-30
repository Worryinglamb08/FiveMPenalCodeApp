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
      document.getElementById("nothingFound").style.display = "none";
    } else {
      document.getElementById("nothingFound").style.display = "block";
      li[i].style.display = "none";
    }
  }
}
