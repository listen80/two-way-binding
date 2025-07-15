import DOMParser from './htmlParse.js';

export function loadComponent(url) {
    const result = syncXmlHttpRequest(url)
    return DOMParser(result);
}

export function syncXmlHttpRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // 第三个参数设为 false 表示同步请求
    xhr.send(null);
    if (xhr.status === 200) {
        return xhr.responseText;
    } else {
        throw new Error(`请求失败，状态码: ${xhr.status}`);
    }
}
