const variable = "variable";
let imported = document.createElement('script');
imported.src = '/UI/assets/js/template.js';
document.body.insertBefore(imported, document.getElementById('main-js'));
// 
document.body.onload = () => {
    console.log(variable)

}