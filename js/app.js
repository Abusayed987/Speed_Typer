// caragories section 
const loadCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category));
}
const displayCatagories = (catagories) => {
        console.log(catagories);
    
        const caragorySection = document.getElementById('catagory_section');

    catagories.forEach(catagori => {
        const caragoryDiv = document.createElement('div');
        caragoryDiv.innerHTML = `
        <div>
            <button onclick="" class=" border border-0 p-2 rounded text-secondary">${catagori.category_name}</button>

        </div>
    `;
    caragorySection.appendChild(caragoryDiv)
    });


}

loadCatagories();