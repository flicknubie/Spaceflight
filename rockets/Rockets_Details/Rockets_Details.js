const urlParams = new URLSearchParams(window.location.search);
const rocketName = urlParams.get('name');

console.log(rocketName);