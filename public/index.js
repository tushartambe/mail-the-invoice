
const menuHtml = ({ name, price }) =>
    `<div class="col-md-4" style="max-width:25%">
    <div class="card mb-4 box-shadow">
        <img class="card-img-top" alt=""
            style="display:block;background-color: black;width: 150px;height: 200px;"
            src="https://www.hotelfinlandiaquito.com/wp-content/uploads/2019/01/menu-en.jpg" />
        <div class="card-body">
            <input type="checkbox" class="menuItem" name=${name}>${name}</input>
            <small>Price  :${price}</small>
        </div>
    </div>
</div>`

const sendPostRequest = data => {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    };
};

const order = function () {
    const selectedMenus = Array.from(document.getElementsByClassName('menuItem'))
    const a = selectedMenus.filter(menu => {
        return menu.checked == true
    }).map(e => e.name)


    const customerEmail = document.getElementById("customerEmail").value;
    const customerName = document.getElementById("customerName").value;
    const requestObj = { customerEmail, customerName, selectedMenus: a }
    fetch('/sendMail', sendPostRequest(requestObj))
        .then(res => res.json())
        .then(data => console.log(data.status));
}

const displayMenu = function () {
    const menuDiv = document.getElementById('menuDiv')
    const menus = [
        { name: 'Vada-Pav', price: 20 },
        { name: 'Misal', price: 20 },
        { name: 'Dosa', price: 20 },
        { name: 'Uttappa', price: 20 },
        { name: 'Burger', price: 20 },
        { name: 'Pizza', price: 20 },
        { name: 'Paneer', price: 20 },
        { name: 'Vada-Sample', price: 20 },
        { name: 'Pohe', price: 20 },
        { name: 'Khichadi', price: 20 },
        { name: 'Upama', price: 20 },
        { name: 'Sandwich', price: 20 },
        { name: 'Mutter', price: 20 },
        { name: 'Chicken', price: 20 },
        { name: 'Tawa-Pulav', price: 20 },
        { name: 'Rice', price: 20 },
        { name: 'Fried-Rice', price: 20 },
        { name: 'Paneer-Rice', price: 20 },
        { name: 'Mushrrom-Rice', price: 20 },
        { name: 'Biryani', price: 20 }
    ]
    let allMenus = menus.map(menu => menuHtml(menu))
    menuDiv.innerHTML = allMenus;
    document.getElementById('orderForm').style.display = 'flex';
    document.getElementById('orderForm').className = 'order';
}