
const parser = new DOMParser();

export default (template) => {
    const doc = parser.parseFromString(`<body>${template}</body>`, 'text/html');
    const body = doc.querySelector('body')
    return {
        template: body.querySelector('template')?.content,
        script: body.querySelector('script'),
        style: body.querySelector('style'),
    }
};
