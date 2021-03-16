let items = document.getElementById('items')

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage))
}

exports.changeSelection = direction => {
    let currentItem = document.getElementsByClassName('read-item selected')[0];

    if (direction === 'ArrowUp' && currentItem.previousElementSibling) {
        currentItem.classList.remove('selected')
        currentItem.previousElementSibling.classList.add('selected')
    } else if(direction === 'ArrowDown' && currentItem.nextElementSibling) {
        currentItem.classList.remove('selected')
        currentItem.nextElementSibling.classList.add('selected')
    }
}

exports.addItem = (item, isNew = false) => {
    let itemNode = document.createElement('div')
    itemNode.setAttribute('class', 'read-item')
    itemNode.setAttribute('data-url', item.url)
    itemNode.innerHTML = `<img src="${item.screenshot}"><h2>${item.title}</h2>`
    items.appendChild(itemNode)

    itemNode.addEventListener('click', this.select)

    itemNode.addEventListener('dblclick', this.open)

    if(document.getElementsByClassName('read-item').length === 1) {
        itemNode.classList.add('selected')
    }

    if (isNew) {
        this.storage.push(item)
        this.save()
    }
    
}

exports.select = e => {
    document.getElementsByClassName('read-item selected')[0].classList.remove('selected')
    e.currentTarget.classList.add('selected')
}

exports.open = () => {
    if (!this.storage.length) return
    let selectedItem = document.getElementsByClassName('read-item selected')[0];
    let contentUrl = selectedItem.dataset.url
    console.log(contentUrl);
}

this.storage.forEach(e => {
    this.addItem(e, false)
})

