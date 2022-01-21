let gallicaAPIURL   = "https://gallica.bnf.fr/SRU?version=1.2&operation=searchRetrieve&query="
let cql             = "dc.creator";
let operator        = ["all", "any", "adj", "prox"];
let and             = "&";
let separator       = "%20";
let types           = [
    "monographie",
    "carte",
    "image",
    "fascicule",
    "manuscrit",
    "partition",
    "sonore",
    "objet",
    "video"
];
let collapse    = "collapsing=true";
let start       = 0;
let max         = 100;
let startRecord = "startRecord=";
let maxRecord   = "maximumRecords=";
let maxLengthRecord;
let auteur1      = "marie curie";
let auteur2      = "Voltaire";
let auteur3      = "Ray charles";
let valeur       = [];
let auteurs      = [];


let request1 = gallicaAPIURL + cql + separator + operator[0] + separator + auteur1 + and + collapse + and + startRecord + start + and + maxRecord+max;
let request2 = gallicaAPIURL + cql + separator + operator[0] + separator + auteur2 + and + collapse + and + startRecord + start + and + maxRecord+max;
let request3 = gallicaAPIURL + cql + separator + operator[0] + separator + auteur3 + and + collapse + and + startRecord + start + and + maxRecord+max;

console.log(valeur)

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: auteurs,
        datasets: [{
            label: "Nombre de resultat sur gallica des 3 personnes",
            data: valeur,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});



LoadData(request1)
    .then(data => {
        console.log(request1);
        console.log(data);

        let maxrecords1 = Number(data.getElementsByTagName("srw:numberOfRecords")[0].textContent)
        valeur.push(maxrecords1);
        auteurs.push(auteur1);

        console.log(auteur1, maxrecords1)

        myChart.update();
    })

LoadData(request2)
    .then(data => {
        console.log(request2);
        console.log(data);

        let maxrecords2 = Number(data.getElementsByTagName("srw:numberOfRecords")[0].textContent)
        valeur.push(maxrecords2);
        auteurs.push(auteur2);

        console.log(auteur2, maxrecords2)

        myChart.update();
    })

LoadData(request3)
    .then(data => {
        console.log(request3);
        console.log(data);

        let maxrecords3 = Number(data.getElementsByTagName("srw:numberOfRecords")[0].textContent)
        valeur.push(maxrecords3);
        auteurs.push(auteur3);
        console.log(auteur3, maxrecords3)
        
        myChart.update();
    })

async function LoadData(request1,request2,request3){
    const response  = await fetch(request1,request2,request3);
    const rawdata   = await response.text();
    const xml       = await new window.DOMParser().parseFromString(rawdata, "text/xml");
    return xml;
}

