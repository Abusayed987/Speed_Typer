// caragories section 
const loadCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category));
}
const displayCatagories = (catagories) => {
    // console.log(catagories);

    const caragorySection = document.getElementById('catagory_section');

    catagories.forEach(catagori => {
        const caragoryDiv = document.createElement('div');
        caragoryDiv.innerHTML = `
        <div>
            <button onclick="loadNewsDetails('${catagori.category_id}')" style="background-color:#EEEFFF;color: #5D5FEF;" class=" border border-0  rounded ">${catagori.category_name}</button>
        </div>
    `;
        caragorySection.appendChild(caragoryDiv)
    });


}
loadCatagories();

const loadNewsDetails = (catagori_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${catagori_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}
const displayNewsDetails = (newsDetails) => {
    console.log(newsDetails);
    const newsDetailsSection = document.getElementById('news_details');

    newsDetails.forEach(newsDetail => {
        console.log(newsDetail);
        const newsDetailDiv = document.createElement('div');
        newsDetailDiv.innerHTML = `
        <div class="d-flex mt-4 bg-white p-4 rounded"> 
        <div class="">
            <img class="img-fluid rounded" src="${newsDetail.thumbnail_url}" alt="thamnnail img">
        </div>
        <div class="ms-3">
            <h4 class="container">${newsDetail.title}</h4>
            <p class="text-secondary container">${newsDetail.details.slice(0, 550)}...</p>
            <div class="container d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <div class="p-1">
                        <img style="width:40px" class=" img-fluid rounded-circle " src="${newsDetail.author.img}" alt="writer img">
                    </div>
                    <div class="ms-1">
                        <h6>${newsDetail.author.name}</h6>
                        <p class="text-secondary">${newsDetail.author.published_date.slice(0, 11)}</p>
                    </div>
                </div>
                <h6>Total Views: ${newsDetail.total_view ? newsDetail.total_view : 'no View'}</h6>
                <button class="bg-primary text-white   border border-0 rounded ">show more</button>
            </div>
        </div>
    </div>  
        `
        newsDetailsSection.appendChild(newsDetailDiv);
    });


}

loadNewsDetails('01')