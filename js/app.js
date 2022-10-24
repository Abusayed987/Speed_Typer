// caragories section ------------------------------------------------------------------

const loadCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category));
}
const displayCatagories = (catagories) => {

    const caragorySection = document.getElementById('catagory_section');

    catagories.forEach(catagori => {
        const caragoryDiv = document.createElement('div');
        caragoryDiv.innerHTML = `
        <div>
            <button onclick="loadNewsDetails('${catagori.category_id}')"  style="background-color:#EEEFFF;color: #5D5FEF;"  class=" border border-0  rounded ">${catagori.category_name}</button>
        </div>
    `;
        caragorySection.appendChild(caragoryDiv);
    });

}
loadCatagories();
// toggle spiner 
const toggleSpiner = isLoading => {
    const spiner = document.getElementById('loder');
    if (isLoading) {
        spiner.classList.remove('d-none')
    } else {
        spiner.classList.add('d-none')
    }
}


// click button then Show news ---------------------------------------------------------------

const loadNewsDetails = (catagori_id) => {
    // loder start 
    toggleSpiner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${catagori_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data));
}
// message no data 



const displayNewsDetails = (newsDetails) => {

    // console.log(newsDetails);
    const items = document.getElementById('items_number');
    items.innerHTML = `
    <div>
        <p class="bg-white p-3 mt-5 rounded "> ${newsDetails.length ? newsDetails.length : 'No Data'} items found for This Category !</p>
    </div>
    `;
    const messageSection = document.getElementById('no_data_found');
    if (newsDetails.length === 0 ) {
        messageSection.classList.remove('d-none')
    } else {
        messageSection.classList.add('d-none')
    };
    
    const newsDetailsSection = document.getElementById('news_details');
    newsDetailsSection.innerText = '';
    newsDetails.forEach(newsDetail => {
        const newsDetailDiv = document.createElement('div');
        newsDetailDiv.innerHTML = `
        <div class="d-flex mt-4  bg-white p-4 rounded"> 
        <div class="">
            <img class="img-fluid rounded" src="${newsDetail.thumbnail_url}" alt="thamnnail img">
        </div>
        <div class="ms-3">
            <h4 class="container">${newsDetail.title}</h4>
            <p class="text-secondary container">${newsDetail.details.slice(0, 500)}...</p>
            <div class="container d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <div class="p-1">
                        <img style="width:40px" class=" img-fluid rounded-circle " src="${newsDetail.author.img}" alt="writer img">
                    </div>
                    <div class="ms-1">
                        <h6>${newsDetail.author.name ? newsDetail.author.name : 'No data     found'}</h6>
                        <p class="text-secondary">${newsDetail.author.published_date ? newsDetail.author.published_date.slice(0, 11) : 'No date found'}</p>
                    </div>
                </div>
                <h6>Total Views: ${newsDetail.total_view ? newsDetail.total_view : 'no View'}</h6>
                
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showmoreModal">
                Show More
                </button>

                <div class="modal fade" id="showmoreModal" data-bs-backdrop="static"        data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="showmoreModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                                 <h1 class="modal-title fs-5" id="showmoreModalLabel">${newsDetail.title}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                 </div>
                                    <div class="modal-body"> 
                                    Badge: ${newsDetail.rating.badge}! <br><br>
                                    Raring: ${newsDetail.rating.number} out of 5 
                                    </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                         </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>  
        `;
        newsDetailsSection.appendChild(newsDetailDiv);
    });
    // stop loder 
    toggleSpiner(false)
}
loadNewsDetails('05')