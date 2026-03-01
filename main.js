let input = document.querySelector(".box_input input");
let btn = document.querySelector(".get_btn");
let boxOfData = document.querySelector(".show_data");

btn.addEventListener("click", () => {
  GetRepo();
});

// function Get repos
function GetRepo() {
  if (input.value === "") {
    boxOfData.innerHTML = "<span>please Write Github UserName !</span>";
  } else {
    //   Api of GitHub
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Please write the correct GitHub username!");
        
         }
        return response.json();
      })

      .then(function (repoes) {
        //in case repo is  Not found
       console.log(repoes.ok);
        // empty boxOfData to Show data
        boxOfData.innerHTML = "";
        repoes.forEach((ele) => {
          // create div to and link repo and count of star
          // create div
          let divOfRepo = document.createElement("div");
          divOfRepo.classList.add("repo");
          let textOfRepo = document.createTextNode(ele.name);
          divOfRepo.appendChild(textOfRepo);

          // create link
          let urlOfRepo = document.createElement("a");
          let textOflink = document.createTextNode("visit");
          urlOfRepo.setAttribute("target", "_blank");
          urlOfRepo.href = `https://github.com/${input.value}/${ele.name}`;
          urlOfRepo.appendChild(textOflink);
          divOfRepo.appendChild(urlOfRepo);

          // create count of start
          let Star = document.createElement("span");
          let textOfSpan = document.createTextNode(
            "Stars" + " " + ele.stargazers_count,
          );
          Star.appendChild(textOfSpan);
          divOfRepo.appendChild(Star);
          // append in page
          boxOfData.appendChild(divOfRepo)
        });
      })
     .catch( params=> {
       boxOfData.innerHTML=`<span>${params.message}</span>`
     })
  }
}
