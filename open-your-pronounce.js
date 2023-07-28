// ==UserScript==
// @name         Open your Google pronounce
// @namespace    http://tampermonkey.net/
// @version      0.2.6
// @description  try to take over the world!
// @author       Frank
// @match        https://www.google.com/search*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    let content = document.querySelectorAll("#plugins-knowledge-verticals-language-pronunciation__onebox_content")[0].parentNode

    let observer = new MutationObserver(mutationRecords => {
        add_download_btn()
    });

    observer.observe(content, {
        attributes: true,
    });
})();

function add_download_btn()
{
    let content = document.querySelectorAll("#plugins-knowledge-verticals-language-pronunciation__onebox_content")[0]

    let button_style = 'position: absolute; bottom: 3px; display:flex; color: #bdc1c6; cursor: pointer; padding: 8px 12px; margin: auto; width: 100px; justify-content: center; border: 1px solid #5f6368; border-radius: 19px; background-color: #202124; line-height: 18px; font-size: 14px;';

    // Open url button
    let button_open = document.createElement("button")
    button_open.innerText = 'Open url'
    button_open.style = button_style + "right: 132px;"
    button_open.onclick = ()=>{
        let content = document.querySelectorAll("#plugins-knowledge-verticals-language-pronunciation__onebox_content")[0]
        let audios = content.getElementsByTagName('audio')
        for(let i=0; i<audios.length; i++){
            let audio = audios[i]
            if( audio.getElementsByTagName('source')[0] ){
                let url = audio.getElementsByTagName('source')[0].getAttribute('src')
                if( url.match(/^blob:http.*/g) )
                {
                    console.log(url)
                    window.open(url)
                }
            }
        }
    }

    // Show images button
    let button_show = document.createElement("button")
    button_show.innerText = 'Show'
    button_show.style = button_style + "right: 240px;"
    button_show.onclick = ()=>{
        let content = document.querySelectorAll("#plugins-knowledge-verticals-language-pronunciation__onebox_content")[0]
        let imgs_div = content.querySelectorAll("#pronounce-imgs")[0]
        if( imgs_div == undefined ) {
            imgs_div = document.createElement("div")
            imgs_div.id = "pronounce-imgs"
            imgs_div.style = "display: grid; grid-template-columns: repeat(6, 1fr); box-sizing: border-box; border: 1px solid rgb(95, 99, 104); border-radius: 19px; background-color: rgb(32, 33, 36); margin-bottom: 50px; margin-top: -50px; padding: 10px; gap: 5px;"
        } else {
            imgs_div.innerHTML = '';
        }
        content.querySelectorAll("g-img > img").forEach(element => {
            if( element.src.match(/.*svg$/g) )
            {
                console.log(element.src)
                let img = document.createElement("img")
                img.style = "max-width: 100%; border-radius: 8px;"
                img.src = element.src
                imgs_div.appendChild(img)
            }
        });
        content.appendChild(imgs_div)
    }

    // let switch_btn = content.getElementsByTagName('input')[0]
    // switch_btn.onclick = ()=>{
    //     console.log("switch_btn.onclick")
    //     // setTimeout(add_download_btn, 5000)
    // }
    content.appendChild(button_open)
    content.appendChild(button_show)
}
