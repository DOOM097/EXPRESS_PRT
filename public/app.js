const toCurrency = price => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'EUR',
        style: 'currency'
    }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(parseFloat(node.textContent)); // Ensure price is a number
});

const $card = document.querySelector('#card');
if ($card) {
    $card.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) { // Corrected classList
            const id = event.target.dataset.id;

            fetch('/card/remove/' + id, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(card => {
                if (card.courses.length) {
                    const html = card.courses.map(c => { // Corrected map function
                        return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button> <!-- Corrected template literal -->
                            </td>
                        </tr>
                        `;
                    }).join('');
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').textContent = toCurrency(card.price);
                } else {
                    $card.innerHTML = '<p>Корзина пуста</p>';
                }
            });
        }
    });
}
