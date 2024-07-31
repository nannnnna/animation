/*
   * Go(CountX, CountY, arr, anim_tip)
   * CountX - Number of horisontal rows
   * CountY - Number of vertical rows
   * arr - array with images
   * anim_tip - Type of animation
   */


var arr=['http://shop.by/news/data/lg-42la660v$1.jpg','http://shop.by/news/data/img_0_88_156x78.jpg','http://shop.by/news/data/209350-00.jpg'],
    partsX = 15,
    partsY =15,
    variant=7;//1-wave, 2-Xtype, 3-star, 4-vertical line,5-chaos, 6-impact, 7-enother star,-1(random default)


var select = document.getElementsByTagName("select")[0];
var hor_row = document.getElementById("hor_row").value;
var vert_row = document.getElementById("vert_row").value;
document.getElementById("hor_row").addEventListener("keyup",foo,false);//blur
document.getElementById("vert_row").addEventListener("keyup",foo,false);
//document.getElementById("time_delay").addEventListener("keyup",foo,false);

function remove(elem) {
    return elem.parentNode ? elem.parentNode.removeChild(elem) : elem;
}

function foo(){
    document.getElementById("wrapper")?remove(document.getElementById("wrapper")):console.log(-1);
    Go( document.getElementById("hor_row").value,document.getElementById("vert_row").value,arr);
}

window.onload = Go( hor_row,vert_row,arr);

function Go(CountX, CountY, arr, anim_tip) {

    var w_X, // width of first image
        w_Y, // height of first image
        i=0, // number of images
        v=1, // some kind of animation
        variant=-1, // if exist 4-th argument "anim_tip"(1-9) - choose animation variant
        delay_time=4000, //delay time (ms)
        distance_delta = 500; // distance delta in formula

    if(anim_tip){
        variant=anim_tip;
    }

    var img = new Image();
    img.onload = function() {
        w_X = this.width;
        w_Y = this.height;

        var RES_X =  CountX,
            RES_Y =  CountY,
            ww_X =  Math.round(w_X/CountX), // width of parts
            ww_Y =  Math.round(w_Y/CountY); // height of parts

        var entities = [];
        var wrapper = document.createElement( 'div' );
        var checked = true;
        var interval;
        wrapper.id = 'wrapper';
        wrapper.style.width = ( w_X ) + 'px';
        wrapper.style.height = ( w_Y) + 'px';
        //wrapper.style.background = "url('"+arr[0]+"')";
        wrapper.addEventListener("mouseover", stopSlide, false);
        wrapper.addEventListener("mouseout", resumeSlide, false);
        document.body.appendChild( wrapper );
        var x,y;
        for( x = 0; x < RES_X; x++ ) {
            for( y = 0; y < RES_Y; y++ ) {
                var el = document.createElement( 'div' );
                el.setAttribute( 'class', 'part' );

                var entity = {
                    element: el,
                    x: x * ww_X,
                    y: y * ww_Y
                }

                el.style.left = entity.x + 'px';
                el.style.top = entity.y + 'px';
                el.style.width = ww_X+"px";
                el.style.height = ww_Y+"px";
                //console.log(el)
                el.style.background = 'url("' + arr[0] + '") -' + entity.x + 'px -' + entity.y + 'px';
                el.addEventListener( 'click', toggle.bind( this, entity ) );
                wrapper.appendChild( el );

                entities.push( entity );
            }
        }

        function toggle( targetEntity ) {
            select.value==-1?v=Math.round(Math.random()*9):v=select.value*1;
            entities.forEach( function( entity ) {
                var entity_element=entity.element;
                var dx = targetEntity.x - entity.x;
                var dy = targetEntity.y - entity.y;
                var distance;

                switch(v){
                    case 1:
                        checked?distance=Math.sqrt( dx * dx + dy * dy ):distance=distance_delta-Math.sqrt( dx * dx + dy * dy );
                        break
                    case 2:
                        checked?distance=Math.sqrt( dx * dx - dy * dy ):distance=distance_delta-Math.sqrt( dx * dx - dy * dy );
                        break
                    case 3:
                        checked?distance=Math.sqrt( dx * dy ):distance=distance_delta-Math.sqrt( dx * dy );
                        break
                    case 4:
                        checked?distance=1:distance=distance_delta;
                        break
                    case 5:
                        checked?distance=distance_delta-Math.tan( dx * dx + dy * dy ):distance=distance_delta-Math.tan( dx * dx + dy * dy );
                        break
                    case 6:
                        checked?distance=Math.log( dx * dx + dy * dy ):distance=distance_delta-Math.log( dx * dx + dy * dy );
                        break
                    case 7:
                        checked?distance=Math.log( dx * dx * dy * dy ):distance=distance_delta-Math.log( dx * dx * dy * dy );
                        break
                    case 8:
                        checked?distance=distance_delta-Math.tan( 1/dx * dx ):distance=distance_delta-Math.tan( 1/dx * dx );
                        break
                    case 9:
                        checked?distance=distance_delta-Math.tan( 1/dy * dy ):distance=distance_delta-Math.tan( 1/dy * dy );
                        break
                    default:
                        checked?distance=Math.sqrt( dx * dx + dy * dy ):distance=distance_delta-Math.sqrt( dx * dx + dy * dy );
                }
                setTimeout( function() {
                    checked?entity.element.style.background = 'url("' + arr[i] + '") -' + entity.x + 'px -' + entity.y + 'px':entity.element.style.background = 'url("'+arr[i]+'") -' + entity.x + 'px -' + entity.y + 'px';
                    entity_element.className = '';
                    entity_element.style.width = ww_X+"px";
                    entity_element.style.height = ww_Y+"px";
                    entity_element.offsetWidth;
                    entity_element.className = 'part';
                }, Math.round( distance ) );

            } );
            checked = !checked;
            i<arr.length-1?i++:i=0
        }

        setTimeout( function() {
            toggle( entities[ Math.round(Math.random()*RES_X*RES_Y) ] );
        }, delay_time );

        function stopSlide() {
            clearTimeout(interval);
        }

        function resumeSlide() {
            interval = setInterval( function() {
                toggle( entities[ Math.round(Math.random()*RES_X*RES_Y)] );
            }, delay_time );
        }

        resumeSlide();
    }
    img.src = arr[0];
}