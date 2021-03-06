window.onload = function() {
    var file_name = "日傘の女";
    var image_block = document.getElementById('image_block');
    var image = document.getElementById('image');
    var canvas = document.getElementById('canvas');
    //var img_canvas = document.getElementById('img_canvas');
    var ann_canvas = document.getElementById('ann_canvas');
    //var img_canvas = document.createElement("canvas");
    //var ann_canvas = document.createElement("canvas");

    //canvas.width = image.width;
    //canvas.height = image.height;
    //img_canvas.width = image.width;
    //img_canvas.height = image.height;
    image_block.width = "100%";
    image_block.height = image.height;
    ann_canvas.width = image.width;
    ann_canvas.height = image.height;

    //console.log(image_block.height);

    //draw_img(img_canvas, image);

    var data = [
        [43, 383],
        [350, 166],
        [483, 509],
        [352, 751],
        [30, 462]
    ];
    var txt = ["風が吹いている", "顔が描かれていない", "タッチがよい", "色がやわらか", "ブルーがきれい"];
    draw_ann(ann_canvas, data, txt);

    //img_canvas.style.display = "inline";

    //var ctx = canvas.getContext('2d');
    //ctx.drawImage(img_canvas, 0, 0, canvas.width, canvas.height);
    //ctx.drawImage(ann_canvas, 0, 0, canvas.width, canvas.height);

    //img_canvas.style.display = "none";

    ann_canvas.onclick = function(e) {
        var xy = muuXY(e, image_block, this);
        //alert('Xの座標は' + xy[0] + 'Yの座標は' + xy[1]);

        var mX = xy[0];
        var mY = xy[1];

        document.getElementById('x-coord').innerHTML = mX;
        document.getElementById('y-coord').innerHTML = mY;

        var r = mX.toString().concat(",");
        r = r.concat(mY.toString());
        r = r.concat(",");
        r = r.concat(document.getElementById("annotation").value);
        r = r.concat("\n");
        document.getElementById("res").innerHTML = r;

        var client_w = ann_canvas.clientWidth;
        var client_h = ann_canvas.clientHeight;

        document.getElementById("annotation").value = "Input Tag Text and Click the Tag Position";
        //tweet(r, file_name);
    }
}

function tweet(r, name) {
    var result = r;
    var tag = "&hashtags=TDU_hasegawaLAB_annotation_";
    tag = tag.concat(name);
    //location.href = "https://twitter.com/intent/tweet?text="+ encodeURIComponent(result) +"&hashtags=TDU_hasegawaLAB_annotation";
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(result) + tag);

}

function muuXY(e, block, that) {
    if (!e) e = window.event;
    var x, y;
    if (e.targetTouches) {
        x = e.targetTouches[0].pageX - e.target.offsetLeft;
        y = e.targetTouches[0].pageY - e.target.offsetTop;
    } else if (that) {
        x = e.pageX + 1 - (block.offsetLeft + that.offsetLeft);
        y = e.pageY + 1 - (block.offsetTop + that.offsetTop);
        //console.log(that.offsetLeft);
        //console.log(that.offsetTop);

        /*
        x = e.pageX - e.target.offsetLeft;
        y = e.pageY - e.target.offsetTop;
        console.log(e.target.offsetLeft)
        console.log(e.target.offsetTop)
        */
    }
    return [x, y];
}

function draw_ann(canvas, data, txt) {
    var ctx = canvas.getContext('2d');
    //console.log(data[0][0])
    for (var i = 0; i < txt.length; i++) {
        var radius = Math.floor(Math.random() * (30 + 1 - 20)) + 20;
        ctx.beginPath();
        ctx.arc(data[i][0], data[i][1], radius, 0, Math.PI * 2, true);
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.globalAlpha = 0.75;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.fill();
    }
}
/*
function loadCSV(targetFile) {
    var allData = [];
    var request = new XMLHttpRequest();
    request.open("get", targetFile, false);
    request.send(null);
    var csvData = request.responseText;
    var lines = csvData.split("\n");
    for (var i = 0; i < lines.length; i++) {
        var wordSet = lines[i].split(",");
        var wordData = {
            x: wordSet[0],
            y: wordSet[1],
            txt: wordSet[2],
        };
        allData.push(wordData);
    }
    console.log(allData);
    return allData;
}*/
/*
function draw_img(canvas, image){
    if (!canvas || !canvas.getContext)
        return false;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = "../2017081800.png";
    img.onload = function(){
        //console.log(img);
        ctx.drawImage(img, 0, 0);
    }
}
*/
