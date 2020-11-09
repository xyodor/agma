const url_regx = /https:\/\/([wW]{3}\.)?instagram.com\/(p\/[a-zA-Z._0-9]+)?([a-zA-Z._0-9]+)/im;
var main = {
    url_field: document.getElementById("url"),
    in_button: document.getElementById("search"),
    img_field: document.getElementById("imageElement"),
    err_field: document.getElementById("message")
},  father = main.img_field.parentElement,
    val = "";


function hidemessage() {
    main.err_field.style.display = "none";
    main.err_field.innerHTML = "";
}

function showmessage(msg) {
    main.err_field.innerHTML = msg;
    main.err_field.style.display = "block";
    setTimeout(hidemessage, 4000);
}

function showimg(url) {
    main.img_field.setAttribute("src", url);
    father.style.display = "block";

}

main.in_button.addEventListener("click", () => {
    val = main.url_field.value;
    var match = url_regx.exec(val);
    if (match !== null) {  
        hidemessage();

        if (match[2] !== undefined) {
            showmessage("المنشورات غير مدعومة حاليا");
        }else {
            val = match[0]+"?__a=1";
            let img = "";
            fetch(val)
            .then(res => {
                return res.json();
            }).then(data => {
                img = data['graphql']['user']['profile_pic_url_hd'];
                if (img !== undefined) {
                    showimg(img);
                }else {
                    showmessage("عذرا لم يتم إيجاد الصورة");
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }else {
        showmessage("أدخل عنوان صحيح");
    }
})
