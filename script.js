const input_box = document.querySelector('#inp'),
    btn = document.querySelector('.btn'),
    msg_box = document.querySelector('.msg-box');
 
btn.addEventListener('click',()=>{

    let inp_val = input_box.value;

    if(inp_val===''){
        msg_box.innerHTML = `Invalid Url`;
        msg_box.classList.add('error');
        setTimeout(()=>{    
            msg_box.classList.remove('error');
            msg_box.innerHTML = ``;

        },3000)
    }
    else{
        msg_box.innerHTML = `Downloading the file`;
        msg_box.classList.add('success');
        getFile(inp_val);
    }
})
const getFile = async(url) =>{

    //clearing the input field
    input_box.value = '';

    //fetching the url and returning them as object using blob
    let response = await fetch(url);
    let data = await response.blob();

    //Creating a downloadable url of the blob object
    let newURL = URL.createObjectURL(data)

    //creating a anchor tag to download the file
    let aElem = document.createElement('a');
    aElem.href = newURL;

    //getting the file name and extensions from the entered URL using Regular Expressions
    aElem.download= url.replace(/^.*[\\\//]/,'');    

    document.body.appendChild(aElem);
    
    //removing the msg-box after file has been downloaded
    msg_box.innerHTML= ``;
    msg_box.classList.remove('success');

    //downloading file after clicking the download button
    aElem.click();

    //removing anchor tag after the download has completed the button
    aElem.remove();

}