 const ipAddress=document.getElementById('IP-address');
 const button =document.getElementById('btn')
 const page1=document.getElementById('main')
 const page2 = document.getElementById('page2')
 let IpAddress;
   

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

async function fetchIpinfo(){

    const response = await fetch(`https://ipinfo.io/${IpAddress}/geo`)
    const data = await response.json();
    console.log(data)
    renderToUI(data)
    fetchPincodeinfo(data.postal)
}

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

    page2.appendChild(topdiv)
    page2.appendChild(mapDiv)
}