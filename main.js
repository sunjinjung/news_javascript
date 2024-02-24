const API_KEY='71437b60c0f2432b9eb41a103b941320'
let newsList=[]
const menus=document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

let PAGE_SIZE=20
let url=new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines`)
let totalResults=0
let page =1
const pageSize=20
const groupSize=5


const getNew = async()=>{
    try{
      url.searchParams.set("page",page) 
      url.searchParams.set("pageSize",pageSize)
      const respond=await fetch(url);
      
      const data=await respond.json();
        if(respond.status===200){
          if(data.articles.length===0){
            throw new Error("No result for this search")
          }
        newsList=data.articles;
        totalResults=data.totalResults
        render();
        paginationRender()
      }
      else{
        throw new Error(data.message)
      }
      
    } catch(error){
      errorRender(error.message)


    }
   

}
const getNews= async () =>{
    
    url= new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines`)
    getNew()
    
}

const getNewsByCategory= async (event) =>{
    const category=event.target.textContent.toLowerCase();
    console.log("category",category)
    url= new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines?category=${category}&apiKey=${API_KEY}`);
    
    getNew()


}

const getNewsByKeyword=async()=>{
    const keyword=document.getElementById("search-input").value;
    console.log("keyword",keyword);
    url=new URL(`https://magical-biscochitos-3cd9cf.netlify.app/top-headlines?q=${keyword}&apiKey=${API_KEY}`)
    getNew()
}



const imgError = (image) => {
	image.onerror = null; // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너를 제거합니다.
	image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU";
};

const render = () => {
	const newsHtml = newsList.map((news) => `<div class="row news-list">
		<div class="col-lg-4 news-image">
			<img src="${news.urlToImage}" alt="뉴스 이미지" class="news-img" onerror="imgError(this)">
		</div>
		<div class="col-lg-8 news-content">
			<h2 class="news-title">${news.title}</h2>
			<p>${news.description == null || news.description == "" ? "내용없음": news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description}</p>
			<div>${news.source.name || "no source"}  ${moment(news.publishedAt).fromNow()}</div>			
		</div>
	</div>`).join('');

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

  const errorRender=(errorMessage)=>{
    const errorHTML=`<div class="alert alert-danger" role="alert">
  <a href="#" class="alert-link"> ${errorMessage}</a>.
</div>`
    document.getElementById("news-board").innerHTML=errorHTML
  }

  getNews();

  const paginationRender=()=>{
    const pageGroup=Math.ceil(page/groupSize);
    let lastPage= pageGroup * groupSize;
    
    const totalPages=Math.ceil(totalResults/pageSize)
    const firstPage= lastPage - (groupSize-1)<=0?1: lastPage-(groupSize-1);


    if(lastPage>totalPages) {
      lastPage=totalPages;
    }

    let paginationHTML=``
    for(let i=firstPage;i<=lastPage;i++){
      paginationHTML+=`<li class="page-item ${i===page?'active':''}" onclick="MovetoPage(${i})"><a class="page-link" >${i}</a></li>`
    }
    document.querySelector(".pagination").innerHTML=paginationHTML



  }
  const MovetoPage=(pageNum)=>{
    console.log("movetopage",pageNum);
    page=pageNum;
    getNew()
  }

  //1. 버튼들에 클릭이벤트주기
  //2. 카테고리별 뉴스 가져오기
  //3. 그 뉴스를 보여주기