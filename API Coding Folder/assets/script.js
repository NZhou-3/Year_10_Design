function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

// List of pokemon (gen 1 only for now, u can find a full version online somewhere probably)
var gen1 = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];
getNames();
function getNames() {
  for (let i = 0; i < gen1.length; i++) {
    // Make option element
    var a = document.createElement("option");
    // get the pokemon name and put it inside the option element
    a.innerHTML = gen1[i];
    // Put option element into dropdown list
    document.getElementById("names").appendChild(a);
  }
  
}
async function api() {
  // gets the pokemon name and turn it to lowercase (has to for API)
  var pokemon = document.getElementById("names").value.toLowerCase();
  console.log(pokemon);
  // performs a http request to the API which returns details about the pokemon
  // "await" because axios.get returns a "promise" which takes time so u need to wait for it to be done
  response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  // response is something like this {data: { status: { blah blah blah }}}
  // returns the stats
  stats = response.data.stats;
  // displays the stats onto the console
  console.log(stats);
  // this stuff turn the stats into bars:
  // firstly empty out thh rsponse div
  $('#response').empty()
  // then for each stat make a div
  // list of colors to pick from when assigning bg colors
  var colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple']
  for (let i = 0; i < stats.length; i++) {
    var b = document.createElement('div')
    // put text into the actual bars
    b.innerHTML = stats[i].stat.name + ' - ' + stats[i].base_stat
     // set width to be a percentage based on the base_stat
    var width = stats[i].base_stat / 155 * 100
    b.style.width = width + '%'
    // set background to color to be a color of the corrosponding index

    // Asign indexes for each value
    b.style.backgroundColor = chroma(colors[i])
    if (stats[i].base_stat < 100) {
      b.style.backgroundColor = chroma(colors[i]).darken()
      if (stats[i].base_stat < 80) {
        b.style.backgroundColor = chroma(colors[i]).darken(2)
        if (stats[i].base_stat < 60) {
          b.style.backgroundColor = chroma(colors[i]).darken(3)
          if (stats[i].base_stat < 40) {
            b.style.backgroundColor = chroma(colors[i]).darken(4)
            if (stats[i].base_stat < 20) {
              b.style.backgroundColor = chroma(colors[i]).darken(5)
            }
          }
        }
      }
    }

    // append the element to the div
    document.getElementById('response').appendChild(b)
  }
  // document.getElementById("response1").innerHTML = stats[0]["stat"]["name"] + " - " + stats[0]["base_stat"];
  // document.getElementById("response2").innerHTML = stats[1]["stat"]["name"] + " - " + stats[1]["base_stat"];
  // document.getElementById("response3").innerHTML = stats[2]["stat"]["name"] + " - " + stats[2]["base_stat"];
  // document.getElementById("response4").innerHTML = stats[3]["stat"]["name"] + " - " + stats[3]["base_stat"];
  // document.getElementById("response5").innerHTML = stats[4]["stat"]["name"] + " - " + stats[4]["base_stat"];
  // document.getElementById("response6").innerHTML = stats[5]["stat"]["name"] + " - " + stats[5]["base_stat"];
}