import Vue from './src/Vue.js';

const app = new Vue({
    el: '#app',
    data: {
        message: 'Hello, Vue!',
        title: 'This is a title',
        myTitle: 'This is a aaa aaa bb ',
        sss: 'This is a sss',
        checkbox: false,
        select: 'option1',
        radio: 'option1',
    },
    methods: {
        changeMessage() {
            if (this.$data.message === 'Message changed!') {
                this.$data.message = 'Hello, Vue!';
                return;
            }
            this.$data.message = 'Message changed!';
        },
        onChange(e) {
            console.log('onChange', e);
        }
    }
});

/**
 * 虽然正则表达式无法完美解析复杂的 HTML（推荐使用专门的 HTML 解析库如 DOMParser 或 htmlparser2），
 * 但以下提供一组正则表达式用于处理相对复杂的 HTML 解析场景，包含注释、CDATA、标签及属性等。
 */

// 匹配 HTML 注释
const htmlCommentRegex = /<!--[\s\S]*?-->/g;

// 匹配 CDATA 部分
const htmlCdataRegex = /<!\[CDATA\[[\s\S]*?\]\]>/g;

// 匹配 HTML 标签（包含自闭合标签），可提取标签名、属性等信息
const htmlTagRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)(?:\s+([^>]*)|)>/g;

// 匹配标签属性，可提取属性名和属性值
const htmlAttributeRegex = /([^\s=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^>\s]*))?/g;

// 以下展示如何使用上面定义的正则表达式来解析一段 HTML 代码
const html = '<div class="container" id="main">Hello <!-- This is a comment --> World <img src="image.jpg" alt="Sample" /></div>';

/**
 * 将 HTML 字符串转换为 JSON 对象
 * @param {string} html - 要解析的 HTML 字符串
 * @returns {Object} 解析后的 JSON 对象
 */
function htmlToJson(html) {
    // 移除 HTML 注释和 CDATA 部分
    html = html.replace(htmlCommentRegex, '').replace(htmlCdataRegex, '');

    let result = [];
    let index = 0;
    const len = html.length;

    while (index < len) {
        // 查找下一个标签开始位置
        const tagStart = html.indexOf('<', index);
        if (tagStart === -1) {
            // 没有标签了，处理剩余文本
            const text = html.slice(index).trim();
            if (text) {
                result.push(text);
            }
            break;
        }

        // 处理标签前的文本
        if (tagStart > index) {
            const text = html.slice(index, tagStart).trim();
            if (text) {
                result.push(text);
            }
        }

        // 查找标签结束位置
        const tagEnd = html.indexOf('>', tagStart);
        if (tagEnd === -1) break;

        const tagStr = html.slice(tagStart, tagEnd + 1);
        const match = tagStr.match(htmlTagRegex);
        if (!match) {
            index = tagEnd + 1;
            continue;
        }

        const [, isClosing, tagName, attributesStr] = match[0].match(htmlTagRegex);
        if (isClosing) {
            // 闭合标签，这里简化处理，实际嵌套结构需要栈来管理
            index = tagEnd + 1;
            continue;
        }

        // 解析标签属性
        const attributes = {};
        if (attributesStr) {
            let attrMatch;
            while ((attrMatch = htmlAttributeRegex.exec(attributesStr)) !== null) {
                const attrName = attrMatch[1];
                let attrValue = attrMatch[2];
                if (attrValue) {
                    attrValue = attrValue.replace(/^['"]|['"]$/g, '');
                } else {
                    attrValue = '';
                }
                attributes[attrName] = attrValue;
            }
            htmlAttributeRegex.lastIndex = 0; // 重置正则表达式索引
        }

        // 检查是否是自闭合标签
        const isSelfClosing = tagStr.endsWith('/>');
        const tagObj = {
            tag: tagName,
            attributes: attributes
        };

        if (!isSelfClosing) {
            // 查找对应的闭合标签
            const closingTag = `</${tagName}>`;
            const nextClosingTagIndex = html.indexOf(closingTag, tagEnd + 1);
            if (nextClosingTagIndex !== -1) {
                const innerHtml = html.slice(tagEnd + 1, nextClosingTagIndex);
                const children = htmlToJson(innerHtml);
                if (children.length > 0) {
                    tagObj.children = children;
                }
                index = nextClosingTagIndex + closingTag.length;
            } else {
                index = tagEnd + 1;
            }
        } else {
            index = tagEnd + 1;
        }

        result.push(tagObj);
    }

    // 如果只有一个根元素，直接返回它
    if (result.length === 1 && typeof result[0] === 'object') {
        return result[0];
    }
    return result;
}

// 使用示例
const htmlJson = htmlToJson(html);
console.log(JSON.stringify(htmlJson, null, 2));

