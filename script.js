document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const pontoElement = document.getElementById("ponto");
    const twitterButton = document.getElementById("share-twitter");
    const whatsappButton = document.getElementById("share-whatsapp");
    const newQuoteButton = document.getElementById("new-quote-button");

    let quotes = [];

    const displayRandomQuote = () => {
        if (quotes.length === 0) return;

        const quoteIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[quoteIndex];

        pontoElement.textContent = `${selectedQuote.ponto}`;
        quoteElement.innerHTML = `“${selectedQuote.frase.replace(/\n/g, '<br>')}”`;

        const shareText = `Caminho, ${selectedQuote.ponto}\n\n“${selectedQuote.frase}”`;
        const tweetText = encodeURIComponent(`Caminho, ${selectedQuote.ponto}: “${selectedQuote.frase}”`);
        twitterButton.href = `https://twitter.com/intent/tweet?text=${tweetText}`;

        const whatsappText = encodeURIComponent(shareText);
        whatsappButton.href = `https://api.whatsapp.com/send?text=${whatsappText}`;
    };

    fetch("quotes.json")
        .then(response => response.json())
        .then(data => {
            quotes = data.quotes;
            // Display a quote on initial load
            displayRandomQuote();
            // Add event listener for the new quote button
            newQuoteButton.addEventListener("click", displayRandomQuote);
        })
        .catch(error => {
            console.error("Erro ao carregar as frases:", error);
            quoteElement.textContent = "Não foi possível carregar a frase do dia. Tente novamente mais tarde.";
        });
});
