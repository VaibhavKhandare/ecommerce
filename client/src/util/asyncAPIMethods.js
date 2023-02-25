export const getAPI = (url,params)=> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'https://regal-selkie-753848.netlify.app/');
    return fetch(`https://ecommerce-q1md.onrender.com${url}?${new URLSearchParams(params || {})}`,{headers})
    .then(res=>res.json())
    .catch(err=>console.log('error', err))
}

export const postAPI = (url,body)=> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return fetch(`https://ecommerce-q1md.onrender.com${url}`,{
        method: "POST",
    body: JSON.stringify(body),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
    })
    .then(res=>res.json())
    .catch(err=>console.log('error', err))
}