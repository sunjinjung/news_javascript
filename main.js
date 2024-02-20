const API_KEY='71437b60c0f2432b9eb41a103b941320'
let news=[]
let PAGE_SIZE=20
const getLatesNews=async()=>{
    
    const url= new URL(`https://magical-biscochitos-3cd9cf.netlify.app/?q=${keyword}&country=kr&page=1&pageSize=${PAGE_SIZE}`)
    
    const respond=await fetch(url)
    const data=await respond.json()
    news=data.articles
   
    console.log('ddd',news)
}
getLatesNews()