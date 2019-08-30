var btnEshop = document.querySelector("#eshop");
if (btnEshop != undefined) {
	btnEshop.addEventListener("click", function (){
	    var nameCookieBasket = "BasketItemsQuantity";
	    var nameCookieUser = "UserToken";
	    var linkBasket = '';
        var linkHome = '';
	    if (verifUrl()) {
            linkBasket = document.getElementById("environment").value + 'Basket/Index';
            linkHome = document.getElementById("environment").value + 'Home/Index';
            if (accessCookie(nameCookieUser) !== "") {
                var allCookie = document.cookie.split(';');
                for (var i = 0; i < allCookie.length; i++) {

                    var temp = allCookie[i].trim();
                    if (temp.indexOf(nameCookieBasket) === 0 && parseInt(temp.split('=')[1]) >= 1) {

                        this.href = linkBasket;
                    } else
                       
                        this.href = linkHome;
                }
            } else 
                alert("The cookie named " + nameCookieUser + " doesn't exist ");
        } else 
            alert("Please select a base Url");
	});
}

function verifUrl() {
    var options = document.getElementById("urlList").options;
    var result = false;

    for (var i = 0; i < options.length; i++) {
        if (document.getElementById("environment").value === options[i].value) {
            result = true;
        }
    }
    return result;
}

function accessCookie(cookieName) {

    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++)
    {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name)===0)
            return temp.substring(name.length,temp.length);
    }
    return "";
}

