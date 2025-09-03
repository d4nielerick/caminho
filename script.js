document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");
    const twitterButton = document.getElementById("share-twitter");
    const whatsappButton = document.getElementById("share-whatsapp");

    fetch("quotes.json")
        .then(response => response.json())
        .then(data => {
            const quotes = data.quotes;
            // Use the day of the year to get a consistent quote for the day
            const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const quoteIndex = dayOfYear % quotes.length;
            const selectedQuote = quotes[quoteIndex];

            quoteElement.textContent = `“${selectedQuote.quote}”`;
            authorElement.textContent = `— ${selectedQuote.author}`;

            const tweetText = encodeURIComponent(`“${selectedQuote.quote}” — ${selectedQuote.author}`);
            twitterButton.href = `https://twitter.com/intent/tweet?text=${tweetText}`;

            const whatsappText = encodeURIComponent(`“${selectedQuote.quote}”\n— ${selectedQuote.author}`);
            whatsappButton.href = `https://api.whatsapp.com/send?text=${whatsappText}`;
        })
        .catch(error => {
            console.error("Erro ao carregar as frases:", error);
            quoteElement.textContent = "Não foi possível carregar a frase do dia. Tente novamente mais tarde.";
        });
});
