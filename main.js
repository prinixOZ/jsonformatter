let url = "https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json"
let keyvalue = [];
let json



document.querySelector('#json input[type="text"]').addEventListener('input', e => {
    e.preventDefault();
    console.log(e);
    const jsonform = document.querySelector('form#json');
    const jsoninput = jsonform.children[0];
    const jsonbtn = document.querySelector('form#json button');

    fetch(jsoninput.value)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            json = data;
            console.log(data);

            document.querySelector('.checkboxes').innerHTML = "";

            for (i in data[0]) {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <input type="checkbox" name="jsonval" value="${i}">
                    <label>${i.toUpperCase()}</label>
                    <br>
                `
                document.querySelector('.checkboxes').appendChild(tr);
            }

            jsonbtn.setAttribute('class', 'on');


        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

})


document.querySelector('#json').addEventListener("submit", e => {
    e.preventDefault();
    const jsonform = document.querySelector('form#json');
    const jsoninput = jsonform.children[0];
    const jsonbtn = document.querySelector('form#json button');
    const checkboxes = jsonform.querySelectorAll('input[name="jsonval"]:checked');


    checkboxes.forEach(function(checkbox) {
        keyvalue.push(checkbox.value);
    });
    jsonform.style.display = "none";

    initsearch(keyvalue);

    let el = document.createElement('th');
    el.innerText = "S. no.";
    document.getElementById('main').appendChild(el);

    keyvalue.map(e => {
        let el = document.createElement('th');
        el.innerText = e.toUpperCase();
        document.getElementById('main').appendChild(el);

    })

    let count = 1;
    for (i of json) {
        let main = document.createElement('tr');
        document.getElementById('main').appendChild(main);
        main.addEventListener('click', fullinfo);

        let no = document.createElement('td');
        no.innerHTML = `<b>${count++}</b>`;
        main.appendChild(no);

        keyvalue.map(e => {
            let el = document.createElement('td');
            el.innerText = i[e];
            main.appendChild(el);

        })
    }


})


//fetch(url)
//    .then(response => {
//        if (!response.ok) {
//            throw new Error('Network response was not ok');
//        }
//        return response.json();
//    })
//    .then(data => {
//        json = data;
//        initsearch(keyvalue);
//        let count = 1;
//        for (i of data) {
//            let main = document.createElement('tr');
//            document.getElementById('main').appendChild(main);
//            main.addEventListener('click', fullinfo);
//
//            let no = document.createElement('td');
//            no.innerHTML = `<b>${count++}</b>`;
//            main.appendChild(no);
//
//            keyvalue.map(e => {
//
//
//
//                let el = document.createElement('td');
//                el.innerText = i[e];
//                main.appendChild(el);
//
//            })
//        }
//
//    })
//    .catch(error => {
//        console.error('There was a problem with the fetch operation:', error);
//
//
//    });
//


let initsearch = e => {
    const select = document.querySelector('form.search select');
    e.map(f => {
        const option = document.createElement('option');
        option.value = f;
        option.innerText = f;
        select.appendChild(option);
    })
}


document.querySelector('form.search').addEventListener("input", e => {
    const input = document.querySelector('form.search input');
    const select = document.querySelector('form.search select');


    let index = keyvalue.findIndex(e => e == select.value);


    document.querySelectorAll('table tr').forEach(e => {
        const searchel = e.children[index + 1];
        if (searchel.innerText.toLowerCase().includes(input.value.toLowerCase())) {
            searchel.parentNode.style.display = "revert";
        }
        else {
            searchel.parentNode.style.display = "none";
        }

    })

})


const fullinfo = e => {
    const sidebar = document.querySelector('.sidebar');
    const index = Number(e.srcElement.parentNode.children[0].innerText);
    const data = json[index - 1];

    sidebar.innerHTML = "";

    const close = document.createElement('img');
    close.src = "x.svg";
    close.setAttribute('id', 'close');
    close.addEventListener('click', j => sidebar.removeAttribute('id'));

    sidebar.appendChild(close);


    for (i in data) {
        const el = document.createElement('div');
        el.setAttribute('class', "subel");
        el.innerHTML = `
            <span class="title"> ${i}</span><br>
            <span class="text"> ${data[i]}<span>
        `

        sidebar.setAttribute('id', 'open');

        sidebar.appendChild(el);
    }
}


