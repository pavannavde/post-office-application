 const ipAddress=document.getElementById('IP-address');
 const button =document.getElementById('btn')
 const page1=document.getElementById('main')
 const page2 = document.getElementById('page2')
 let IpAddress;
 let token ='580370a92cf7e5'  
 
// function to get IP address
async function getIPAddress(){

    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    console.log(data)
    ipAddress.innerText= data.ip;
    IpAddress=data.ip;
}

window.addEventListener('load',getIPAddress);

button.addEventListener('click',()=>{
   page1.style.display="none";
   page2.style.display="flex";
   fetchIpinfo()
});


// fetching IPAddress info 
async function fetchIpinfo(){
   try{
    const response = await fetch(`https://ipinfo.io/${IpAddress}/geo?token=${token}`)
    const data = await response.json();
    console.log(data)
    renderToUI(data)
    fetchPincodeinfo(data.postal)
   }
   catch(error){
     alert(`An error occured : ${error}`)
   }
    
}

//rendering data to Ui like lat long info , map ,etc
 function renderToUI(data){
    let location =data.loc.split(",")
    console.log(location)
    const topdiv= document.createElement("div")
    topdiv.className='top'
    topdiv.innerHTML=`<h1>IP Address : <span>${data.ip}</span></h1>
    <div>
        <div>
            <p>Lat : ${location[0]}</p>
            <p>Long : ${location[1]}</p>
        </div>
       <div>
            <p>City : ${data.city}</p>
            <p>Region : ${data.region}</p>
        </div>
        <div>
            <p>Organisation : ${data.org}</p>
            <p>HostName : </p>
        </div>
    </div>`
    const mapDiv= document.createElement("div")
    mapDiv.className='map'
    mapDiv.innerHTML=`<h1>Your Current Location</h1>
    <iframe src="https://maps.google.com/maps?q=${location[0]},${location[1]}&z=15&output=embed" style="width:90%;  height:500px;" frameborder="0" style="border:0"></iframe>`

    const heading1 = document.createElement("h1")
    heading1.innerText='More Information  About You'
     
    let date =  new Date().toLocaleString("en-US", { timeZone: `${data.timezone}`});
    const infoDiv = document.createElement("div")
    infoDiv.className='more-information'
    infoDiv.innerHTML=`<p>Time Zone : ${data.timezone}</p>
    <p> Date and Time : ${date}</p>
    <p>Pincode : ${data.postal}</p>
    <p>Message : <span id='msg'></span></p>`

    const heading2 = document.createElement("h1")
    heading2.innerText='Post Office Near You'

    const searchDiv = document.createElement("div")
    searchDiv.className="searchbar"
    searchDiv.innerHTML=`<img src="./assets/Vector (1).svg" alt="Search">
    <input type="text" placeholder="Search by name" id="search">`

    const cardsDiv = document.createElement("div")
    cardsDiv.className='cards'
    cardsDiv.setAttribute('id','cards')
    page2.append(topdiv,mapDiv,heading1,infoDiv,heading2,searchDiv,cardsDiv)
    
    
}

let arrayOffices=[];
//fetching pincode information and rendireing into the cards 
 async function fetchPincodeinfo(pincode){

    try{
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        const pinData= await response.json();
        const cards = document.getElementById('cards')
     
        const msg=document.getElementById('msg')
        msg.innerText=`${pinData[0].Message}`
     
        let Offices = pinData[0].PostOffice;
     //   console.log(pinData.PostOffice)
     //rendering card to ui
     let count=1;
        Offices.forEach(office => {
         const card = document.createElement("div")
         card.className='card'
         card.setAttribute('id',`${count}`)
         card.innerHTML=`<p class="name">Name : ${office.Name}</p>
         <p class="branch"> Branch Type : ${office.BranchType}</p>
         <p>Delivery status : ${office.DeliveryStatus}</p>
         <p>District : ${office.District}</p>
         <p>Division : ${office.Division}</p>`
         cards.append(card);
         let map ={id:`${count}`,name:`${office.Name}`,branch:`${office.BranchType}`}
         arrayOffices.push(map);
         count++;
        });
        
    }
   catch(error)
   {
    alert(`An error occured : ${error}`)
   }

 }
 
// filtering offices
// function filterOffice(searchValue){
//      alert("hey")
//     searchValue = searchValue.toLowerCase()
//     arrayOffices.forEach(office=>{
//        let name = office.name.toLowerCase();
//        let branch =office.branch.toLowerCase();
//        if(name.includes(searchValue) || branch.includes(searchValue))
//        {
//         const element = document.getElementById(`${office.id}`)
//         element.style.display='none';
//        }

//     })

// }






/* <div class="card">
            <p>Name : pavan navde</p>
            <p> Branch Type : xxx</p>
            <p>Delivery status : ok</p>
            <p>District : ytl</p>
            <p>Division : amt</p>
        </div> */