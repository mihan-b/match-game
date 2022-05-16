//Some stuff we need
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span')
let playerLives = 8;

//Link text
playerLivesCount.textContent = playerLives;

//Generate Data
const getData = () => [
    {imgSrc: './images/1.png', name:'card1' },
    {imgSrc: './images/2.png', name:'card2' },
    {imgSrc: './images/3.png', name:'card3' },
    {imgSrc: './images/4.png', name:'card4' },
    {imgSrc: './images/5.png', name:'card5' },
    {imgSrc: './images/6.png', name:'card6' },
    {imgSrc: './images/7.png', name:'card7' },
    {imgSrc: './images/8.png', name:'card8' },
    {imgSrc: './images/1.png', name:'card1' },
    {imgSrc: './images/2.png', name:'card2' },
    {imgSrc: './images/3.png', name:'card3' },
    {imgSrc: './images/4.png', name:'card4' },
    {imgSrc: './images/5.png', name:'card5' },
    {imgSrc: './images/6.png', name:'card6' },
    {imgSrc: './images/7.png', name:'card7' },
    {imgSrc: './images/8.png', name:'card8' },
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5);
    return cardData;
}

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate HTML
    cardData.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("img");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach info to cards
        face.src = item.imgSrc;
        card.setAttribute('name',item.name)
        //Attach cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
};

//Check match
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    console.log(clickedCard)
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard')
    //Logic
    if(flippedCards.length === 2) {
       if(flippedCards[0].getAttribute('name') === 
       flippedCards[1].getAttribute('name')
       ) {
           console.log('match')
           flippedCards.forEach((card) => {
               card.classList.remove('flipped');
               card.style.pointerEvents = 'none';

           })
       } else {
           console.log('wrong');
           flippedCards.forEach((card) =>{
               card.classList.remove('flipped');
               setTimeout(() => card.classList.remove('toggleCard'),1500);
           });
           playerLives--;
           setTimeout(() => playerLivesCount.textContent = playerLives, 500);
           if (playerLives === 0){
            setTimeout(() => restart("Try again"), 2000);
           }
       };
    };
    //Check for win
    if (toggleCard.length === 16) {
        setTimeout(() => restart("Good job! 🎉"), 2000)
    };
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        //Randomize
        cards[index].style.pointerEvents = "all";
        faces[index].src=item.imgSrc;
        cards[index].setAttribute('name', item.name);
        section.style.pointerEvents = 'all';
    });
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text),200);

};
cardGenerator();
