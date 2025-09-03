document.addEventListener("DOMContentLoaded", () => {
    const quoteElement = document.getElementById("quote");
    const pontoElement = document.getElementById("ponto");
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

            pontoElement.textContent = `${selectedQuote.ponto}`;
            quoteElement.innerHTML = `“${selectedQuote.frase.replace(/\n/g, '<br>')}”`;

            const shareText = `Caminho, ${selectedQuote.ponto}\n\n“${selectedQuote.frase}”`;
            const tweetText = encodeURIComponent(`Caminho, ${selectedQuote.ponto}: “${selectedQuote.frase}”`);
            twitterButton.href = `https://twitter.com/intent/tweet?text=${tweetText}`;

            const whatsappText = encodeURIComponent(shareText);
            whatsappButton.href = `https://api.whatsapp.com/send?text=${whatsappText}`;
        })
        .catch(error => {
            console.error("Erro ao carregar as frases:", error);
            quoteElement.textContent = "Não foi possível carregar a frase do dia. Tente novamente mais tarde.";
        });
});
