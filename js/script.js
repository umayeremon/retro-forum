// loading card
const loadCard=async(searchText='')=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const posts=await res.json();
  const cards=posts.posts;
  displayCard(cards);
}

// display card
const displayCard= cards=>{
  const mainCardContainer=document.getElementById("main-card-container");
  mainCardContainer.textContent='';
  cards.forEach(card=>{
    // circle
    let circle='';
    if(card.isActive){
      circle= `<div id="red-circle" class="w-3 h-3 bg-green-600 rounded-full absolute right-[-3px] top-[-3px]"></div>`
    }
    else{
      circle=`<div id="red-circle" class="w-3 h-3 bg-red-600 rounded-full absolute right-[-3px] top-[-3px]"></div>`
    }
    const cardContainer=document.createElement("div");
    cardContainer.classList=` flex flex-col lg:flex-row rounded-xl relative  bg-[#797DFC1A]  p-6`;
    cardContainer.innerHTML=`
    <div class="relative flex mx-auto lg:mx-0">
      <img src="${card.image}" alt="Movie" class="w-40 lg:w-28 h-40 lg:h-28 rounded-xl"/>
      ${circle}
      </div>
    <div class="ml-2 lg:ml-6 space-y-2 lg:space-y-3">
      <div class="flex flex-col lg:flex-row gap-0 lg:gap-8 mt-2 lg:mt-0">
        <p class="text-lg lg:text-xl font-medium text-[#12132DCC]"># ${card.category}</p>
        <p class="text-lg lg:text-xl font-medium text-[#12132DCC]">Author : ${card.author.name}</p>
      </div>
      <h2 class="text-lg lg:text-2xl text-[#12132D] font-bold">${card.title}</h2>
      <p class="text-lg lg:text-xl text-[#12132D99]">${card.description}</p>
      <hr>
      <div class="flex flex-row gap-8">
        <div class="flex flex-row items-center gap-2">
          <img src="images/Icon/message.svg" alt="" >
          <p class="text-sm lg:text-xl text-[#12132D99]">${card.comment_count}</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <img src="images/Icon/eye.svg" alt="" >
          <p class="text-sm lg:text-xl text-[#12132D99]">${card.view_count}</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <img src="images/Icon/clock.svg" alt="" >
          <p class="text-sm lg:text-xl text-[#12132D99]">${card.posted_time} min</p>
        </div>
      </div>
      <div class=" absolute right-0 lg:right-2 top-0 lg:top-auto lg:bottom-4">
        <button onclick="handleShowData('${card.title.replace(/'/g,'')}', ${card.view_count})" class="btn"><img src="images/Icon/email 1.svg" alt=""></button>
      </div>
    </div>
    `
    mainCardContainer.appendChild(cardContainer);
    // console.log(card)
    
  })
  setTimeout( ()=> {
    loadingSpinner(false)
  }, 2000);
}

// show data handler
let count=0;
const handleShowData=(title, viewCount)=>{
  const cardTitle=title;
  const cardViewCount=viewCount;
  console.log(cardTitle, cardViewCount);
  const readContainer=document.getElementById("read-container");
  const countContainer=document.getElementById("count");
  const markReadContainer=document.createElement("div");
  markReadContainer.classList=`flex flex-row bg-white px-6 lg:px-8 py-4 gap-4 rounded-xl`;
  markReadContainer.innerHTML=`
  <p class=" text-sm lg:text-lg font-semibold text-[#12132D]">${cardTitle}</p>
  <div class="flex flex-row items-center">
    <img src="images/Icon/eye.svg" alt="">
    <p  class="text-xs lg:text-lg text-[#12132D99]">${cardViewCount}</p>
  </div>
  `
  readContainer.appendChild(markReadContainer);
  count= count+1;
  countContainer.innerText=count;
  console.log(count)
}



// loading spinner
const loadingSpinner=(spinner)=>{
  const spinnerContainer=document.getElementById("loading-spinner");
  if(spinner){
    spinnerContainer.classList.remove("hidden");
  }
  else{
    spinnerContainer.classList.add("hidden");
  }
}

// handle search
const handleSearch=async()=>{
  loadingSpinner(true)
  const inputSearchField=document.getElementById("search-input-field");
  const searchText=inputSearchField.value;
  console.log(searchText);
  loadCard(searchText)
}

// loading latest card
const loadLatestCard=async()=>{
  const res= await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
  const data= await res.json();
  displayLatestCard(data)
}

// display latest card
const displayLatestCard= data=>{

  const latestCardMainContainer=document.getElementById("latest-card-main-container")
  data.forEach(data=>{
    // console.log(data);

    const latestCardContainer=document.createElement("div");
    latestCardContainer.classList=`card bg-base-100 border border-[#12132D26] rounded-xl p-2 mx-2 lg:mx-0`;
    latestCardContainer.innerHTML=`
    <div class="px-4 pt-4">
      <img src="${data.cover_image}" alt="" class="rounded-xl w-full" />
    </div>
    <div class=" flex flex-row gap-2 pt-4 pl-4 items-center">
      <img src="images/Icon/date.svg" alt="">
      <p class="text-sm text-[#12132D99]">${data?.author?.posted_date|| "No publish date"}</p>
    </div>
    <div class=" ml-4 mt-2 items-start space-y-2">
      <h2 class="text-lg lg:text-xl font-extrabold text-[#12132D]">${data.title}</h2>
      <p class="text-sm lg:text-base text-[#12132D99]">${data?.description}</p>
    <div class="card-actions space-x-4 pt-2">
      <img src="${data?.profile_image}" alt="" class="w-12 lg:w-16 rounded-full ">
      <div>
        <h4 class="text-base lg:text-xl text-[#12132D] font-bold">${data.author.name}</h4>
        <p class="text-sm lg:text-base text-[#12132D99]">${data?.author?.designation ||"Unknown"}</p>
      </div>
    </div>
      </div>
    `
    latestCardMainContainer.appendChild(latestCardContainer);
  })
}



loadLatestCard();
loadCard();