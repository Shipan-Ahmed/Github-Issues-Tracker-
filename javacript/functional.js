// console.log("funtional js is comming! bro");


let currentTab = "all";

const loadCardInfo = async (issueId) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    const issue = data.data;
    DisplayCardInfo(issue);
}

// assignee: "jane_smith";
// author: "john_doe";
// createdAt: "2024-01-15T10:30:00Z";
// description: "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.";
// id: 1;
// labels: (2)[("bug", "help wanted")];
// priority: "high";
// status: "open";
// title: "Fix navigation menu on mobile devices";
// updatedAt: "2024-01-15T10:30:00Z";
                

const DisplayCardInfo = (issue) => {
    // console.log(issue);
    const cardInfoContainer = document.getElementById("cardInfoContainer");
    cardInfoContainer.innerHTML = `
        <h2 class="font-bold text-xl">${issue.title}</h2>
        <p class="space-x-1 flex justify-start items-center"><span class="${issue.status === "open" ? "bg-green-400" : "bg-purple-300"} rounded-xl p-2">${issue.status} </span><span class="w-2 h-2 bg-gray-400 rounded-full inline-block mx-2"></span><span class="text-gray-500">${issue.author? issue.status: ""} by ${issue.author? issue.author: "Author not found"} </span><span class="w-2 h-2 bg-gray-400 rounded-full inline-block mx-2"></span><span class="text-gray-500">${new Date(issue.createdAt).toLocaleDateString()}</span></p>
        <p class="space-x-2">${createElement(issue.labels)}</p>
        <p class="text-gray-500">${issue.description} </p>
        <div class="flex  gap-30  justify-start items-center">
            <div>
                <p class="text-gray-500">Assignee:</p>
                <p class="font-medium">${issue.assignee ? issue.assignee : "Not found"} </p>
            </div>
            <div>
                <p class="text-gray-500">Priority:</p>
                <p class="font-medium ${issue.priority === "low" ? "bg-blue-100 text-blue-400" : issue.priority === "medium" ? "bg-yellow-100 text-yellow-400" : "bg-red-100 text-red-400"} px-6 py-1 rounded-2xl">${issue.priority.toUpperCase()} </p>
            </div>
        </div>
    `;

    my_modal_5.showModal();
}

const manageSpinner = (isLoading) => {
  const spinnerSection = document.getElementById("spinner");
  if (isLoading) {
    spinnerSection.classList.remove("hidden");
    document.getElementById("cardContainer").classList.add("hidden");
  } else {
    spinnerSection.classList.add("hidden");
    document.getElementById("cardContainer").classList.remove("hidden");
  }
};

const createElement = (levels) => {
  const arr = levels.map(
    (el) =>
      `<span class="p-1 gap-1 text-center items-center bg-green-100  rounded-xl" > ${el.toUpperCase()}</span>`,
  );
  return arr.join(" ");
};

const loadData = async (tab) => {
    manageSpinner(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    if (tab === "all") {
        renderUI(data.data);
    } else if (tab === "open") {
        const openIssues = data.data.filter(issue => issue.status === "open");
        renderUI(openIssues);
    } else {
        const closedIssues = data.data.filter(issue => issue.status === "closed");
        renderUI(closedIssues);
    }
}

//  "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"


const renderUI = (issuesArr) => {

    const issuesContainer = document.getElementById("issues");
    issuesContainer.innerText = issuesArr.length;

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    issuesArr.forEach(issue => {
        const card = document.createElement("div");
        card.classList.add("space-y-2", "border-t-4", issue.status === "open" ? "border-green-500" : "border-purple-500", "shadow-lg", "rounded-xl");
        card.addEventListener("click", () => loadCardInfo(issue.id));
        card.innerHTML = `
            <div class="space-y-2  p-4  shadow ">
                 <div class="flex justify-between items-center ">
                     <p><img class="w-6 h-6 mx-auto" src=" ${issue.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"}" alt="Open Status Logo"></p>
                    <p class="${issue.priority === "low" ? "bg-blue-100 text-blue-400" : issue.priority === "medium" ? "bg-yellow-100 text-yellow-400" : "bg-red-100 text-red-400"} px-8 py-1 rounded-2xl">${issue.priority.toUpperCase()}</p>
                 </div>
                 <h2 class="font-semibold text-xl">${issue.title}</h2>
                 <p class="text-gray-600">${issue.description}</p>
                 <p class="space-x-2 flex flex-start">${createElement(issue.labels)}</p>
             </div>
             <div class="gap-4 p-4  ">
                 <p class="text-gray-600">#${issue.id} by ${issue.author}</p>
                 <p class="text-gray-600">${new Date(issue.createdAt).toLocaleDateString()}</p>
             </div>

        `;
        cardContainer.appendChild(card);
    })
    manageSpinner(false);

};


// btn -swtching

document.querySelectorAll(".tabBtn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tabBtn").forEach(btn => {
                btn.classList.remove("bg-blue-700", "text-white");
                btn.classList.add("bg-gray-200", "text-black");
        });
        btn.classList.remove("bg-gray-200", "text-black");
        btn.classList.add("bg-blue-700", "text-white");
        currentTab = btn.dataset.tab;
        // console.log(currentTab);
        loadData(currentTab);
    })
})


// for search functionality


document.getElementById("searchBtn").addEventListener("click", () => {
    const inputValue = document.getElementById("input").value.trim().toLowerCase();
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
            const allIssues = data.data;
            const foundIssues = allIssues.filter((issue) =>
                issue.title.toLowerCase().includes(inputValue)
            );
            renderUI(foundIssues);
            
        });
});

// Initial load
loadData(currentTab);