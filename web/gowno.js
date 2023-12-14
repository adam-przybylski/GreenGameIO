const response = await fetch("http://localhost:8081/friend-module");
console.log(await response.text());