self.addEventListener("install",(e=>{console.log("Install event!")})),self.addEventListener("activate",(e=>{console.log("Activate event!")})),self.addEventListener("fetch",(e=>{console.log("Fetch intercepted for:",e.request.url)}));