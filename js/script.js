const loadCard=async()=>{
  const res=await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
  const posts=await res.json();
  const cards=posts.posts;
  console.log(cards);
  displayCard(cards);
}

const displayCard= cards=>{
  const mainCardContainer=document.getElementById("main-card-container")
  cards.forEach(card=>{
    let circle='';
    if(card.isActive){
      circle= `<div id="red-circle" class="w-3 h-3 bg-green-600 rounded-full absolute right-[-3px] top-[-3px]"></div>`
    }
    else{
      circle=`<div id="red-circle" class="w-3 h-3 bg-red-600 rounded-full absolute right-[-3px] top-[-3px]"></div>`
    }
    const cardContainer=document.createElement("div");
    cardContainer.classList=`card card-side bg-[#797DFC1A]  p-6`;
    cardContainer.innerHTML=`
    <div class="relative">
      <img src="${card.image}" alt="Movie" class="w-44 h-36 rounded-xl"/>
      ${circle}
      </div>
    <div class="card-body">
      <div class="flex flex-row">
        <p class="text-xl font-medium text-[#12132DCC]"># ${card.category}</p>
        <p class="text-xl font-medium text-[#12132DCC]">Author : ${card.author.name}</p>
      </div>
      <h2 class="text-2xl text-[#12132D] font-bold">${card.title}</h2>
      <p class="text-xl text-[#12132D99]">${card.description}</p>
      <hr>
      <div class="flex flex-row gap-8">
        <div class="flex flex-row items-center gap-2">
          <img src="images/Icon/message.svg" alt="" >
          <p class="text-xl text-[#12132D99]">${card.comment_count}</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <img src="images/Icon/eye.svg" alt="" >
          <p class="text-xl text-[#12132D99]">${card.view_count}</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <img src="images/Icon/clock.svg" alt="" >
          <p class="text-xl text-[#12132D99]">${card.posted_time} min</p>
        </div>
      </div>
      <div class=" absolute right-2 bottom-8">
        <button class="btn"><img src="images/Icon/email 1.svg" alt=""></button>
      </div>
    </div>
    `
    mainCardContainer.appendChild(cardContainer)

    console.log(card)
  })
}





loadCard();