const API_KEY='71437b60c0f2432b9eb41a103b941320'
let news=[]
let PAGE_SIZE=20
const getLatesNews=async()=>{
    
    const url= new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?page=1&pageSize=20`)
    
    const respond=await fetch(url)
    const data=await respond.json()
    news=data.articles
   
    console.log('ddd',news)
}
getLatesNews()