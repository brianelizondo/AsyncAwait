$(document).ready(function(){
    function showResponse(id_Div, resp){
        let $div_response = $(`#${id_Div}`);
        $div_response.append(`<p>${resp}</p>`);
    }

    // Part 1: Number Facts
    // 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number
    let div_show_1_1 = "part_1_1";
    
    async function getNumberFacts(){
        try{
            let numberFactsURL = "http://numbersapi.com/random";
            let response = await axios.get(numberFactsURL);
            showResponse(div_show_1_1, response.data);
        } catch (err){
            showResponse(div_show_1_1, err);
        }
    }
    getNumberFacts();
    

    // 2. Figure out how to get data on multiple numbers in a single request.
    // Make that request and when you get the data back, put all of the number facts on the page
    let div_show_1_2 = "part_1_2";
    
    async function multipleNumbers(num_start, num_end){
        try{
            let multipleNumbersURL = `http://numbersapi.com/${num_start}..${num_end}`;
            let response = await axios.get(multipleNumbersURL);
            for(var key in response.data){
                showResponse(div_show_1_2, response.data[key])
            }
        } catch (err){
            showResponse(div_show_1_2, err);
        }
    }

    let num_start = parseInt(Math.random() * 100);
    let num_end = num_start + 4;
    multipleNumbers(num_start, num_end);


    // 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. 
    // It’s okay if some of the facts are repeats.    
    let div_show_1_3 = "part_1_3";
    
    async function getFacts(){
        try {
            let getFactsURL = "http://numbersapi.com/random";
            let facts = await Promise.all([
                axios.get(getFactsURL),
                axios.get(getFactsURL),
                axios.get(getFactsURL),
                axios.get(getFactsURL)
            ]);

            facts.forEach(resp => showResponse(div_show_1_3, resp.data));
        } catch (err){
            showResponse(div_show_1_3, err);
        }
    }
    getFacts();


    // Part 2: Deck of Cards
    // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
    // Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
    let div_show_2_1 = "part_2_1";
    
    async function pickCard(){
        try{
            let pickCardURL = "http://deckofcardsapi.com/api/deck/new/draw/?count=1";
            let response = await axios.get(pickCardURL);
            let card_data = `${response.data.cards[0].value} ${response.data.cards[0].suit}`;
            showResponse(div_show_2_1, card_data);
            console.log(card_data);
        } catch (err){
            showResponse(div_show_2_1, err);
        }
    }
    pickCard();



    // 2. Figure out how to get data on multiple numbers in a single request. 
    // Make that request and when you get the data back, put all of the number facts on the page.
    // Once you have both cards, console.log the values and suits of both cards
    let div_show_2_2 = "part_2_2";

    async function pickCards(){
        try{
            let deckURL = "http://deckofcardsapi.com/api/deck/new/draw/?count=1";
            let response = await axios.get(deckURL);
            const cards_deck = response.data.deck_id;

            let pickCardsURL = `http://deckofcardsapi.com/api/deck/${cards_deck}/draw/?count=2`;
            let cards_Promise = axios.get(pickCardsURL);

            let cards = await cards_Promise;
            
            let card_1_data = `${cards.data.cards[0].value} ${cards.data.cards[0].suit}`;
            let card_2_data = `${cards.data.cards[1].value} ${cards.data.cards[1].suit}`;

            showResponse(div_show_2_2, card_1_data);
            showResponse(div_show_2_2, card_2_data);
            console.log(card_1_data);
            console.log(card_2_data);
        } catch (err){
            showResponse(div_show_2_2, err);
        }
    }
    pickCards();
    

    // 3. Build an HTML page that lets you draw cards from a deck. 
    // When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
    // Every time you click the button, display a new card, until there are no cards left in the deck.
    let deck_id = "new";
    let z_index_pos = 1;
        
    function appendCard(card_image_url){      
        let $div_cards = $("#deck_cards");
        let rotate_deg = Math.floor((Math.random() * (45 - (-45) + 1)) + (-45));
        let padding_card = Math.floor((Math.random() * (70 - 50 + 1)) + 50);
        $div_cards.append(`<div class="div_card" style="z-index:${z_index_pos}; padding-top:${padding_card}px;"><img src="${card_image_url}" style="transform: rotate(${rotate_deg}deg);"></div>`);
        z_index_pos += 1;
    }
    $("#get_card_button").on("click", async function(){
        try{
            let pickCardURL = `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`;
            let response = await axios.get(pickCardURL);
            appendCard(response.data.cards[0].image);
            deck_id = response.data.deck_id;
            if(response.data.remaining == 0){
                $("#get_card_button").remove();
            }
        } catch (err){
            console.log(err);
        }
    });


    // Futher Study
    // 1. Figure out how to make a single request to the Pokemon API to get names and URLs for every pokemon in the database.
    // NOTE: The API returns a 404 error if it tries to request information on pokemon with IDs greater than 899
    let div_show_3_1 = "part_3_1";
    
    async function pokemons(){
        try {
            let pokemonsURL = "https://pokeapi.co/api/v2/pokemon";
            let pokemonsPromise = await axios.get(pokemonsURL);
            let pokemonsPromises = [];
            var pokemonsData = [];
            
            showResponse(div_show_3_1, `<b>${pokemonsPromise.data.count} pokemons founds,</b> but the API returns a 404 error if it tries to request information on pokemon with IDs greater than 899`);
            
            for(let i = 1; i <= 898; i++){
                pokemonsPromises.push(
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
                );
            }
            let pokemonArr = await Promise.all(pokemonsPromises);

            for(res of pokemonArr){
                pokemonsData.push(res.data.species);
            }
        } catch (err){
            showResponse(div_show_3_1, err);
        }
    }
    pokemons();

    
    // 2. Once you have names and URLs of all the pokemon, pick three at random and make requests to their URLs. 
    // Once those requests are complete, console.log the data for each pokemon
    let div_show_3_2 = "part_3_2";
    let random_pokemons = 3;

    async function randomPokemon(id){
        try{
            let getPokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            let response = await axios.get(getPokemonURL);
            console.log(response.data);
            showResponse(div_show_3_2, `Pokemon ID: ${id} / Name: ${response.data.name}`);
        } catch (err){
            console.log(err);
        }
    }
    for(let i = 1; i <= random_pokemons; i++){
        let id = Math.floor(Math.random() * (898 + 1));
        randomPokemon(id);
    }


    // 3. Start with your code from 2, but instead of logging the data on each random pokemon, store the name of the pokemon in a variable and then make another request, this time to that pokemon’s species URL (you should see a key of species in the data). 
    // Once that request comes back, look in the flavor_text_entries key of the response data for a description of the species written in English. 
    // If you find one, console.log the name of the pokemon along with the description you found.
    // Example: "ducklett: They are better at swimming than flying, and they happily eat their favorite food, peat moss, as they dive underwater."
    let div_show_3_3 = "part_3_3";

    async function getPokemons(id){
        try{
            let getPokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            let pokemon = await axios.get(getPokemonURL);
            
            let pokemon_name = pokemon.data.name;
            let pokemon_species = await axios.get(pokemon.data.species['url']);
            
            let flavor_description = "description not found";
            for(entrie of pokemon_species.data.flavor_text_entries){
                if(entrie["language"]["name"] == "en"){
                            flavor_description = entrie["flavor_text"];
                }
            }
            showResponse(div_show_3_3, `<b>${pokemon_name}:</b> ${flavor_description}`);
            console.log(`${pokemon_name}: ${flavor_description}`);
        } catch (err){
            console.log(err);
        }
    }
    for(let i = 1; i <= random_pokemons; i++){
        let id = Math.floor(Math.random() * (898 + 1));
        getPokemons(id);
    }


    // 4. BONUS Instead of relying on console.log, let’s create a UI for these random pokemon. 
    // Build an HTML page that lets you click on a button to generate data from three randomly chosen pokemon. 
    // Include the name of the pokemon, an image of the pokemon, and the description of its species which you found in 3.
    function appendPokemonCard(name, descripcion, image_url){      
        let $div_cards = $("#pokemon_cards");
        $div_cards.append(`
            <div class="pokemon_card_div">
              <div class="pokemon_card_name">${name}</div>
              <div class="pokemon_card_image"><img src="${image_url}"></div>
              <div class="pokemon_card_descrip">${descripcion}</div>
            </div>
        `);
        z_index_pos += 1;
    }
    async function getPokemonCard(id){
        try{
            let getPokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
            let pokemon = await axios.get(getPokemonURL);
            
            let pokemon_name = pokemon.data.name;
            let pokemon_img_url = pokemon.data.sprites.front_default;
            let pokemon_species = await axios.get(pokemon.data.species['url']);
            
            let pokemon_description = "description not found";
            for(entrie of pokemon_species.data.flavor_text_entries){
                if(entrie["language"]["name"] == "en"){
                    pokemon_description = entrie["flavor_text"];
                }
            }
            appendPokemonCard(pokemon_name, pokemon_description, pokemon_img_url);
        } catch (err){
            console.log(err);
        }
    }
    $("#get_pokemon_button").on("click", function(){
        $("#pokemon_cards").empty();
        let random_pokemons = 3;

        for(let i = 1; i <= random_pokemons; i++){
            let id = Math.floor(Math.random() * (898 + 1));
            getPokemonCard(id)
        }
    });
});