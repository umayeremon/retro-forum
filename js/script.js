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
        <button class="btn"><img src="images/Icon/email 1.svg" alt=""></button>
      </div>
    </div>
    `
    mainCardContainer.appendChild(cardContainer);
    console.log(card)
  })
  
}


// handle search
const handleSearch=async()=>{
  const inputSearchField=document.getElementById("search-input-field");
  const searchText=inputSearchField.value;
  console.log(searchText);
  loadCard(searchText)
}



loadCard();