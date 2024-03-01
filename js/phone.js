const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  // step number 1 jeikane amra boshabo
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  // display show all button if there are more than 12 phones
  const showAllButton = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove('hidden');
  } else {
    showAllButton.classList.add('hidden');
  }
  // display only firsy 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach(phone => {
    console.log(phone);
    //2 create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card p-10 bg-gray-100 shadow-xl`;
    // set inner html
    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Shoes" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>`;
    // step 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading dots
  toggleLoadingDot(false);
};
//
const handleShowDetail = async id => {
  console.log('click', id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
};
// handle search button
const handleButoon = isShowAll => {
  toggleLoadingDot(true);
  const searchFild = document.getElementById('search-fild');
  const searchText = searchFild.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};
const toggleLoadingDot = isLoding => {
  const loadingDot = document.getElementById('loading-dots');
  if (isLoding) {
    loadingDot.classList.remove('hidden');
  }
  loadingDot.classList.add('hidden');
};
// handle show all
const handleShowAll = () => {
  handleButoon(true);
};
// loadPhone();
