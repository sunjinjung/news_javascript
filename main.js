const API_KEY='71437b60c0f2432b9eb41a103b941320'
let news=[]
let PAGE_SIZE=20
const getLatesNews=async()=>{
    
    const url= new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=71437b60c0f2432b9eb41a103b941320`)
    
    const respond=await fetch(url)
    const data=await respond.json()
    news=data.articles
   
    console.log('ddd',news)
}
getLatesNews()