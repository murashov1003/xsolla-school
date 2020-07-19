document.addEventListener('DOMContentLoaded', (event) => {
    getContents();
    changeFilterCities();
    changeFilterMonth();
});

const getMonth = (StringDate) => {
    return moment(StringDate, 'DD.MM.YYYY').locale('en').format('MMMM');
}

const getContents = () => {
    let concertListContainer = document.querySelector('.concert-list-container');
    for (let i = 0; i < arrayJson.length; i++) {
        let dayConcert = arrayJson[i].date.substr(0, 5);
        let html =
            `<div class="concert-list-item" city=${arrayJson[i].city} date=${getMonth(arrayJson[i].date)}>`
            + `<img class="concert-list-image" src=${arrayJson[i].image} alt="${arrayJson[i].name}">`
            + `<p class="concert-title">${arrayJson[i].name}</p>`
            + `<div class="concert-day">${dayConcert}</div>`
            + '</div>';
        concertListContainer.innerHTML += html;
    }
    hideLoader();
}

const hideLoader = () => {
    setTimeout(() => {
        const loader = document.querySelector('#loader');
        loader.style.display = 'none';
    }, 600);
}

const changeFilterCities = () => {
    const selectCities = document.querySelector('.select-cities');
    selectCities.onchange = () => {
        changeFilter();
    };
}

const changeFilterMonth = () => {
    const selectMonth = document.querySelector('.select-month');
    selectMonth.onchange = () => {
        changeFilter();
    };
}

const changeFilter = (selectValue, dataAttribute) => {
    let concertList = document.querySelectorAll('.concert-list-item');
    let selectCitiesValue = document.querySelector('.select-cities').value;
    let selectMonthValue = document.querySelector('.select-month').value;

    for (let i = 0; i < concertList.length; i++) {
        let attributeCities = concertList[i].getAttribute('city');
        let attributeMonth = concertList[i].getAttribute('date');

        if ((selectCitiesValue === attributeCities || selectCitiesValue === "All") &&
            (selectMonthValue === attributeMonth || selectMonthValue === "All")) {
            concertList[i].hidden = false
        } else {
            concertList[i].hidden = true
        }
    }

    (countConcert(concertList) > 0) ?
        attentionBody('', true) :
        attentionBody('По текущим параметрам, концерты не найдены');
}

const countConcert = (concertList) => {
    let countConcertValue = 0;
    for (let i = 0; i < concertList.length; i++) {
        (concertList[i].hidden === false) ? countConcertValue++ : '';
    }
    return countConcertValue;
}

const attentionBody = (message, hidden = false) => {
    const massageBody = document.querySelector('.massage-body');
    (hidden === true) ? massageBody.hidden = true : massageBody.hidden = false
    massageBody.innerHTML = message;
}

