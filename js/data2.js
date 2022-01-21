 /**
  * A partir de l'API gallica, réaliser des dataviz sur 3 artistes/auteurs/personnalités 
  * différentes. Vos dataviz devront montrer l'impact de ses personnes sur 
  * le domaine culturel et les publications de la BNF.

Webscrapping
A partir de deux sources d'actualités différentes, scrapper des données sur 
plusieurs jours et réaliser une data viz comparant la manière dont un sujet 
 est traité par les deux sources d'actualités
  */

  //const cors        = require("cors")
/**
 * https://cors-anywhere.herokuapp.com/
 * pour faire marcher l'api sans utiliser de extension cors 
 */
  //infos : https://api.bnf.fr/fr/api-gallica-de-recherche
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
let maxRecord   = "maximumRecords=10";

let request2 = gallicaAPIURL + cql + separator + operator[0] + separator + "voltaire" + and + collapse + and + maxRecord;

LoadData2(request2)
    .then(data2 => {
        console.log(request2); 
        console.log(data2);

        let records = data2.getElementsByTagName("srw:record");
        let target2  = document.getElementById("datadisplay2");
        
        for(let i=0; i<records.length; i++){
            let element = records[i];

            let imageurl    = element.getElementsByTagName("medres")[0].textContent;
            let title       = element.getElementsByTagName("dc:title")[0].textContent;
            let date        = element.getElementsByTagName("dc:date");

            let creators        = element.getElementsByTagName("dc:creator");
            let contributors    = element.getElementsByTagName("dc:contributor");
            let publishers      = element.getElementsByTagName("dc:publisher");

            let container       = document.createElement("div");
            container.id        = `record${i}`;
            container.className = "srwrecord";

            let imgcontainer    = document.createElement("div");
            let infocontainer   = document.createElement("div");

            //img
            let img             = document.createElement("img");
            img.src             = imageurl;
            img.alt             = `Cover of ${title}`
            imgcontainer.appendChild(img);

            //info
            let h1              = document.createElement("h1");
            h1.innerHTML        = `${title}`;
            
            let datepublish     = date.length > 0 ? date[0].textContent : "Date is unknown";
            let h2              = document.createElement("h2");
            h2.innerHTML        = `${datepublish}`;

            let creatorp        = document.createElement("p");
            creatorp.innerHTML  = `Creators: ${AggregateDataAsString(creators)}`;

            let contribp        = document.createElement("p");
            contribp.innerHTML  = `Contributors: ${AggregateDataAsString(contributors)}`;

            let publishp        = document.createElement("p");
            publishp.innerHTML  = `Publisher: ${AggregateDataAsString(publishers)}`;

            infocontainer.appendChild(h1);
            infocontainer.appendChild(h2);
            infocontainer.appendChild(creatorp);
            infocontainer.appendChild(contribp);
            infocontainer.appendChild(publishp);

            container.appendChild(imgcontainer);
            container.appendChild(infocontainer);
            target2.appendChild(container);
        };
    })

function AggregateDataAsString(data2){
    let aggregate2  = "";
    Array.from(data2).forEach(value => {
        aggregate2 += `${value.textContent}<br>`;
    })

    return aggregate2;
}

async function LoadData2(request2){
    const response  = await fetch(request2);
    const rawdata   = await response.text();
    const xml       = await new window.DOMParser().parseFromString(rawdata, "text/xml");
    return xml;
}