const API_KEY='71437b60c0f2432b9eb41a103b941320'
let newsList=[]
const menus=document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

let PAGE_SIZE=20
const getNews= async () =>{
    
    const url= new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines`)
    
    const respond=await fetch(url);
    const data=await respond.json();
    newsList=data.articles;
    render();
    
}

const getNewsByCategory= async (event) =>{
    const category=event.target.textContent.toLowerCase();
    console.log("category",category)
    const url= new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines?category=${category}&apiKey=${API_KEY}`);
    const respond= await fetch(url);
    const data= await respond.json()
    console.log("ddd",data);
    newsList=data.articles;
    render();


}

const getNewsByKeyword=async()=>{
    const keyword=document.getElementById("search-input").value;
    console.log("keyword",keyword);
    const url=new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines?q=${keyword}&apiKey=${API_KEY}`)
    const respond=await fetch(url)
    const data=await respond.json()
    console.log("keyword data",data)
    newsList=data.articles;
    render()
}



const imgError = (image) => {
	image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
	const newsHtml = newsList.map(news => `<div class="row news-list">
		<div class="col-lg-4 news-image">
			<img src="${news.urlToImage}" alt="뉴스 이미지" class="news-img" onerror="imgError(this)">
		</div>
		<div class="col-lg-8 news-content">
			<h2 class="news-title">${news.title}</h2>
			<p>${news.description == null || news.description == "" ? "내용없음": news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description}</p>
			<div>${news.source.name || "no source"}  ${moment(news.publishedAt).fromNow()}</div>			
		</div>
	</div>`
	).join('');

	document.getElementById('news-board').innerHTML = newsHtml;

	};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  getNews();

  //1. 버튼들에 클릭이벤트주기
  //2. 카테고리별 뉴스 가져오기
  //3. 그 뉴스를 보여주기
